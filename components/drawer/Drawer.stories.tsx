import type { Meta, StoryFn } from "@storybook/react";
import { useState } from "react";
import DrawerUI, { DrawerUIProps } from "./index";

const meta: Meta<typeof DrawerUI> = {
  title: "Components/DrawerUI",
  component: DrawerUI,
  tags: ["autodocs"],
  argTypes: {
    open: { control: false }, // controlled by state inside stories
    onClose: { action: "closed" },
    placement: {
      control: { type: "select" },
      options: ["left", "right", "top", "bottom"],
    },
    size: { control: "text" },
    closable: { control: "boolean" },
    maskClosable: { control: "boolean" },
  },
};

export default meta;

// ✅ Template component with state
const Template: StoryFn<DrawerUIProps> = (args) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button onClick={() => setOpen(true)}>Open Drawer</button>
      <DrawerUI
        {...args}
        open={open}
        onClose={() => {
          setOpen(false);
          args.onClose?.();
        }}
      >
        <h3>Drawer Content</h3>
        <p>This is a sample drawer content area 🚀</p>
      </DrawerUI>
    </>
  );
};

// ✅ Now each story binds to Template
export const Default = Template.bind({});
Default.args = {
  placement: "right",
  size: 300,
  closable: true,
  maskClosable: true,
};

export const LeftDrawer = Template.bind({});
LeftDrawer.args = {
  placement: "left",
  size: 280,
};

export const TopDrawer = Template.bind({});
TopDrawer.args = {
  placement: "top",
  size: 200,
};

export const BottomDrawer = Template.bind({});
BottomDrawer.args = {
  placement: "bottom",
  size: 200,
};

export const NonClosable = Template.bind({});
NonClosable.args = {
  closable: false,
};
