import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import Modal from "./index";
import Button from "../button";

const meta: Meta<typeof Modal> = {
  title: "Components/Modal",
  component: Modal,
  tags: ["autodocs"],
  argTypes: {
    title: { control: "text" },
    open: { control: "boolean" },
    width: { control: "number" },
    height: { control: "text" },
    centered: { control: "boolean" },
    maskClosable: { control: "boolean" },
    isClosable: { control: "boolean" },
  },
};
export default meta;

type Story = StoryObj<typeof Modal>;

// 🔹 Default Modal
export const Default: Story = {
  render: (args) => {
    const [open, setOpen] = useState(true);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Open Modal</Button>
        <Modal {...args} open={open} onCancel={() => setOpen(false)}>
          <p>This is a simple modal body</p>
        </Modal>
      </>
    );
  },
  args: {
    title: "Default Modal",
  },
  parameters: {
    docs: { description: { story: "A simple modal with a default title and body content." } },
  },
};

// 🔹 Modal with Footer
export const WithFooter: Story = {
  render: (args) => {
    const [open, setOpen] = useState(true);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Open Modal</Button>
        <Modal
          {...args}
          open={open}
          onCancel={() => setOpen(false)}
          footer={
            <div style={{ display: "flex", justifyContent: "flex-end", gap: "8px" }}>
              <Button onClick={() => setOpen(false)}>Cancel</Button>
              <Button onClick={() => alert("Confirmed!")}>Confirm</Button>
            </div>
          }
        >
          <p>This modal has a footer with actions.</p>
        </Modal>
      </>
    );
  },
  args: {
    title: "Modal with Footer",
  },
  parameters: {
    docs: { description: { story: "A modal that includes a footer with Cancel and Confirm actions." } },
  },
};

// 🔹 Non-Closable Modal
export const NonClosable: Story = {
  render: (args) => {
    const [open, setOpen] = useState(true);
    return (
      <Modal {...args} open={open} onCancel={() => setOpen(false)}>
        <p>You cannot close this modal via the close button or mask click.</p>
      </Modal>
    );
  },
  args: {
    title: "Non-Closable Modal",
    isClosable: false,
    maskClosable: false,
  },
  parameters: {
    docs: { description: { story: "A modal that cannot be closed by the mask click or the close button." } },
  },
};

// 🔹 Wide Modal
export const Wide: Story = {
  render: (args) => {
    const [open, setOpen] = useState(true);
    return (
      <Modal {...args} open={open} onCancel={() => setOpen(false)}>
        <p>This modal is wider than usual (800px).</p>
      </Modal>
    );
  },
  args: {
    title: "Wide Modal",
    width: 800,
  },
  parameters: {
    docs: { description: { story: "A modal with increased width to accommodate wider content." } },
  },
};

// 🔹 Top-Aligned Modal
export const TopAligned: Story = {
  render: (args) => {
    const [open, setOpen] = useState(true);
    return (
      <Modal {...args} open={open} onCancel={() => setOpen(false)}>
        <p>This modal is not centered, appears near the top.</p>
      </Modal>
    );
  },
  args: {
    title: "Top-Aligned Modal",
    centered: false,
  },
  parameters: {
    docs: { description: { story: "A modal aligned to the top instead of the center of the screen." } },
  },
};
