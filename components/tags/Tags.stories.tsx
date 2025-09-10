// Tag.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import Tag from "./index";
import { ReactNode } from "react";

const meta: Meta<typeof Tag> = {
  title: "Components/Tag",
  component: Tag,
  tags: ["autodocs"],
  argTypes: {
    children: { control: "text", defaultValue: "Sample Tag" },
    color: { control: "color" },
    status: {
      control: "select",
      options: ["success", "processing", "error", "warning", "default", "waiting", "stop"],
    },
    closable: { control: "boolean" },
    closeIcon: { control: "text" },
    draggable: { control: "boolean" },
    onClose: { action: "closed" },
    onDragStart: { action: "dragStart" },
    onDrop: { action: "dropped" },
  },
};

export default meta;
type Story = StoryObj<typeof Tag>;

// Default Tag
export const Default: Story = {
  args: {
    children: "Sample Tag",
  },
  parameters: { docs: { description: { story: "A simple tag with default styling." } } },
};

// Closable Tag
export const Closable: Story = {
  args: {
    children: "Closable Tag",
    closable: true,
  },
  parameters: { docs: { description: { story: "A tag that can be closed by the user." } } },
};

// Tag with Icon
export const WithIcon: Story = {
  args: {
    children: "Tag with Icon",
    icon: "⭐",
  },
  parameters: { docs: { description: { story: "A tag displaying an icon alongside text." } } },
};

// Tags with Status Colors
export const StatusColors: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
      <Tag status="success">Success</Tag>
      <Tag status="processing">Processing</Tag>
      <Tag status="error">Error</Tag>
      <Tag status="warning">Warning</Tag>
      <Tag status="default">Default</Tag>
      <Tag status="waiting">Waiting</Tag>
      <Tag status="stop">Stop</Tag>
    </div>
  ),
  parameters: { docs: { description: { story: "Demonstrates all available status colors for tags." } } },
};
