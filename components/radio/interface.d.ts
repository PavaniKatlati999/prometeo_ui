import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import Radio from "./index";

const meta: Meta<typeof Radio> = {
  title: "Components/Radio",
  component: Radio,
  tags: ["autodocs"],
  argTypes: {
    label: { control: "text" },
    name: { control: "text" },
    checked: { control: "boolean" },
    disabled: { control: "boolean" },
    value: { control: "text" },
  },
};
export default meta;

type Story = StoryObj<typeof Radio>;

//   Default Radio
export const Default: Story = {
  args: {
    label: "Option A",
    name: "group1",
    value: "A",
    onChange: fn(),
  },
};

//   Checked Radio
export const Checked: Story = {
  args: {
    label: "Option B",
    name: "group1",
    value: "B",
    checked: true,
    onChange: fn(),
  },
};

//   Disabled Radio
export const Disabled: Story = {
  args: {
    label: "Disabled Option",
    name: "group1",
    value: "C",
    disabled: true,
    onChange: fn(),
  },
};

//   Radio Group Example
export const RadioGroup: Story = {
  render: () => (
    <div>
      <Radio
        label="Option 1"
        name="group2"
        value="1"
        onChange={fn()}
      />
      <Radio
        label="Option 2"
        name="group2"
        value="2"
        onChange={fn()}
      />
      <Radio
        label="Option 3 (Disabled)"
        name="group2"
        value="3"
        disabled
        onChange={fn()}
      />
    </div>
  ),
};
