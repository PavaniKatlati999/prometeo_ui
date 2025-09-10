import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import SpaceUI from "./index";

const meta: Meta<typeof SpaceUI> = {
  title: "Components/SpaceUI",
  component: SpaceUI,
  tags: ["autodocs"],
  argTypes: {
    className: { control: "text" },
    style: { control: "object" },
  },
};
export default meta;

type Story = StoryObj<typeof SpaceUI>;

export const Default: Story = {
  render: (args) => (
    <SpaceUI {...args}>
      <button>Button 1</button>
      <button>Button 2</button>
    </SpaceUI>
  ),
  args: {
    className: "",
    style: { gap: "16px", display: "flex" },
  },
  parameters: {
    docs: {
      description: { story: "Default horizontal spacing between elements using SpaceUI." },
    },
  },
};

export const Vertical: Story = {
  render: (args) => (
    <SpaceUI {...args}>
      <div>Item 1</div>
      <div>Item 2</div>
      <div>Item 3</div>
    </SpaceUI>
  ),
  args: {
    style: { display: "flex", flexDirection: "column", gap: "16px" },
  },
  parameters: {
    docs: {
      description: { story: "Vertical arrangement of elements with spacing applied between items." },
    },
  },
};

export const CustomStyled: Story = {
  render: (args) => (
    <SpaceUI {...args}>
      <span>Left</span>
      <span>Right</span>
    </SpaceUI>
  ),
  args: {
    style: { gap: "24px", display: "flex", backgroundColor: "#f5f5f5", padding: "16px" },
  },
  parameters: {
    docs: {
      description: { story: "Custom styled SpaceUI with larger spacing and background for demonstration." },
    },
  },
};
