import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import FormItem from "../formItem";
import Input from "../../input";

const meta: Meta<typeof FormItem> = {
  title: "Components/Form/FormItem",
  component: FormItem,
  tags: ["autodocs"],
  argTypes: {
    label: { control: "text" },
    name: { control: "text" },
    required: { control: "boolean" },
    error: { control: "text" },
    helperText: { control: "text" },
  },
};
export default meta;

type Story = StoryObj<typeof FormItem>;

//  Reusable render function with state
const renderWithInput = (args: any, props?: React.ComponentProps<typeof Input>) => {
  const [value, setValue] = useState("");
  return (
    <FormItem {...args}>
      <Input
        {...props}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </FormItem>
  );
};

//  Basic
export const Default: Story = {
  args: {
    label: "Name",
    name: "name",
  },
  render: (args) => renderWithInput(args, { placeholder: "Enter your name" }),
};

//  Required
export const Required: Story = {
  args: {
    label: "Email",
    name: "email",
    required: true,
  },
  render: (args) => renderWithInput(args, { placeholder: "Enter email", type: "email" }),
};

//  With error
export const WithError: Story = {
  args: {
    label: "Password",
    name: "password",
    error: "Password must be at least 6 characters",
  },
  render: (args) => renderWithInput(args, { placeholder: "Enter password", type: "password" }),
};

//  With helper text
export const WithHelperText: Story = {
  args: {
    label: "Username",
    name: "username",
    helperText: "This will be your login ID",
  },
  render: (args) => renderWithInput(args, { placeholder: "Enter username" }),
};
