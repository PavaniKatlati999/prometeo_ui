import type { Meta, StoryObj } from "@storybook/react";
import TabUI from "./index";

const meta: Meta<typeof TabUI> = {
  title: "Components/TabUI",
  component: TabUI,
  tags: ["autodocs"],
  argTypes: {
    defaultActive: { control: "number" },
    className: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof TabUI>;

// Default Tabs
export const Default: Story = {
  args: {
    items: [
      { label: "Tab 1", content: "This is Tab 1 content" },
      { label: "Tab 2", content: "This is Tab 2 content" },
      { label: "Tab 3", content: "This is Tab 3 content" },
    ],
    defaultActive: 0,
  },
  parameters: {
    docs: { description: { story: "A simple tab component with three default tabs." } },
  },
};

// With Disabled Tab
export const WithDisabled: Story = {
  args: {
    items: [
      { label: "Active Tab", content: "Content of active tab" },
      { label: "Disabled Tab", content: "This should not be clickable", disabled: true },
      { label: "Another Tab", content: "This is another tab's content" },
    ],
    defaultActive: 0,
  },
  parameters: {
    docs: { description: { story: "Demonstrates a tab that is disabled and cannot be selected." } },
  },
};

// Custom Active Default
export const CustomActive: Story = {
  args: {
    items: [
      { label: "Overview", content: "Overview content" },
      { label: "Details", content: "Details content" },
      { label: "Settings", content: "Settings content" },
    ],
    defaultActive: 1,
  },
  parameters: {
    docs: { description: { story: "Sets a custom default active tab using `defaultActive` prop." } },
  },
};

// Complex Content
export const ComplexContent: Story = {
  args: {
    items: [
      { label: "Profile", content: <div><h3>User Profile</h3><p>Details about the user go here.</p></div> },
      { label: "Analytics", content: <div><strong>Chart/Graph</strong><p>Some analytics data here.</p></div> },
      { label: "Logs", content: <ul><li>Log entry 1</li><li>Log entry 2</li></ul> },
    ],
    defaultActive: 0,
  },
  parameters: {
    docs: { description: { story: "Tabs containing complex JSX content like headings, paragraphs, and lists." } },
  },
};
