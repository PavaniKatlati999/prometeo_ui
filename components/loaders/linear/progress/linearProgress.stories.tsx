import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import LinearProgress from "./index";

const meta: Meta<typeof LinearProgress> = {
  title: "Components/Loader/LinearProgress",
  component: LinearProgress,
  tags: ["autodocs"],
  argTypes: {
    size: { control: "text", description: "Width of the progress bar (e.g. 200px, 50%)" },
    value: { control: "number", description: "Progress value (0–100)" },
    borderRadius: { control: "text", description: "Border radius of the bar" },
    color: { control: "color", description: "Color of the text (if shown)" },
    backgroundColor: { control: "color", description: "Fill color of the bar" },
  },
};
export default meta;

type Story = StoryObj<typeof LinearProgress>;

// 🔹 Default Progress
export const Default: Story = {
  args: {
    size: "200px",
    value: 50,
    backgroundColor: "#005DB4",
    borderRadius: "8px",
  },
};
Default.parameters = {
  docs: { description: { story: "A basic progress bar at 50% completion." } },
};

// 🔹 Full Progress
export const Full: Story = {
  args: {
    size: "200px",
    value: 100,
    backgroundColor: "green",
    borderRadius: "8px",
  },
};
Full.parameters = {
  docs: { description: { story: "Progress bar fully completed at 100%." } },
};

// 🔹 Empty Progress
export const Empty: Story = {
  args: {
    size: "200px",
    value: 0,
    backgroundColor: "#ccc",
    borderRadius: "8px",
  },
};
Empty.parameters = {
  docs: { description: { story: "An empty progress bar with 0% completion." } },
};

// 🔹 Custom Colors
export const CustomColors: Story = {
  args: {
    size: "250px",
    value: 70,
    backgroundColor: "orange",
    borderRadius: "16px",
  },
};
CustomColors.parameters = {
  docs: { description: { story: "A progress bar with custom color and border radius." } },
};

// 🔹 Thin Bar
export const Thin: Story = {
  render: (args) => (
    <div style={{ height: "8px" }}>
      <LinearProgress {...args} />
    </div>
  ),
  args: {
    size: "300px",
    value: 40,
    backgroundColor: "red",
    borderRadius: "2px",
  },
};
Thin.parameters = {
  docs: { description: { story: "A thin linear progress bar, suitable for compact UI areas." } },
};
