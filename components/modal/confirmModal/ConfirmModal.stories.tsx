import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import ConfirmModalComponent from "./index";
import Button from "../../button";

const meta: Meta<typeof ConfirmModalComponent> = {
  title: "Components/Modal/ConfirmModal",
  component: ConfirmModalComponent,
  tags: ["autodocs"],
  argTypes: {
    title: { control: "text" },
    content: { control: "text" },
    type: {
      control: "select",
      options: ["default", "success", "info", "warning", "delete", "error"],
    },
    okText: { control: "text" },
    cancelText: { control: "text" },
    showCancelButton: { control: "boolean" },
    isClosable: { control: "boolean" },
  },
};
export default meta;

type Story = StoryObj<typeof ConfirmModalComponent>;

// 🔹 Default Confirm Modal
export const Default: Story = {
  render: (args) => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Open Confirm</Button>
        {open && (
          <ConfirmModalComponent
            {...args}
            onCancel={() => setOpen(false)}
            onOk={() => {
              alert("Confirmed!");
              setOpen(false);
            }}
          />
        )}
      </>
    );
  },
  args: {
    title: "Are you sure?",
    content: "This action cannot be undone.",
    type: "default",
  },
  parameters: {
    docs: { description: { story: "A basic confirm modal with default type and cancel/ok actions." } },
  },
};

// 🔹 Success Modal
export const Success: Story = {
  ...Default,
  args: {
    title: "Success!",
    content: "Your operation was completed successfully.",
    type: "success",
    okText: "Great!",
  },
  parameters: {
    docs: { description: { story: "Displays a success confirm modal with custom OK text." } },
  },
};

// 🔹 Warning Modal
export const Warning: Story = {
  ...Default,
  args: {
    title: "Are you absolutely sure?",
    content: "This might have unintended consequences.",
    type: "warning",
    okText: "Proceed",
    cancelText: "Cancel",
  },
  parameters: {
    docs: { description: { story: "Displays a warning confirm modal for cautionary actions." } },
  },
};

// 🔹 Error Modal
export const Error: Story = {
  ...Default,
  args: {
    title: "Something went wrong",
    content: "An unexpected error occurred. Please try again later.",
    type: "error",
    okText: "Close",
    showCancelButton: false,
  },
  parameters: {
    docs: { description: { story: "Displays an error confirm modal without a cancel button." } },
  },
};

// 🔹 Delete Modal
export const Delete: Story = {
  ...Default,
  args: {
    title: "Delete Item?",
    content: "This action is permanent. Do you really want to delete this item?",
    type: "delete",
    okText: "Delete",
    cancelText: "Cancel",
  },
  parameters: {
    docs: { description: { story: "A delete confirm modal for destructive actions with both OK and Cancel options." } },
  },
};
