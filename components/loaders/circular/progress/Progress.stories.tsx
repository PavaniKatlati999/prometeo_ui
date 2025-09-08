import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import CircularProgress from "./index";

const meta: Meta<typeof CircularProgress> = {
  title: "Components/Loader/CircularProgress",
  component: CircularProgress,
  tags: ["autodocs"],
  argTypes: {
    "options.size": { control: "text", description: "Size of the loader (px, rem, etc.)" },
    "options.thickness": { control: "text", description: "Thickness of the loader border" },
    "options.speed": { control: "text", description: "Animation duration (e.g. 1s, 2s)" },
    "options.counter": { control: "boolean", description: "Show counter inside loader" },
    "options.value": { control: "text", description: "Counter value" },
    "options.position": { control: "text", description: "CSS position (absolute, fixed…)" },
  },
};
export default meta;

type Story = StoryObj<typeof CircularProgress>;

//   Default Loader
export const Default: Story = {
  args: {
    options: {
      size: "40px",
      thickness: "4px",
      speed: "1s",
      position: "relative",
    },
  },
};

//   Large Loader
export const Large: Story = {
  args: {
    options: {
      size: "80px",
      thickness: "6px",
      speed: "1.2s",
      position: "relative",
    },
  },
};

//   Fast Loader
export const Fast: Story = {
  args: {
    options: {
      size: "50px",
      thickness: "4px",
      speed: "0.5s",
      position: "relative",
    },
  },
};

//   With Counter
export const WithCounter: Story = {
  args: {
    options: {
      size: "60px",
      thickness: "5px",
      speed: "1s",
      counter: true,
      value: "75%",
      position: "relative",
    },
  },
};

//   Fullscreen Loader
export const FullScreen: Story = {
  args: {
    options: {
      size: "100px",
      thickness: "8px",
      speed: "1.5s",
      position: "fixed",
      counter: true,
      value: "Loading...",
    },
  },
};
