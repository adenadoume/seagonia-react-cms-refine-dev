import { useForm } from "@refinedev/antd";
import { Edit } from "@refinedev/antd";
import { Form, Input, InputNumber, Switch, Card, Row, Col, Divider } from "antd";

const { TextArea } = Input;

interface HotelSettings {
  id: string;
  name: string;
  tagline?: string;
  description?: string;
  village?: string;
  near_city?: string;
  region?: string;
  country?: string;
  latitude?: number;
  longitude?: number;
  phone?: string;
  email?: string;
  address?: string;
  instagram_url?: string;
  facebook_url?: string;
  total_rooms?: number;
  is_published: boolean;
}

export const HotelSettingsEdit = () => {
  const { formProps, saveButtonProps, queryResult } = useForm<HotelSettings>({
    resource: "hotel_settings",
    action: "edit",
    redirect: false,
  });

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Card title="Basic Information" style={{ marginBottom: 24 }}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Hotel Name"
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Please enter hotel name",
                  },
                ]}
              >
                <Input placeholder="e.g., Seagonia Hotel" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Tagline" name="tagline">
                <Input placeholder="e.g., Luxury by the Sea" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item label="Description" name="description">
            <TextArea
              rows={4}
              placeholder="Brief description of the hotel"
            />
          </Form.Item>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Total Rooms" name="total_rooms">
                <InputNumber
                  min={1}
                  style={{ width: "100%" }}
                  placeholder="Number of rooms"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Published"
                name="is_published"
                valuePropName="checked"
              >
                <Switch checkedChildren="Yes" unCheckedChildren="No" />
              </Form.Item>
            </Col>
          </Row>
        </Card>

        <Card title="Location" style={{ marginBottom: 24 }}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Village" name="village">
                <Input placeholder="Village name" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Near City" name="near_city">
                <Input placeholder="Nearest city" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Region" name="region">
                <Input placeholder="Region/State" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Country" name="country">
                <Input placeholder="Country" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item label="Address" name="address">
            <TextArea rows={2} placeholder="Full address" />
          </Form.Item>

          <Divider orientation="left">Coordinates</Divider>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Latitude"
                name="latitude"
                rules={[
                  {
                    type: "number",
                    min: -90,
                    max: 90,
                    message: "Latitude must be between -90 and 90",
                  },
                ]}
              >
                <InputNumber
                  style={{ width: "100%" }}
                  placeholder="e.g., 37.9838"
                  step={0.000001}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Longitude"
                name="longitude"
                rules={[
                  {
                    type: "number",
                    min: -180,
                    max: 180,
                    message: "Longitude must be between -180 and 180",
                  },
                ]}
              >
                <InputNumber
                  style={{ width: "100%" }}
                  placeholder="e.g., 23.7275"
                  step={0.000001}
                />
              </Form.Item>
            </Col>
          </Row>
        </Card>

        <Card title="Contact Information" style={{ marginBottom: 24 }}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Phone"
                name="phone"
                rules={[
                  {
                    type: "string",
                    message: "Please enter a valid phone number",
                  },
                ]}
              >
                <Input placeholder="+30 123 456 7890" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  {
                    type: "email",
                    message: "Please enter a valid email",
                  },
                ]}
              >
                <Input placeholder="info@seagonia.com" />
              </Form.Item>
            </Col>
          </Row>
        </Card>

        <Card title="Social Media">
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Instagram URL"
                name="instagram_url"
                rules={[
                  {
                    type: "url",
                    message: "Please enter a valid URL",
                  },
                ]}
              >
                <Input placeholder="https://instagram.com/seagonia" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Facebook URL"
                name="facebook_url"
                rules={[
                  {
                    type: "url",
                    message: "Please enter a valid URL",
                  },
                ]}
              >
                <Input placeholder="https://facebook.com/seagonia" />
              </Form.Item>
            </Col>
          </Row>
        </Card>
      </Form>
    </Edit>
  );
};
