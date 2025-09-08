import type { Meta, StoryObj } from "@storybook/react";
import LoaderUI from "./index";

const meta: Meta<typeof LoaderUI> = {
  title: "Components/LoaderUI",
  component: LoaderUI,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof LoaderUI>;

// Default Story
export const Default: Story = {
  render: () => <LoaderUI />,
};
