import { Create, useForm } from "@refinedev/antd";
import { Form, Input, InputNumber, Switch } from "antd";
import type { IExperience } from "./list";

export const ExperienceCreate = () => {
  const { formProps, saveButtonProps } = useForm<IExperience>();

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
              message: "Please enter experience name",
            },
          ]}
        >
          <Input placeholder="e.g., Boat Tours, Spa & Wellness" />
        </Form.Item>

        <Form.Item
          label="Icon"
          name="icon"
          help="Lucide icon name (e.g., Ship, Spa, UtensilsCrossed)"
        >
          <Input placeholder="e.g., Ship" />
        </Form.Item>

        <Form.Item label="Description" name="description">
          <Input.TextArea
            rows={6}
            placeholder="Detailed description of the experience"
          />
        </Form.Item>

        <Form.Item
          label="Image URL"
          name="image_url"
          help="URL to experience image (Cloudinary or external)"
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
    </Create>
  );
};
