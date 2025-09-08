import type { Meta, StoryObj } from "@storybook/react";
import Button from "./index";
// import type { ButtonProps } from "./interface";

const meta: Meta<typeof Button> = {
  title: "Components/Button", // Sidebar title in Storybook
  component: Button,
  tags: ["autodocs"],          // Enables Docs addon (optional)
  argTypes: {
    onClick: { action: "clicked" }, // Shows click events in Storybook actions panel
    color: { control: "color" },    // Adds a color picker in Storybook controls
    iconPos: {
      control: "radio",
      options: ["left", "right"],
    },
    type: {
      control: "select",
      options: ["primary", "secondary", "default", "dashed", "text", "link", "light"],
    },
    size: {
      control: "radio",
      options: ["small", "middle", "large"],
    },
  },
};

export default meta;
type Story = StoryObj<ButtonProps>;

// Different variations of your Button

export const Default: Story = {
  args: {
    text: "Default Button",
    type: "default",
    size: "middle",
  },
};

export const Primary: Story = {
  args: {
    text: "Primary Button",
    type: "primary",
    size: "middle",
  },
};

export const Disabled: Story = {
  args: {
    text: "Disabled Button",
    type: "default",
    disabled: true,
    disabledTitle: "Can't click",
  },
};

export const Loading: Story = {
  args: {
    text: "Loading...",
    type: "dashed",
    loading: false,
  },
};

export const WithIcon: Story = {
  args: {
    text: "Button with Icon",
    type: "secondary",
    iconPos: "left",
    icon: "▶️"
  },
};

export const Colored: Story = {
  args: {
    text: "Custom Color",
    color: "#ff5733",
  },
};
