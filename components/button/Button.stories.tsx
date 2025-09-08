import type { Meta, StoryObj } from "@storybook/react";
import Button from "./index";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    onClick: { action: "clicked" },
    color: { control: "color" },
    iconPos: {
      control: "radio",
      options: ["left", "right"],
    },
    type: {
      control: "select",
      options: [
        "primary",
        "secondary",
        "default",
        "dashed",
        "text",
        "link",
        "light",
      ],
    },
    size: {
      control: "radio",
      options: ["small", "middle", "large"],
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          "The **Button** component is a reusable UI element designed to trigger actions. It supports multiple variants (`type`), sizes, icons, and states such as disabled and loading. Use it consistently across your application for primary and secondary actions.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

// ✅ Default
export const Default: Story = {
  args: {
    text: "Default Button",
    type: "default",
    size: "middle",
  },
  parameters: {
    docs: {
      description: {
        story:
          "The **Default Button** provides a neutral option for actions that are not primary. It is typically used when you want a subtle call-to-action.",
      },
    },
  },
};

// ✅ Primary
export const Primary: Story = {
  args: {
    text: "Primary Button",
    type: "primary",
    size: "middle",
  },
  parameters: {
    docs: {
      description: {
        story:
          "The **Primary Button** emphasizes the main action on a page or within a component. Use it sparingly—ideally only once per view—to guide users toward the most important task.",
      },
    },
  },
};

// ✅ Disabled
export const Disabled: Story = {
  args: {
    text: "Disabled Button",
    type: "default",
    disabled: true,
    disabledTitle: "Can't click",
  },
  parameters: {
    docs: {
      description: {
        story:
          "The **Disabled Button** indicates an action that is unavailable. It prevents user interaction and can be accompanied by a tooltip (via `disabledTitle`) to explain why the action is disabled.",
      },
    },
  },
};

// ✅ Loading
export const Loading: Story = {
  args: {
    text: "Loading...",
    type: "dashed",
    loading: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          "The **Loading Button** provides feedback that an action is in progress. It disables interaction and shows a spinner, ensuring users don’t trigger the same action multiple times.",
      },
    },
  },
};

// ✅ With Icon
export const WithIcon: Story = {
  args: {
    text: "Button with Icon",
    type: "secondary",
    iconPos: "left",
    icon: "▶️",
  },
  parameters: {
    docs: {
      description: {
        story:
          "The **Icon Button** combines text with an icon, improving recognition and usability. Icons can be placed on the **left** or **right** (`iconPos`), making it flexible for different use cases.",
      },
    },
  },
};

// ✅ Colored
export const Colored: Story = {
  args: {
    text: "Custom Color",
    color: "#ff5733",
  },
  parameters: {
    docs: {
      description: {
        story:
          "The **Custom Colored Button** allows you to override default styling with a custom `color`. This is useful for brand-specific designs or highlighting special actions.",
      },
    },
  },
};
