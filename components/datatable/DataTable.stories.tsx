import type { Meta, StoryObj } from "@storybook/react";
import DataTable from "./index";

// 1. Sample row type
interface User {
  id: number;
  name: string;
  email: string;
  age: number;
}

// 2. Dummy data
const sampleData: User[] = [
  { id: 1, name: "Alice", email: "alice@example.com", age: 25 },
  { id: 2, name: "Bob", email: "bob@example.com", age: 30 },
  { id: 3, name: "Charlie", email: "charlie@example.com", age: 28 },
  { id: 4, name: "Daisy", email: "daisy@example.com", age: 35 },
];

// 3. Column config
const columns = [
  { key: "id", title: "ID", dataIndex: "id", width: 60, isFrozen: true },
  { key: "name", title: "Name", dataIndex: "name", sorting: "string" },
  { key: "email", title: "Email", dataIndex: "email", ellipse: true },
  { key: "age", title: "Age", dataIndex: "age", sorting: "number" },
];

const meta: Meta<typeof DataTable> = {
  title: "Components/DataTable",
  component: DataTable,
  tags: ["autodocs"],
  argTypes: {
    enableGlobalSearch: { control: "boolean" },
    enableFilter: { control: "boolean" },
    enableInfiniteScroll: { control: "boolean" },
    isServerSide: { control: "boolean" },
  },
};
export default meta;

type Story = StoryObj<typeof DataTable>;

//  Default client-side table
export const Default: Story = {
  args: {
    columns,
    dataSource: sampleData,
  },
};

//  With Global Search (pre-filled query)
export const WithSearch: Story = {
  args: {
    columns,
    dataSource: sampleData,
    enableGlobalSearch: true,
  },
  play: async ({ canvasElement }) => {
    const input = canvasElement.querySelector("input[placeholder='Search...']") as HTMLInputElement;
    if (input) {
      input.value = "Alice"; // pre-fill search
      input.dispatchEvent(new Event("input", { bubbles: true }));
    }
  },
};


//  With Sorting Enabled
export const WithSorting: Story = {
  args: {
    columns,
    dataSource: sampleData,
  },
};

//  With Pagination (client-side)
export const WithPagination: Story = {
  args: {
    columns,
    dataSource: sampleData,
    pageSize: 2,
  },
};

//  With Infinite Scroll (mocked server fetch)
export const InfiniteScroll: Story = {
  args: {
    columns,
    dataSource: sampleData.slice(0, 2),
    enableInfiniteScroll: true,
    isServerSide: true,
    pageSize: 2,
    total: 10,
    fetchFromServer: async (page = 0, pageSize = 2) => {
      await new Promise((res) => setTimeout(res, 800)); // simulate delay
      return Array.from({ length: pageSize }).map((_, i) => ({
        id: page * pageSize + i + 1,
        name: `User ${page * pageSize + i + 1}`,
        email: `user${page * pageSize + i + 1}@example.com`,
        age: 20 + ((page * pageSize + i) % 10),
      }));
    },
  },
};

export const WithSearchControlled: Story = {
  args: {
    columns,
    dataSource: sampleData,
    enableGlobalSearch: true,
  },
};


//  Empty State
export const EmptyState: Story = {
  args: {
    columns,
    dataSource: [],
  },
};
