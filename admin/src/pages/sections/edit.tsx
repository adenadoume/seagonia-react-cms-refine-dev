import React from "react";
import { Edit, useForm } from "@refinedev/antd";
import { Form, Input, InputNumber, Switch } from "antd";

export const SectionEdit: React.FC = () => {
  const { formProps, saveButtonProps } = useForm();

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item
          label="Key"
          name="key"
          rules={[
            {
              required: true,
              message: "Please input the section key",
            },
          ]}
        >
          <Input placeholder="e.g., hero_section, about_section" />
        </Form.Item>

        <Form.Item
          label="Label"
          name="label"
          rules={[
            {
              required: true,
              message: "Please input the section label",
            },
          ]}
        >
          <Input placeholder="Human-readable section name" />
        </Form.Item>

        <Form.Item
          label="Page"
          name="page"
          rules={[
            {
              required: true,
              message: "Please input the page name",
            },
          ]}
        >
          <Input placeholder="e.g., home, area, hotel, dining" />
        </Form.Item>

        <Form.Item
          label="Visible"
          name="is_visible"
          valuePropName="checked"
        >
          <Switch />
        </Form.Item>

        <Form.Item
          label="Sort Order"
          name="sort_order"
        >
          <InputNumber min={0} style={{ width: "100%" }} />
        </Form.Item>
      </Form>
    </Edit>
  );
};
