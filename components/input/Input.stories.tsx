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
Default.parameters = {
  docs: {
    description: {
      story: "A standard text input. Use this for general text entry."
    }
  }
};

//  With Default Value
export const WithDefaultValue: Story = {
  args: {
    defaultValue: "Hello World",
    onChange: fn(),
  },
};
WithDefaultValue.parameters = {
  docs: {
    description: {
      story: "An input pre-filled with a default value. Useful for forms with existing data."
    }
  }
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
PasswordWithToggle.parameters = {
  docs: {
    description: {
      story: "A password input with a toggle to show/hide the entered text."
    }
  }
};

//  Disabled Input
export const Disabled: Story = {
  args: {
    placeholder: "Disabled input",
    disabled: true,
  },
};
Disabled.parameters = {
  docs: {
    description: {
      story: "A disabled input field. Users cannot interact with it."
    }
  }
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
WithError.parameters = {
  docs: {
    description: {
      story: "An input showing a validation error message. Useful for form feedback."
    }
  }
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
NumberInput.parameters = {
  docs: {
    description: {
      story: "A number-only input field. Supports min/max length restrictions."
    }
  }
};

//  ReadOnly Input
export const ReadOnly: Story = {
  args: {
    value: "This is readonly",
    readOnly: true,
  },
};
ReadOnly.parameters = {
  docs: {
    description: {
      story: "A read-only input field. Users can copy the content but not edit it."
    }
  }
};
