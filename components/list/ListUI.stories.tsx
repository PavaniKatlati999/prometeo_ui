import type { Meta, StoryObj } from "@storybook/react";
import ListUI from "./index";

const meta: Meta<typeof ListUI> = {
  title: "Components/ListUI",
  component: ListUI,
  tags: ["autodocs"],
  argTypes: {
    ordered: {
      control: "boolean",
      description: "Whether the list is ordered with numbers instead of bullets",
    },
    bordered: {
      control: "boolean",
      description: "Add border around the list container",
    },
    spacing: {
      control: "select",
      options: ["xs", "sm", "md", "lg"],
      description: "Spacing between list items",
    },
    size: {
      control: "select",
      options: ["small", "default", "large"],
      description: "Set the size of the list like Ant Design (small, default, large).",
    },
    header: {
      control: "text",
      description: "Optional header text for the list",
    },
    footer: {
      control: "text",
      description: "Optional footer text for the list",
    },
  },
};

export default meta;
type Story = StoryObj<typeof ListUI>;

// Sample data
const sampleItems = [
  { label: "First item", description: "This is the description of the first item" },
  { label: "Second item", description: "Additional details about the second item" },
  { label: "Third item", description: "This one also has extra info" },
];

export const Default: Story = {
  args: {
    items: sampleItems,
    size: "default",
  },
  parameters: {
    docs: {
      description: {
        story:
          "The default ListUI renders a simple unordered list with bullets. Each item can have a label and optional description.",
      },
    },
  },
};

export const Ordered: Story = {
  args: {
    items: sampleItems,
    ordered: true,
    size: "default",
  },
  parameters: {
    docs: {
      description: {
        story:
          "The `ordered` prop switches the list markers from bullets to sequential numbers.",
      },
    },
  },
};

export const WithHeaderAndFooter: Story = {
  args: {
    items: sampleItems,
    header: "List Header",
    footer: "List Footer",
    bordered: true,
    size: "default",
  },
  parameters: {
    docs: {
      description: {
        story:
          "You can add an optional `header` and `footer` to the list. Using `bordered` gives a card-like container similar to Ant Design’s List.",
      },
    },
  },
};

export const WithIcons: Story = {
  args: {
    items: [
      { label: "Email notifications", icon: "📧" },
      { label: "System alerts", icon: "⚠️" },
      { label: "User messages", icon: "💬" },
    ],
    bordered: true,
    size: "default",
  },
  parameters: {
    docs: {
      description: {
        story:
          "If `icon` is passed to each item, the list will render custom markers instead of default bullets or numbers.",
      },
    },
  },
};

export const Small: Story = {
  args: {
    items: sampleItems,
    bordered: true,
    size: "small",
  },
  parameters: {
    docs: {
      description: {
        story:
          "A compact list with reduced padding and smaller text, ideal for dense layouts.",
      },
    },
  },
};

export const Large: Story = {
  args: {
    items: sampleItems,
    bordered: true,
    size: "large",
  },
  parameters: {
    docs: {
      description: {
        story:
          "A spacious list with larger padding and text, providing a more comfortable reading experience.",
      },
    },
  },
};
