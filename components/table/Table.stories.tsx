import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import Table from "./index";
import { Column } from "./types";

interface User {
  id: number;
  name: string;
  age: number;
  email: string;
}

const sampleData: User[] = [
  { id: 1, name: "Alice", age: 28, email: "alice@example.com" },
  { id: 2, name: "Bob", age: 35, email: "bob@example.com" },
  { id: 3, name: "Charlie", age: 42, email: "charlie@example.com" },
  { id: 4, name: "David", age: 22, email: "david@example.com" },
  { id: 5, name: "Eve", age: 30, email: "eve@example.com" },
  { id: 6, name: "Frank", age: 25, email: "frank@example.com" },
  { id: 7, name: "Grace", age: 27, email: "grace@example.com" },
  { id: 8, name: "Hannah", age: 29, email: "hannah@example.com" },
  { id: 9, name: "Ian", age: 33, email: "ian@example.com" },
  { id: 10, name: "Jack", age: 31, email: "jack@example.com" },
];

const columns: Column<User>[] = [
  { key: "name", title: "Name", sortable: true, filterable: true },
  { key: "age", title: "Age", sortable: true, filterable: true, width: 100 },
  { key: "email", title: "Email", filterable: true, width: 250 },
];

const meta: Meta<typeof Table<User>> = {
  title: "Components/Table",
  component: Table,
  tags: ["autodocs"],
  argTypes: {
    pageSize: { control: "number" },
    selectable: { control: "boolean" },
    editable: { control: "boolean" },
    loading: { control: "boolean" },
  },
};
export default meta;

type Story = StoryObj<typeof Table<User>>;

// Default Table
export const Default: Story = {
  render: (args) => {
    const [rows, setRows] = useState(sampleData);
    return <Table {...args} data={rows} columns={columns} onDataChange={setRows} />;
  },
  args: {
    pageSize: 5,
    selectable: true,
    editable: true,
  },
  parameters: { docs: { description: { story: "A default table with selectable and editable rows." } } },
};

// Non-Selectable Table
export const NonSelectable: Story = {
  render: (args) => {
    const [rows, setRows] = useState(sampleData);
    return <Table {...args} data={rows} columns={columns} onDataChange={setRows} />;
  },
  args: {
    pageSize: 5,
    selectable: false,
  },
  parameters: { docs: { description: { story: "A table where rows cannot be selected." } } },
};

// Non-Editable Table
export const NonEditable: Story = {
  render: (args) => {
    const [rows, setRows] = useState(sampleData);
    return <Table {...args} data={rows} columns={columns} onDataChange={setRows} />;
  },
  args: {
    pageSize: 5,
    editable: false,
  },
  parameters: { docs: { description: { story: "A table where rows cannot be edited." } } },
};

// Loading State Table
export const Loading: Story = {
  render: (args) => <Table {...args} data={[]} columns={columns} loading />,
  args: {
    pageSize: 5,
  },
  parameters: { docs: { description: { story: "Shows a loading state when data is being fetched." } } },
};

// Table with Custom Render Column
export const CustomRender: Story = {
  render: (args) => {
    const [rows, setRows] = useState(sampleData);
    const customColumns: Column<User>[] = [
      ...columns,
      {
        key: "actions",
        title: "Actions",
        render: (_, row) => <button onClick={() => alert(`Editing ${row.name}`)}>Edit</button>,
      },
    ];
    return <Table {...args} data={rows} columns={customColumns} onDataChange={setRows} />;
  },
  args: {
    pageSize: 5,
  },
  parameters: { docs: { description: { story: "A table with a custom render column for actions or buttons." } } },
};
