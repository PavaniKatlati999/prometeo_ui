import type { Meta, StoryObj } from "@storybook/react";
import CollapsePanel from "./index";

const meta: Meta<typeof CollapsePanel> = {
  title: "Components/CollapsePanel",
  component: CollapsePanel,
  tags: ["autodocs"],
  argTypes: {
    header: { control: "text", description: "Content displayed in the panel header" },
    defaultOpen: { control: "boolean", description: "Controls whether the panel is open by default" },
  },
};

export default meta;
type Story = StoryObj<typeof CollapsePanel>;

//  Single Panel with Controls
export const Default: Story = {
  args: {
    header: "This is panel header 1",
    defaultOpen: true,
    children: (
      <p>
        A dog is a type of domesticated animal. Known for its loyalty and
        faithfulness, it can be found as a welcome guest in many households
        across the world.
      </p>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: "A single collapsible panel that starts open by default. Users can toggle its visibility by clicking the header."
      }
    }
  }
};

//  Multiple Panels (manual render, no controls)
export const MultiplePanels: Story = {
  render: () => (
    <div>
      <CollapsePanel header="This is panel header 1" defaultOpen>
        <p>
          A dog is a type of domesticated animal. Known for its loyalty and
          faithfulness, it can be found as a welcome guest in many households
          across the world.
        </p>
      </CollapsePanel>

      <CollapsePanel header="This is panel header 2">
        <p>Panel 2 content goes here 🚀</p>
      </CollapsePanel>

      <CollapsePanel header="This is panel header 3">
        <p>Panel 3 content goes here 🌟</p>
      </CollapsePanel>
    </div>
  ),
  args: {},
  parameters: {
    docs: {
      description: {
        story: "Demonstrates multiple collapsible panels rendered together. Each panel can be toggled independently."
      }
    }
  }
};

//  Closed by Default
export const ClosedByDefault: Story = {
  args: {
    header: "This panel starts closed",
    defaultOpen: false,
    children: <p>You can toggle me open/close by clicking the header.</p>,
  },
  parameters: {
    docs: {
      description: {
        story: "A collapsible panel that starts closed. Useful for sections that should remain hidden until user interaction."
      }
    }
  }
};
