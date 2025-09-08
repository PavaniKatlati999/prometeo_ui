import type { Meta, StoryObj } from "@storybook/react";
import ProgressBar from "./index";

const meta: Meta<typeof ProgressBar> = {
  title: "Components/Loader/ProgressBar",
  component: ProgressBar,
  tags: ["autodocs"],
  argTypes: {
    percent: { control: { type: "number", min: 0, max: 100 }, defaultValue: 50 },
    size: {
      control: "select",
      options: ["small", "medium", "large"],
      defaultValue: "small",
    },
    showInfo: { control: "boolean", defaultValue: false },
    isLoading: { control: "boolean", defaultValue: false },
  },
};

export default meta;
type Story = StoryObj<typeof ProgressBar>;

export const Default: Story = {
  args: {
    percent: 50,
    size: "small",
  },
};

export const WithInfo: Story = {
  args: {
    percent: 70,
    size: "medium",
    showInfo: true,
  },
};

export const Loading: Story = {
  args: {
    percent: 0,
    isLoading: true,
  },
};
