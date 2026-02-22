import React from "react";
import { Create, useForm } from "@refinedev/antd";
import { Form, Input } from "antd";

export const TextCreate: React.FC = () => {
  const { formProps, saveButtonProps } = useForm();

  return (
    <Create saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item
          label="Key"
          name="key"
          rules={[
            {
              required: true,
              message: "Please input the key (unique identifier)",
            },
          ]}
        >
          <Input placeholder="e.g., hero_title, about_description" />
        </Form.Item>

        <Form.Item
          label="Label"
          name="label"
        >
          <Input placeholder="Human-readable label for admin panel" />
        </Form.Item>

        <Form.Item
          label="Value"
          name="value"
        >
          <Input.TextArea
            rows={6}
            placeholder="The actual text content that will be displayed"
          />
        </Form.Item>

        <Form.Item
          label="Page"
          name="page"
        >
          <Input placeholder="e.g., home, area, hotel, dining (leave empty for global)" />
        </Form.Item>
      </Form>
    </Create>
  );
};
