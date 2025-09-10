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

// 🔹 Default Loader
export const Default: Story = {
  args: {
    options: {
      size: "40px",
      thickness: "8px",
      speed: "1s",
      position: "relative",
    },
  },
};
Default.parameters = {
  docs: { description: { story: "A basic circular loader with default size and speed." } },
};

// 🔹 Large Loader
export const Large: Story = {
  args: {
    options: {
      size: "80px",
      thickness: "8px",
      speed: "1.2s",
      position: "relative",
    },
  },
};
Large.parameters = {
  docs: { description: { story: "A larger loader for more prominent loading indicators." } },
};

// 🔹 Fast Loader
export const Fast: Story = {
  args: {
    options: {
      size: "50px",
      thickness: "8px",
      speed: "0.5s",
      position: "relative",
    },
  },
};
Fast.parameters = {
  docs: { description: { story: "A loader that spins faster than the default speed." } },
};

// 🔹 With Counter
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
WithCounter.parameters = {
  docs: { description: { story: "Displays a loader with a counter value inside the spinner." } },
};

// 🔹 Fullscreen Loader
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
FullScreen.parameters = {
  docs: { description: { story: "A fullscreen loader, fixed in position, for full-page loading states." } },
};
