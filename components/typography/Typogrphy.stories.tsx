import type { Meta, StoryObj } from "@storybook/react";
import TypographyUI from "./index";

const meta: Meta<typeof TypographyUI> = {
  title: "Components/TypographyUI",
  component: TypographyUI,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["h1","h2","h3","h4","h5","h6","paragraph","caption","quote","code"],
    },
    color: { control: "color" },
    align: {
      control: "select",
      options: ["left", "center", "right", "justify"],
    },
    italic: { control: "boolean" },
    underline: { control: "boolean" },
    strong: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof TypographyUI>;

//  Headings
export const Headings: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      <TypographyUI variant="h1">Heading 1</TypographyUI>
      <TypographyUI variant="h2">Heading 2</TypographyUI>
      <TypographyUI variant="h3">Heading 3</TypographyUI>
      <TypographyUI variant="h4">Heading 4</TypographyUI>
      <TypographyUI variant="h5">Heading 5</TypographyUI>
      <TypographyUI variant="h6">Heading 6</TypographyUI>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Displays all heading variants from h1 to h6 with default styling."
      }
    }
  }
};

//  Paragraph
export const Paragraph: Story = {
  args: {
    variant: "paragraph",
    children: "This is a sample paragraph text. You can adjust alignment, color, and styles using props.",
  },
  parameters: {
    docs: {
      description: {
        story: "A standard paragraph text. Supports alignment, color, and text styles via props."
      }
    }
  }
};

//  Caption
export const Caption: Story = {
  args: {
    variant: "caption",
    children: "This is a caption text. Typically smaller and lighter than normal text.",
  },
  parameters: {
    docs: {
      description: {
        story: "A smaller caption style text for secondary information."
      }
    }
  }
};

//  Quote
export const Quote: Story = {
  args: {
    variant: "quote",
    children: "“This is a blockquote example with left border and italic style.”",
  },
  parameters: {
    docs: {
      description: {
        story: "A blockquote style text with left border and italic font."
      }
    }
  }
};

//  Code
export const Code: Story = {
  args: {
    variant: "code",
    children: "const example = 'Hello, World!';",
  },
  parameters: {
    docs: {
      description: {
        story: "Inline code block style, using monospace font and background highlight."
      }
    }
  }
};

//  Custom Styling
export const CustomStyles: Story = {
  args: {
    variant: "h3",
    children: "Custom styled text",
    color: "#d63384",
    align: "center",
    italic: true,
    underline: true,
    strong: true,
  },
  parameters: {
    docs: {
      description: {
        story: "Example of a text with custom color, center alignment, italic, underline, and bold styling."
      }
    }
  }
};
