import React, { useState } from "react"; //   add this
import type { Meta, StoryObj } from "@storybook/react";
import Radio from "./index";

const meta: Meta<typeof Radio> = {
  title: "Components/Radio",
  component: Radio,
  tags: ["autodocs"],
  argTypes: {
    onChange: { action: "changed" }, // Storybook Actions tab
  },
};
export default meta;

type Story = StoryObj<typeof Radio>;

//   Default Radio (uncontrolled)
export const Default: Story = {
  args: {
    label: "Default Option",
    name: "group1",
    value: "A",
  },
};

//   Checked Radio (controlled with state)
export const Checked: Story = {
  render: (args) => {
    const [selected, setSelected] = useState(true);
    return (
      <Radio
        {...args}
        checked={selected}
        onChange={(e) => setSelected(e.target.checked)}
      />
    );
  },
  args: {
    label: "Checked Option",
    name: "group1",
    value: "B",
  },
};

//   Disabled Radio
export const Disabled: Story = {
  args: {
    label: "Disabled Option",
    name: "group1",
    value: "C",
    disabled: true,
  },
};

//   Radio Group Example
export const Group: Story = {
  render: () => {
    const [selected, setSelected] = useState("A");
    return (
      <div>
        <Radio
          label="Option A"
          name="group1"
          value="A"
          checked={selected === "A"}
          onChange={() => setSelected("A")}
        />
        <Radio
          label="Option B"
          name="group1"
          value="B"
          checked={selected === "B"}
          onChange={() => setSelected("B")}
        />
      </div>
    );
  },
};
