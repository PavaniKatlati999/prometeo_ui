import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Layout, Header, Footer, Content, Sider } from "./index";

const meta: Meta<typeof Layout> = {
  title: "Components/Layout",
  component: Layout,
  tags: ["autodocs"],
  argTypes: {
    hasSider: { control: "boolean" },
    className: { control: "text" },
    style: { control: "object" },
    // Sider props for controls
    collapsed: { control: "boolean" },
    collapsible: { control: "boolean" },
    width: { control: "number" },
  },
};
export default meta;

type Story = StoryObj<typeof Layout>;

//  Basic Layout (No Controls)
export const Basic: Story = {
  render: () => (
    <Layout>
      <Header style={{ background: "#1890ff", color: "white", padding: "16px" }}>
        Header
      </Header>
      <Content style={{ minHeight: "200px", padding: "24px", background: "#f0f2f5" }}>
        Content Area
      </Content>
      <Footer style={{ background: "#001529", color: "white", padding: "16px" }}>
        Footer
      </Footer>
    </Layout>
  ),
};
Basic.parameters = {
  docs: {
    description: {
      story: "A basic layout structure with Header, Content, and Footer. No sidebar included."
    }
  }
};

//  Layout with Sider (Controls Enabled)
export const WithSider: Story = {
  args: {
    hasSider: true,
  },
  render: (args) => (
    <Layout {...args} style={{ minHeight: "250px" }}>
      <Sider style={{ background: "#3f51b5", color: "white", padding: "16px" }}>
        Sidebar
      </Sider>
      <Layout>
        <Header style={{ background: "#1890ff", color: "white", padding: "16px" }}>
          Header
        </Header>
        <Content style={{ padding: "24px", background: "#f0f2f5" }}>
          Main Content
        </Content>
        <Footer style={{ background: "#001529", color: "white", padding: "16px" }}>
          Footer
        </Footer>
      </Layout>
    </Layout>
  ),
};
WithSider.parameters = {
  docs: {
    description: {
      story: "A layout including a sidebar (Sider) with adjustable properties. Useful for dashboards or admin panels."
    }
  }
};

//  Collapsible Sider (Interactive with Controls)
export const CollapsibleSider: Story = {
  args: {
    hasSider: true,
    collapsed: false,
    collapsible: true,
    width: 200,
  },
  render: ({ collapsed, collapsible, width, ...layoutArgs }) => {
    const [isCollapsed, setIsCollapsed] = useState(collapsed);

    return (
      <Layout {...layoutArgs} style={{ minHeight: "250px" }}>
        <Sider
          collapsible={collapsible}
          collapsed={isCollapsed}
          onCollapse={setIsCollapsed}
          width={width}
          style={{ background: "#3f51b5", color: "white", padding: "16px" }}
        >
          {isCollapsed ? "C" : "Sidebar Content"}
        </Sider>
        <Layout>
          <Header style={{ background: "#1890ff", color: "white", padding: "16px" }}>
            Header
          </Header>
          <Content style={{ padding: "24px", background: "#f0f2f5" }}>
            Content with collapsible sidebar
          </Content>
          <Footer style={{ background: "#001529", color: "white", padding: "16px" }}>
            Footer
          </Footer>
        </Layout>
      </Layout>
    );
  },
};
CollapsibleSider.parameters = {
  docs: {
    description: {
      story: "A layout with a collapsible sidebar. Users can toggle the sidebar open/closed interactively."
    }
  }
};
