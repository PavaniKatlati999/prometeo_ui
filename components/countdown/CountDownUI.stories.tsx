import type { Meta, StoryObj } from "@storybook/react";
import CountDownUI from "./index";

const meta: Meta<typeof CountDownUI> = {
  title: "Components/CountDownUI",
  component: CountDownUI,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof CountDownUI>;

//  Default Story
export const Default: Story = {
  render: () => <CountDownUI />,
};
