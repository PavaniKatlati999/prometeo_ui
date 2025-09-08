import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import TabUI from "./index";

const meta: Meta<typeof TabUI> = {
  title: "Components/TabUI",
  component: TabUI,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof TabUI>;

//   Default Story
export const Default: Story = {
  render: () => <TabUI />,
};
