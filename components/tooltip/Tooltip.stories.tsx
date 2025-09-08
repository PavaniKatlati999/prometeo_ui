import type { Meta, StoryObj } from "@storybook/react";
import Tooltip from "./index";
import React from "react";

const meta: Meta<typeof Tooltip> = {
  title: "Components/Tooltip",
  component: Tooltip,
  tags: ["autodocs"],
  argTypes: {
    content: { control: "text" },
    direction: {
      control: "select",
      options: ["up", "down", "left", "right"],
    },
    background: { control: "color" },
    color: { control: "color" },
    useDefaultStyles: { control: "boolean" },
    arrow: { control: "boolean" },
    arrowSize: { control: "number" },
    padding: { control: "text" },
    zIndex: { control: "number" },
  },
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {
  args: {
    content: "This is a tooltip",
    children: <button>Hover me</button>,
  },
};

export const Directions: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "40px", justifyContent: "center", marginTop: "100px" }}>
      <Tooltip content="Tooltip Up" direction="up">
        <button>Up</button>
      </Tooltip>
      <Tooltip content="Tooltip Down" direction="down">
        <button>Down</button>
      </Tooltip>
      <Tooltip content="Tooltip Left" direction="left">
        <button>Left</button>
      </Tooltip>
      <Tooltip content="Tooltip Right" direction="right">
        <button>Right</button>
      </Tooltip>
    </div>
  ),
};

export const WithCustomColors: Story = {
  args: {
    content: "Custom styled tooltip",
    background: "#722ed1",
    color: "#fff",
    children: <button>Hover me</button>,
  },
};

export const Controlled: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false);
    return (
      <div style={{ marginTop: "100px", textAlign: "center" }}>
        <button onClick={() => setOpen(!open)}>Toggle Tooltip</button>
        <Tooltip content="Controlled tooltip" isOpen={open}>
          <span style={{ marginLeft: "20px" }}>Target</span>
        </Tooltip>
      </div>
    );
  },
};
