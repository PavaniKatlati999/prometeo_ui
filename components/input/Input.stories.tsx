import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import Input from "./index";

const meta: Meta<typeof Input> = {
  title: "Components/Input",
  component: Input,
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: "select",
      options: ["text", "password", "email", "number"],
    },
    disabled: { control: "boolean" },
    required: { control: "boolean" },
    readOnly: { control: "boolean" },
  },
};
export default meta;

type Story = StoryObj<typeof Input>;

//  Default Input
export const Default: Story = {
  args: {
    placeholder: "Enter text",
    onChange: fn(),
  },
};

//  With Default Value
export const WithDefaultValue: Story = {
  args: {
    defaultValue: "Hello World",
    onChange: fn(),
  },
};

//  Password Input with Toggle
export const PasswordWithToggle: Story = {
  args: {
    type: "password",
    placeholder: "Enter password",
    showPasswordToggle: true,
    onChange: fn(),
  },
};

//  Disabled Input
export const Disabled: Story = {
  args: {
    placeholder: "Disabled input",
    disabled: true,
  },
};

//  Input with Validation Error
export const WithError: Story = {
  args: {
    placeholder: "Enter value",
    helperText: "This field is required",
    className: "error-input",
    onChange: fn(),
  },
};

//  Number Input
export const NumberInput: Story = {
  args: {
    type: "number",
    placeholder: "Enter number",
    minLength: 1,
    maxLength: 5,
    onChange: fn(),
  },
};

//  ReadOnly Input
export const ReadOnly: Story = {
  args: {
    value: "This is readonly",
    readOnly: true,
  },
};
