import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { Checkbox, CheckboxGroup } from "./index";
import React from "react";  //

// Meta for Checkbox
const meta: Meta<typeof Checkbox> = {
  title: "Components/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
  argTypes: {
    checked: { control: "boolean" },
    disabled: { control: "boolean" },
    indeterminate: { control: "boolean" },
  },
};
export default meta;

type Story = StoryObj<typeof Checkbox>;

//  Basic Checkbox
export const Default: Story = {
  args: {
    title: "Accept Terms",
    onChange: fn(),
  },
};

//  Checked Checkbox
export const Checked: Story = {
  args: {
    title: "I am checked",
    checked: true,
    onChange: fn(),
  },
};

//  Disabled Checkbox
export const Disabled: Story = {
  args: {
    title: "Disabled Checkbox",
    disabled: true,
  },
};

//  Indeterminate Checkbox
// export const Indeterminate: Story = {
//   args: {
//     title: "Indeterminate Checkbox",
//     indeterminate: true,
//   },
// };

//  Indeterminate Example with Children
export const IndeterminateExample: StoryObj = {
  render: () => {
    const [checkedItems, setCheckedItems] = React.useState<string[]>([]);
    const allOptions = ["Option A", "Option B", "Option C"];

    const allChecked = checkedItems.length === allOptions.length;
    const isIndeterminate =
      checkedItems.length > 0 && checkedItems.length < allOptions.length;

    const toggleAll = () => {
      if (allChecked) {
        setCheckedItems([]);
      } else {
        setCheckedItems(allOptions);
      }
    };

    const toggleItem = (item: string) => {
      setCheckedItems((prev) =>
        prev.includes(item)
          ? prev.filter((i) => i !== item)
          : [...prev, item]
      );
    };

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        {/* Parent Checkbox */}
        <Checkbox
          title="Select All"
          checked={allChecked}
          indeterminate={isIndeterminate}
          onChange={toggleAll}
        />

        {/* Child Checkboxes */}
        {allOptions.map((opt) => (
          <Checkbox
            key={opt}
            title={opt}
            checked={checkedItems.includes(opt)}
            onChange={() => toggleItem(opt)}
          />
        ))}
      </div>
    );
  },
};


// ----------------------
//  Group Stories
// ----------------------
// export const GroupDefault: StoryObj<typeof CheckboxGroup> = {
//   render: (args) => <CheckboxGroup {...args} />,
//   args: {
//     options: ["Option A", "Option B", "Option C"],
//     defaultValue: ["Option A"],
//     onChange: fn(),
//   },
// };

// export const GroupDisabled: StoryObj<typeof CheckboxGroup> = {
//   render: (args) => <CheckboxGroup {...args} />,
//   args: {
//     options: [
//       { label: "Enabled Option", value: "enabled" },
//       { label: "Disabled Option", value: "disabled", disabled: true },
//     ],
//     defaultValue: ["enabled"],
//   },
// };
