import { Create, useForm } from "@refinedev/antd";
import { Form, Input, InputNumber, Select, Switch } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const { TextArea } = Input;

interface IRoom {
  room_type: "A" | "B" | "C" | "D" | "E" | "F";
  name: string;
  slug: string;
  description?: string;
  highlight?: string;
  count: number;
  floor?: string;
  max_guests: number;
  bed_options?: string[];
  image_url?: string;
  is_featured: boolean;
  is_published: boolean;
  display_order: number;
}

export const RoomCreate = () => {
  const { formProps, saveButtonProps } = useForm<IRoom>();

  return (
    <Create saveButtonProps={saveButtonProps}>
      <Form
        {...formProps}
        layout="vertical"
        initialValues={{
          count: 1,
          max_guests: 2,
          is_featured: false,
          is_published: true,
          display_order: 0,
        }}
      >
        <Form.Item
          label="Room Type"
          name="room_type"
          rules={[
            {
              required: true,
              message: "Please select room type",
            },
          ]}
        >
          <Select
            size="large"
            options={[
              { label: "Type A", value: "A" },
              { label: "Type B", value: "B" },
              { label: "Type C", value: "C" },
              { label: "Type D", value: "D" },
              { label: "Type E", value: "E" },
              { label: "Type F", value: "F" },
            ]}
          />
        </Form.Item>

        <Form.Item
          label="Name"
          name="name"
          rules={[
            {
              required: true,
              message: "Please enter room name",
            },
          ]}
        >
          <Input size="large" placeholder="e.g., Deluxe Sea View" />
        </Form.Item>

        <Form.Item
          label="Slug"
          name="slug"
          rules={[
            {
              required: true,
              message: "Please enter URL slug",
            },
          ]}
          extra="URL-friendly identifier (e.g., deluxe-sea-view)"
        >
          <Input size="large" placeholder="deluxe-sea-view" />
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
        >
          <TextArea
            rows={6}
            placeholder="Enter detailed room description..."
          />
        </Form.Item>

        <Form.Item
          label="Highlight"
          name="highlight"
          extra="A short highlight or tagline for the room"
        >
          <Input size="large" placeholder="e.g., Breathtaking sea views" />
        </Form.Item>

        <Form.Item
          label="Number of Rooms"
          name="count"
          rules={[
            {
              required: true,
              message: "Please enter room count",
            },
          ]}
        >
          <InputNumber
            size="large"
            min={1}
            style={{ width: "100%" }}
          />
        </Form.Item>

        <Form.Item
          label="Floor"
          name="floor"
        >
          <Input size="large" placeholder="e.g., Ground Floor, 1st Floor" />
        </Form.Item>

        <Form.Item
          label="Maximum Guests"
          name="max_guests"
          rules={[
            {
              required: true,
              message: "Please enter maximum guests",
            },
          ]}
        >
          <InputNumber
            size="large"
            min={1}
            max={10}
            style={{ width: "100%" }}
          />
        </Form.Item>

        <Form.Item
          label="Bed Options"
          name="bed_options"
          extra="Enter bed configurations (e.g., 1 Double Bed, 2 Single Beds)"
        >
          <Select
            mode="tags"
            size="large"
            placeholder="Type and press Enter to add bed options"
            style={{ width: "100%" }}
          />
        </Form.Item>

        <Form.Item
          label="Image URL"
          name="image_url"
        >
          <Input
            size="large"
            placeholder="https://example.com/room-image.jpg"
            addonAfter={<UploadOutlined />}
          />
        </Form.Item>

        <Form.Item
          label="Featured Room"
          name="is_featured"
          valuePropName="checked"
          extra="Featured rooms appear prominently on the website"
        >
          <Switch />
        </Form.Item>

        <Form.Item
          label="Published"
          name="is_published"
          valuePropName="checked"
          extra="Only published rooms are visible on the website"
        >
          <Switch />
        </Form.Item>

        <Form.Item
          label="Display Order"
          name="display_order"
          extra="Lower numbers appear first"
        >
          <InputNumber
            size="large"
            min={0}
            style={{ width: "100%" }}
          />
        </Form.Item>
      </Form>
    </Create>
  );
};
