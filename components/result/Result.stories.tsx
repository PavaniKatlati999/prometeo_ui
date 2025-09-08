import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import Result from "./index";
import Button from "../button";

const meta: Meta<typeof Result> = {
  title: "Components/Result",
  component: Result,
  tags: ["autodocs"],
  argTypes: {
    title: { control: "text" },
    subtitle: { control: "text" },
    resultInsideModal: { control: "boolean" },
    width: { control: "number" },
    height: { control: "number" },
  },
};
export default meta;

type Story = StoryObj<typeof Result>;

export const Success: Story = {
  args: {
    icon: <img src="/svgs/confirmModal-success.svg" width={80} height={80} />,
    title: "Success!",
    subtitle: "Your operation was completed successfully.",
    extra: <Button onClick={() => alert("Continue clicked!")}>Continue</Button>,
    resultInsideModal: true,
  },
};

export const ErrorResult: Story = {
  args: {
    icon: <img src="/svgs/error.svg" width={80} height={80} />,
    title: "Something went wrong",
    subtitle: "Please try again later.",
    extra: (
      <>
        <Button onClick={() => alert("Retrying...")}>Retry</Button>
        <Button onClick={() => alert("Cancel clicked!")}>Cancel</Button>
      </>
    ),
    resultInsideModal: true,
  },
};

export const InfoInline: Story = {
  args: {
    icon: <img src="/svgs/confirmModal-info.svg" width={80} height={80} />,
    title: "Information",
    subtitle: "This is an inline result message without a modal.",
    extra: <Button>Okay</Button>,
    resultInsideModal: false,
  },
};

export const Warning: Story = {
  args: {
    icon: <img src="/svgs/confirmModal-warning.svg" width={80} height={80} />,
    title: "Are you sure?",
    subtitle: "This action might have unintended consequences.",
    extra: (
      <div style={{ display: "flex", gap: "8px" }}>
        <Button onClick={() => alert("Confirmed!")}>Confirm</Button>
        <Button onClick={() => alert("Cancelled!")}>Cancel</Button>
      </div>
    ),
    resultInsideModal: true,
  },
};
