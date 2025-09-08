import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { Checkbox, CheckboxGroup } from "./index";
import React from "react";

// Meta for Checkbox
const meta: Meta<typeof Checkbox> = {
  title: "Components/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
  argTypes: {
    checked: { control: "boolean", description: "Controls whether the checkbox is checked" },
    disabled: { control: "boolean", description: "Disables the checkbox if true" },
    indeterminate: { control: "boolean", description: "Displays the checkbox in an indeterminate state" },
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
  parameters: {
    docs: {
      description: {
        story: "A basic, unchecked checkbox that allows users to select or deselect an option."
      }
    }
  }
};

//  Checked Checkbox
export const Checked: Story = {
  args: {
    title: "I am checked",
    checked: true,
    onChange: fn(),
  },
  parameters: {
    docs: {
      description: {
        story: "A checkbox that is pre-checked to indicate a selected state by default."
      }
    }
  }
};

//  Disabled Checkbox
export const Disabled: Story = {
  args: {
    title: "Disabled Checkbox",
    disabled: true,
  },
  parameters: {
    docs: {
      description: {
        story: "A checkbox that is disabled and cannot be interacted with."
      }
    }
  }
};

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
  parameters: {
    docs: {
      description: {
        story: "Demonstrates an indeterminate checkbox where the parent reflects partial selection of child checkboxes. Selecting/deselecting all updates the parent accordingly."
      }
    }
  }
};
