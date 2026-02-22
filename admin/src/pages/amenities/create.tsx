import { Create, useForm } from "@refinedev/antd";
import { Form, Input, InputNumber, Switch } from "antd";
import type { IAmenity } from "./list";

export const AmenityCreate = () => {
  const { formProps, saveButtonProps } = useForm<IAmenity>();

  return (
    <Create saveButtonProps={saveButtonProps}>
      <Form
        {...formProps}
        layout="vertical"
        initialValues={{
          display_order: 0,
          is_published: true,
        }}
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[
            {
              required: true,
              message: "Please enter amenity name",
            },
          ]}
        >
          <Input placeholder="e.g., WiFi, Air Conditioning" />
        </Form.Item>

        <Form.Item
          label="Icon"
          name="icon"
          help="Lucide icon name (e.g., Wifi, Wind, Coffee)"
        >
          <Input placeholder="e.g., Wifi" />
        </Form.Item>

        <Form.Item label="Description" name="description">
          <Input.TextArea
            rows={4}
            placeholder="Brief description of the amenity"
          />
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
    </Create>
  );
};
