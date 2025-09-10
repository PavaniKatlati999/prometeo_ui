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

// 🔹 Default ProgressBar
export const Default: Story = {
  args: {
    percent: 50,
    size: "small",
  },
};
Default.parameters = {
  docs: { description: { story: "A basic progress bar at 50% completion." } },
};

// 🔹 ProgressBar with Info
export const WithInfo: Story = {
  args: {
    percent: 70,
    size: "medium",
    showInfo: true,
  },
};
WithInfo.parameters = {
  docs: { description: { story: "Shows the progress percentage next to the bar." } },
};

// 🔹 Loading ProgressBar
export const Loading: Story = {
  args: {
    percent: 0,
    isLoading: true,
  },
};
Loading.parameters = {
  docs: { description: { story: "Displays an animated loading state for the progress bar." } },
};
