import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import TypographyUI from "./index";

const meta: Meta<typeof TypographyUI> = {
  title: "Components/TypographyUI",
  component: TypographyUI,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof TypographyUI>;

//   Default Story
export const Default: Story = {
  render: () => <TypographyUI />,
};
