import type { Meta, StoryObj } from "@storybook/react";
import CountDownUI from "./index";

const meta: Meta<typeof CountDownUI> = {
  title: "Components/CountDownUI",
  component: CountDownUI,
  tags: ["autodocs"],
  argTypes: {
    targetDate: {
      control: "date",
      description: "The target date/time the countdown will count down to"
    },
    onFinish: {
      action: "finished",
      description: "Callback function triggered when the countdown reaches zero"
    },
  },
};

export default meta;
type Story = StoryObj<typeof CountDownUI>;

//  Default (24 hours from now)
export const Default: Story = {
  args: {
    targetDate: new Date(Date.now() + 1000 * 60 * 60 * 24), // 24 hrs later
  },
  parameters: {
    docs: {
      description: {
        story: "Displays a countdown timer counting down 24 hours from the current time."
      }
    }
  }
};

//  Short Countdown (10 seconds)
export const ShortCountdown: Story = {
  args: {
    targetDate: new Date(Date.now() + 10000), // 10 seconds
  },
  parameters: {
    docs: {
      description: {
        story: "Demonstrates a short countdown of 10 seconds, useful for testing quick expirations."
      }
    }
  }
};

//  Expired Countdown
export const Expired: Story = {
  args: {
    targetDate: new Date(Date.now() - 1000 * 60 * 60), // 1 hr ago
  },
  parameters: {
    docs: {
      description: {
        story: "Shows a countdown where the target date has already passed, useful for expired state handling."
      }
    }
  }
};

//  With onFinish action
export const WithOnFinish: Story = {
  args: {
    targetDate: new Date(Date.now() + 15000), // 15 seconds
  },
  parameters: {
    docs: {
      description: {
        story: "Demonstrates a countdown that triggers the `onFinish` action when it reaches zero."
      }
    }
  }
};
