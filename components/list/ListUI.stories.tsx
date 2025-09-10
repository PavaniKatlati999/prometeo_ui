import type { Meta, StoryObj } from "@storybook/react";
import { CheckCircle, XCircle } from "lucide-react";
import ListUI from "./index";
/**
 * ListUI component is used for rendering a list of items.
 * ListUi component renders ordered or unordered lists.
 * we can also add icons or custom spacing.
 *
 *
 */
const meta: Meta<typeof ListUI> = {
  title: "Components/ListUI",
  component: ListUI,
  tags: ["autodocs"],
  argTypes: {
    ordered: { control: "boolean" },
    spacing: {
      control: "select",
      options: ["xs", "sm", "md", "lg"],
    },
    className: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof ListUI>;

// 🔹 Default Story
export const Default: Story = {
  args: {
    items: [
      { label: "Item 1" },
      { label: "Item 2" },
      { label: "Item 3" },
    ],
  },
};
Default.parameters = {
  docs: {
    description: {
      story: "Displays a simple unordered list with default bullet points."
    }
  }
};

// 🔹 Unordered List
export const Unordered: Story = {
  args: {
    items: [
      { label: "First item" },
      { label: "Second item" },
      { label: "Third item" },
    ],
    ordered: false,
    spacing: "sm",
  },
};
Unordered.parameters = {
  docs: {
    description: {
      story: "An unordered list with small spacing between items."
    }
  }
};

// 🔹 Ordered List
export const Ordered: Story = {
  args: {
    items: [
      { label: "Step One" },
      { label: "Step Two" },
      { label: "Step Three" },
    ],
    ordered: true,
    spacing: "md",
  },
};
Ordered.parameters = {
  docs: {
    description: {
      story: "Displays a numbered list (ordered) with medium spacing."
    }
  }
};

// 🔹 List With Icons
export const WithIcons: Story = {
  args: {
    items: [
      { label: "Success item", icon: <CheckCircle size={16} /> },
      { label: "Another success", icon: <CheckCircle size={16} /> },
      { label: "Error item", icon: <XCircle size={16} /> },
    ],
    ordered: false,
    spacing: "md",
  },
};
WithIcons.parameters = {
  docs: {
    description: {
      story: "An unordered list with custom icons for each item. Supports different icon components."
    }
  }
};

// 🔹 Custom Spacing
export const CustomSpacing: Story = {
  args: {
    items: [
      { label: "Extra Spacing 1" },
      { label: "Extra Spacing 2" },
      { label: "Extra Spacing 3" },
    ],
    ordered: false,
    spacing: "lg",
  },
};
CustomSpacing.parameters = {
  docs: {
    description: {
      story: "List with larger spacing between items. Useful for emphasizing separation."
    }
  }
};
