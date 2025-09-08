import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import Dropdown, { SingleSelectDropdown, MultiSelectDropdown } from "./index";

const meta: Meta<typeof Dropdown> = {
  title: "Components/Dropdown",
  component: Dropdown,
  tags: ["autodocs"],
  argTypes: {
    mode: { control: "radio", options: ["single", "multi"] },
    placeholder: { control: "text" },
    disabled: { control: "boolean" },
  },
};
export default meta;

type Story = StoryObj<typeof Dropdown>;

const sampleOptions = [
  { label: "Apple", value: "apple" },
  { label: "Banana", value: "banana" },
  { label: "Cherry", value: "cherry" },
  { label: "Mango", value: "mango" },
  { label: "Pineapple", value: "pineapple" },
];

/**
 *   Single Select Stories
 */
export const SingleDefault: Story = {
  render: (args) => {
    const [value, setValue] = useState<string | null>(null);
    return (
      <SingleSelectDropdown
        {...args}
        options={sampleOptions}
        value={value}
        placeholder="Select a fruit"
        handleChange={(val) => setValue(val)}
      />
    );
  },
  args: {
    mode: "single",
  },
};

export const SingleWithValue: Story = {
  render: (args) => {
    const [value, setValue] = useState("banana");
    return (
      <SingleSelectDropdown
        {...args}
        options={sampleOptions}
        value={value}
        placeholder="Select a fruit"
        handleChange={(val) => setValue(val)}
      />
    );
  },
  args: {
    mode: "single",
  },
};

export const SingleDisabled: Story = {
  args: {
    mode: "single",
    options: sampleOptions,
    value: "apple",
    placeholder: "Disabled dropdown",
    disabled: true,
  },
};

/**
 *   Multi Select Stories
 */
export const MultiDefault: Story = {
  render: (args) => {
    const [value, setValue] = useState<string[]>([]);
    return (
      <MultiSelectDropdown
        {...args}
        options={sampleOptions}
        value={value}
        placeholder="Select fruits"
        handleChange={(val) => setValue(val)}
      />
    );
  },
  args: {
    mode: "multi",
  },
};

export const MultiWithValues: Story = {
  render: (args) => {
    const [value, setValue] = useState<string[]>(["apple", "cherry"]);
    return (
      <MultiSelectDropdown
        {...args}
        options={sampleOptions}
        value={value}
        placeholder="Select fruits"
        handleChange={(val) => setValue(val)}
      />
    );
  },
  args: {
    mode: "multi",
  },
};

export const MultiDisabled: Story = {
  args: {
    mode: "multi",
    options: sampleOptions,
    value: ["banana"],
    placeholder: "Disabled dropdown",
    disabled: true,
  },
};
