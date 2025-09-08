import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import Modal from "./index";
import Button from "../button"; //   fixed import

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

//   Default Modal
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
};

//   Modal with Footer
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
};

//   Non-Closable Modal
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
};

//   Wide Modal
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
};

//   Centered vs Top-Aligned
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
};
