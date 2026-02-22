import { Edit, useForm } from "@refinedev/antd";
import { Form, Input, InputNumber, Switch } from "antd";
import type { ITestimonial } from "./list";

export const TestimonialEdit = () => {
  const { formProps, saveButtonProps, queryResult } = useForm<ITestimonial>();

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item
          label="Quote"
          name="quote"
          rules={[
            {
              required: true,
              message: "Please enter the testimonial quote",
            },
          ]}
        >
          <Input.TextArea
            rows={6}
            placeholder="Enter the guest testimonial..."
          />
        </Form.Item>

        <Form.Item label="Guest Name" name="name">
          <Input placeholder="e.g., John Smith" />
        </Form.Item>

        <Form.Item label="Country" name="country">
          <Input placeholder="e.g., United Kingdom" />
        </Form.Item>

        <Form.Item
          label="Guest Image URL"
          name="image_url"
          help="URL to guest photo (optional, can use avatar placeholder)"
        >
          <Input placeholder="https://..." type="url" />
        </Form.Item>

        <Form.Item
          label="Display Order"
          name="display_order"
          help="Lower numbers appear first"
          rules={[
            {
              required: true,
              type: "number",
              min: 0,
            },
          ]}
        >
          <InputNumber min={0} style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item
          label="Published"
          name="is_published"
          valuePropName="checked"
        >
          <Switch />
        </Form.Item>
      </Form>
    </Edit>
  );
};
