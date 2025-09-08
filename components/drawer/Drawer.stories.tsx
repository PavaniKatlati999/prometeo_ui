import type { Meta, StoryObj } from "@storybook/react";
import DrawerUI from "./index";

const meta: Meta<typeof DrawerUI> = {
  title: "Components/DrawerUI",
  component: DrawerUI,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof DrawerUI>;

//  Default Story
export const Default: Story = {
  render: () => <DrawerUI />,
};
