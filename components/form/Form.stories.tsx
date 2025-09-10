import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import Form from "./form"; // adjust path
import FormItem from "./formItem";
import Input from "../input";
import Button from "../button";

const meta: Meta<typeof Form> = {
  title: "Components/Form",
  component: Form,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof Form>;

//  Utility: Hook to create controlled Input
const ControlledInput = (props: React.ComponentProps<typeof Input>) => {
  const [value, setValue] = useState("");
  return (
    <Input
      {...props}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};

//  Default Form
export const Default: Story = {
  render: () => (
    <Form className="demo-form" onSubmit={(values) => console.log("Submit:", values)}>
      <FormItem label="Username" name="username" required>
        <ControlledInput placeholder="Enter username" name="username" />
      </FormItem>
      <FormItem label="Password" name="password" required>
        <ControlledInput type="password" placeholder="Enter password" name="password" />
      </FormItem>
      <Button type="submit">Submit</Button>
    </Form>
  ),
};
Default.parameters = {
  docs: {
    description: {
      story: "A basic form with username and password fields. Shows standard required field behavior."
    }
  }
};

//  With helper + error
export const WithValidation: Story = {
  render: () => (
    <Form className="demo-form" onSubmit={(values) => console.log("Submit:", values)}>
      <FormItem
        label="Email"
        name="email"
        required
        helperText="We will never share your email."
        error="Invalid email format"
      >
        <ControlledInput type="email" placeholder="Enter email" name="email" />
      </FormItem>
      <Button type="submit">Submit</Button>
    </Form>
  ),
};
WithValidation.parameters = {
  docs: {
    description: {
      story: "Form demonstrating helper text and validation errors. Use this pattern for fields requiring guidance or feedback."
    }
  }
};

//  Controlled form with live submission preview
export const ControlledForm: Story = {
  render: () => {
    const [submitted, setSubmitted] = useState<any>(null);

    return (
      <div>
        <Form onSubmit={(values) => setSubmitted(values)}>
          <FormItem label="First Name" name="firstName" required>
            <ControlledInput placeholder="Enter first name" />
          </FormItem>
          <FormItem label="Last Name" name="lastName">
            <ControlledInput placeholder="Enter last name" />
          </FormItem>
          <Button type="submit">Submit</Button>
        </Form>

        {submitted && (
          <pre style={{ marginTop: "1rem", background: "#f4f4f4", padding: "8px" }}>
            {JSON.stringify(submitted, null, 2)}
          </pre>
        )}
      </div>
    );
  },
};
ControlledForm.parameters = {
  docs: {
    description: {
      story: "A fully controlled form that shows live submission results below the form. Useful for interactive demos and testing state handling."
    }
  }
};
