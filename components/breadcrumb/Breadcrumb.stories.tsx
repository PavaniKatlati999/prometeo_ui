import type { Meta, StoryObj } from "@storybook/react";
import Breadcrumb from "./index";

//  Meta config
const meta: Meta<typeof Breadcrumb> = {
  title: "Components/Breadcrumb",
  component: Breadcrumb,
  tags: ["autodocs"],
  argTypes: {
    separator: {
      control: "text",
      description: "Custom separator between items",
    },
  },
};
export default meta;

type Story = StoryObj<BreadcrumbProps>;

//  Default breadcrumb
export const Default: Story = {
  args: {
    items: [
      { label: "Home", href: "/" },
      { label: "Products", href: "/products" },
      { label: "Shoes", href: "/products/shoes" },
      { label: "Running Shoes", href: "/products/shoes/running" },
      { label: "2024 Edition" }
    ],
  },
};

//  With custom separator
export const WithCustomSeparator: Story = {
  args: {
    items: [
      { label: "Home", href: "/" },
      { label: "Library", href: "/library" },
      { label: "Data", href: "/library/data" },
      { label: "2024" }
    ],
    separator: ">",
  },
};

//  Clickable items (no href, uses onClick)
export const WithOnClick: Story = {
  args: {
    items: [
      { label: "Dashboard", onClick: () => alert("Dashboard clicked") },
      { label: "Reports", onClick: () => alert("Reports clicked") },
      { label: "2024", onClick: () => alert("2024 clicked") },
    ],
  },
};
