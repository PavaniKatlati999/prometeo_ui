import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import dayjs from "dayjs";
import DatePicker from "./index";

const meta: Meta<typeof DatePicker> = {
  title: "Components/DatePicker",
  component: DatePicker,
  tags: ["autodocs"],
  argTypes: {
    disabled: { control: "boolean" },
    allowClear: { control: "boolean" },
    showTime: { control: "boolean" },
    format: { control: "text" },
  },
};
export default meta;

type Story = StoryObj<typeof DatePicker>;

// Default
export const Default: Story = {
  args: {
    placeholder: "Select a date",
    onChange: fn(),
  },
};

// With Default Value
export const WithDefaultValue: Story = {
  args: {
    defaultValue: dayjs(),
    onChange: fn(),
  },
};

// Disabled
export const Disabled: Story = {
  args: {
    placeholder: "Disabled DatePicker",
    disabled: true,
  },
};

// With Clear Option
export const WithClear: Story = {
  args: {
    defaultValue: dayjs("2024-09-03"),
    allowClear: true,
    onChange: fn(),
  },
};

// Custom Format
export const CustomFormat: Story = {
  args: {
    defaultValue: dayjs(),
    format: "DD/MM/YYYY",
    placeholder: "DD/MM/YYYY format",
    onChange: fn(),
  },
};

// Disabled Dates (past dates disabled)
export const DisabledPastDates: Story = {
  args: {
    placeholder: "Future dates only",
    disabledDate: (date) => date.isBefore(dayjs(), "day"),
    onChange: fn(),
  },
};

// With Time Selection (input editable)
export const WithTime: Story = {
  args: {
    showTime: true,
    placeholder: "Enter date/time",
    onChange: fn(),
  },
};
