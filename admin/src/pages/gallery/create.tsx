import React from "react";
import { Create, useForm, useSelect } from "@refinedev/antd";
import { Form, Input, InputNumber, Switch, Select } from "antd";

export const GalleryCreate: React.FC = () => {
  const { formProps, saveButtonProps } = useForm();

  const { selectProps: categorySelectProps } = useSelect({
    resource: "gallery_categories",
    optionLabel: "name",
    optionValue: "id",
  });

  const { selectProps: roomSelectProps } = useSelect({
    resource: "rooms",
    optionLabel: "name",
    optionValue: "id",
  });

  return (
    <Create saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item
          label="Title"
          name="title"
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
        >
          <Input.TextArea rows={3} />
        </Form.Item>

        <Form.Item
          label="Image URL"
          name="image_url"
          rules={[
            {
              required: true,
              message: "Please input the image URL",
            },
          ]}
        >
          <Input placeholder="https://example.com/image.jpg" />
        </Form.Item>

        <Form.Item
          label="Category"
          name="category_id"
        >
          <Select
            {...categorySelectProps}
            allowClear
            placeholder="Select a category"
          />
        </Form.Item>

        <Form.Item
          label="Room"
          name="room_id"
        >
          <Select
            {...roomSelectProps}
            allowClear
            placeholder="Select a room"
          />
        </Form.Item>

        <Form.Item
          label="Published"
          name="is_published"
          valuePropName="checked"
          initialValue={true}
        >
          <Switch defaultChecked />
        </Form.Item>

        <Form.Item
          label="Display Order"
          name="display_order"
          initialValue={0}
        >
          <InputNumber min={0} style={{ width: "100%" }} />
        </Form.Item>
      </Form>
    </Create>
  );
};
