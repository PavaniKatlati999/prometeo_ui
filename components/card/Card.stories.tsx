import type { Meta, StoryObj } from "@storybook/react";
import Card from "./index";

const meta: Meta<typeof Card> = {
  title: "Components/Card",
  component: Card,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "success", "danger", "warning", "info", undefined],
    },
    onClick: { action: "clicked" },
  },
};
export default meta;

type Story = StoryObj<typeof Card>;

//  Basic Card
export const Default: Story = {
  args: {
    title: "Default Card",
    body: "This is a simple card with body content.",
    footer: "Card footer",
  },
  parameters: {
    docs: {
      description: {
        story: "Displays a basic card with a title, body, and footer. Useful for default layouts."
      }
    }
  }
};

//  Card with Image
export const WithImage: Story = {
  args: {
    title: "Card with Image",
    body: "This card displays an image at the top.",
    imageUrl: "https://via.placeholder.com/400x200",
    footer: "Footer content",
  },
  parameters: {
    docs: {
      description: {
        story: "Shows a card with an image above the content, demonstrating image integration in the card."
      }
    }
  }
};

//  Variant Cards
export const Primary: Story = {
  args: {
    title: "Primary Card",
    body: "This card uses the 'primary' variant.",
    variant: "primary",
    footer: "Primary footer",
  },
  parameters: {
    docs: {
      description: {
        story: "Card styled with the 'primary' variant to indicate importance or main actions."
      }
    }
  }
};

export const Danger: Story = {
  args: {
    title: "Danger Card",
    body: "This card uses the 'danger' variant.",
    variant: "danger",
    footer: "Danger footer",
  },
  parameters: {
    docs: {
      description: {
        story: "Card styled with the 'danger' variant to indicate critical or destructive actions."
      }
    }
  }
};

export const Success: Story = {
  args: {
    title: "Success Card",
    body: "This card uses the 'success' variant.",
    variant: "success",
    footer: "Success footer",
  },
  parameters: {
    docs: {
      description: {
        story: "Card styled with the 'success' variant to indicate positive outcomes or confirmations."
      }
    }
  }
};

//  Card with Extra Actions
export const WithExtra: Story = {
  args: {
    title: "Card with Extra Action",
    body: "This card has extra content in the header.",
    extra: "Action",
    footer: "Footer text",
  },
  parameters: {
    docs: {
      description: {
        story: "Demonstrates a card that includes extra content or actions in the header section."
      }
    }
  }
};

//  Clickable Card
export const Clickable: Story = {
  args: {
    title: "Clickable Card",
    body: "Clicking this card will log an action.",
    footer: "Click me!",
  },
  parameters: {
    docs: {
      description: {
        story: "Shows a card designed to be interactive, triggering an action when clicked."
      }
    }
  }
};

//  Card with Custom Children
export const WithChildren: Story = {
  args: {
    children: (
      <div>
        <h4>Custom Children Content</h4>
        <p>This replaces the body prop entirely.</p>
      </div>
    ),
    footer: "Custom footer",
  },
  parameters: {
    docs: {
      description: {
        story: "Demonstrates using custom children inside the card, overriding the default body prop for more flexible layouts."
      }
    }
  }
};
