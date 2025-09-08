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

export const Default: Story = {
  args: {
    children: "Sample Tag", // 👈 default text here
  },
};

export const Closable: Story = {
  args: {
    children: "Closable Tag",
    closable: true,
  },
};

export const WithIcon: Story = {
  args: {
    children: "Tag with Icon",
    icon: "⭐",
  },
};

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
};
