import type { Meta, StoryObj } from "@storybook/react";
import ListUI from "./index";

const meta: Meta<typeof ListUI> = {
  title: "Components/ListUI",
  component: ListUI,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof ListUI>;

//  Default Story
export const Default: Story = {
  render: () => <ListUI />,
};
