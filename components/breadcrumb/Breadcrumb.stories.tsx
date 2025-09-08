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
      { label: "2024 Edition" },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: "Displays a default breadcrumb navigation with multiple hierarchical links, ending with the current page label without a link."
      }
    }
  }
};

//  With custom separator
export const WithCustomSeparator: Story = {
  args: {
    items: [
      { label: "Home", href: "/" },
      { label: "Library", href: "/library" },
      { label: "Data", href: "/library/data" },
      { label: "2024" },
    ],
    separator: ">",
  },
  parameters: {
    docs: {
      description: {
        story: "Shows a breadcrumb with a custom separator character (`>`), allowing customization of the divider between breadcrumb items."
      }
    }
  }
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
  parameters: {
    docs: {
      description: {
        story: "Demonstrates breadcrumbs where items are clickable using `onClick` instead of `href`, allowing interactive navigation without page reloads."
      }
    }
  }
};
