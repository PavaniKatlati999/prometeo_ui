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
  parameters: {
    docs: {
      description: {
        story: "A basic DatePicker with default settings. Users can select a date from the calendar."
      }
    }
  }
};

// With Default Value
export const WithDefaultValue: Story = {
  args: {
    defaultValue: dayjs(),
    onChange: fn(),
  },
  parameters: {
    docs: {
      description: {
        story: "DatePicker pre-filled with a default date. Useful when you want to show an initial selected value."
      }
    }
  }
};

// Disabled
export const Disabled: Story = {
  args: {
    placeholder: "Disabled DatePicker",
    disabled: true,
  },
  parameters: {
    docs: {
      description: {
        story: "A disabled DatePicker that cannot be interacted with."
      }
    }
  }
};

// With Clear Option
export const WithClear: Story = {
  args: {
    defaultValue: dayjs("2024-09-03"),
    allowClear: true,
    onChange: fn(),
  },
  parameters: {
    docs: {
      description: {
        story: "DatePicker with a clear button. Users can remove the selected date easily."
      }
    }
  }
};

// Custom Format
export const CustomFormat: Story = {
  args: {
    defaultValue: dayjs(),
    format: "DD/MM/YYYY",
    placeholder: "DD/MM/YYYY format",
    onChange: fn(),
  },
  parameters: {
    docs: {
      description: {
        story: "DatePicker with a custom display format. You can customize the date format as needed."
      }
    }
  }
};

// Disabled Dates (past dates disabled)
export const DisabledPastDates: Story = {
  args: {
    placeholder: "Future dates only",
    disabledDate: (date) => date.isBefore(dayjs(), "day"),
    onChange: fn(),
  },
  parameters: {
    docs: {
      description: {
        story: "DatePicker that disables past dates, allowing selection of future dates only."
      }
    }
  }
};

// With Time Selection (input editable)
export const WithTime: Story = {
  args: {
    showTime: true,
    placeholder: "Enter date/time",
    onChange: fn(),
  },
  parameters: {
    docs: {
      description: {
        story: "DatePicker with time selection enabled. Users can input both date and time."
      }
    }
  }
};
