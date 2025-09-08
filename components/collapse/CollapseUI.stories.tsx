import type { Meta, StoryObj } from "@storybook/react";
import CollapseUI from "./index";

const meta: Meta<typeof CollapseUI> = {
  title: "Components/CollapseUI",
  component: CollapseUI,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof CollapseUI>;

//  Default Story
export const Default: Story = {
  render: () => <CollapseUI />,
};
