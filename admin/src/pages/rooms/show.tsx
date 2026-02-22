import { Show, TextField, BooleanField } from "@refinedev/antd";
import { useShow } from "@refinedev/core";
import { Typography, Space, Tag, Image, Divider, Card, Row, Col } from "antd";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  UserOutlined,
  HomeOutlined,
  StarOutlined,
  NumberOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;

interface IRoom {
  id: string;
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
  created_at: string;
  updated_at: string;
}

export const RoomShow = () => {
  const { queryResult } = useShow<IRoom>();
  const { data, isLoading } = queryResult;
  const record = data?.data;

  return (
    <Show isLoading={isLoading}>
      <Card>
        {/* Header Section */}
        <Space direction="vertical" size="large" style={{ width: "100%" }}>
          <div>
            <Space size="middle" align="center">
              <Tag color="blue" style={{ fontSize: "18px", fontWeight: "bold", padding: "8px 16px" }}>
                Type {record?.room_type}
              </Tag>
              {record?.is_featured && (
                <Tag icon={<StarOutlined />} color="gold" style={{ fontSize: "14px", padding: "4px 12px" }}>
                  Featured
                </Tag>
              )}
              {record?.is_published ? (
                <Tag color="success" style={{ fontSize: "14px", padding: "4px 12px" }}>
                  Published
                </Tag>
              ) : (
                <Tag color="default" style={{ fontSize: "14px", padding: "4px 12px" }}>
                  Draft
                </Tag>
              )}
            </Space>
            <Title level={2} style={{ marginTop: "16px", marginBottom: "8px" }}>
              {record?.name}
            </Title>
            {record?.highlight && (
              <Text type="secondary" style={{ fontSize: "16px" }}>
                {record.highlight}
              </Text>
            )}
          </div>

          <Divider />

          {/* Image Section */}
          {record?.image_url && (
            <div>
              <Title level={5}>Room Image</Title>
              <Image
                src={record.image_url}
                alt={record.name}
                style={{
                  maxWidth: "100%",
                  maxHeight: "400px",
                  borderRadius: "8px",
                  objectFit: "cover",
                }}
              />
            </div>
          )}

          {/* Main Info Section */}
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12} md={6}>
              <Card size="small" style={{ textAlign: "center" }}>
                <HomeOutlined style={{ fontSize: "24px", color: "#C9A96E" }} />
                <div style={{ marginTop: "8px" }}>
                  <Text type="secondary" style={{ fontSize: "12px", display: "block" }}>
                    Room Count
                  </Text>
                  <Text strong style={{ fontSize: "18px" }}>
                    {record?.count}
                  </Text>
                </div>
              </Card>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Card size="small" style={{ textAlign: "center" }}>
                <UserOutlined style={{ fontSize: "24px", color: "#C9A96E" }} />
                <div style={{ marginTop: "8px" }}>
                  <Text type="secondary" style={{ fontSize: "12px", display: "block" }}>
                    Max Guests
                  </Text>
                  <Text strong style={{ fontSize: "18px" }}>
                    {record?.max_guests}
                  </Text>
                </div>
              </Card>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Card size="small" style={{ textAlign: "center" }}>
                <NumberOutlined style={{ fontSize: "24px", color: "#C9A96E" }} />
                <div style={{ marginTop: "8px" }}>
                  <Text type="secondary" style={{ fontSize: "12px", display: "block" }}>
                    Display Order
                  </Text>
                  <Text strong style={{ fontSize: "18px" }}>
                    {record?.display_order}
                  </Text>
                </div>
              </Card>
            </Col>
            {record?.floor && (
              <Col xs={24} sm={12} md={6}>
                <Card size="small" style={{ textAlign: "center" }}>
                  <HomeOutlined style={{ fontSize: "24px", color: "#C9A96E" }} />
                  <div style={{ marginTop: "8px" }}>
                    <Text type="secondary" style={{ fontSize: "12px", display: "block" }}>
                      Floor
                    </Text>
                    <Text strong style={{ fontSize: "18px" }}>
                      {record.floor}
                    </Text>
                  </div>
                </Card>
              </Col>
            )}
          </Row>

          {/* Description Section */}
          {record?.description && (
            <>
              <Divider />
              <div>
                <Title level={5}>Description</Title>
                <Text style={{ whiteSpace: "pre-wrap" }}>{record.description}</Text>
              </div>
            </>
          )}

          {/* Bed Options Section */}
          {record?.bed_options && record.bed_options.length > 0 && (
            <>
              <Divider />
              <div>
                <Title level={5}>Bed Options</Title>
                <Space wrap>
                  {record.bed_options.map((option, index) => (
                    <Tag key={index} color="purple" style={{ fontSize: "14px", padding: "6px 12px" }}>
                      {option}
                    </Tag>
                  ))}
                </Space>
              </div>
            </>
          )}

          {/* Technical Details */}
          <Divider />
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Title level={5}>Technical Details</Title>
            </Col>
            <Col xs={24} md={12}>
              <Space direction="vertical" size="small">
                <div>
                  <Text type="secondary">Slug:</Text>
                  <br />
                  <Text code>{record?.slug}</Text>
                </div>
                <div>
                  <Text type="secondary">Room ID:</Text>
                  <br />
                  <Text code style={{ fontSize: "11px" }}>{record?.id}</Text>
                </div>
              </Space>
            </Col>
            <Col xs={24} md={12}>
              <Space direction="vertical" size="small">
                <div>
                  <Text type="secondary">Created:</Text>
                  <br />
                  <Text>{record?.created_at ? new Date(record.created_at).toLocaleString() : "-"}</Text>
                </div>
                <div>
                  <Text type="secondary">Last Updated:</Text>
                  <br />
                  <Text>{record?.updated_at ? new Date(record.updated_at).toLocaleString() : "-"}</Text>
                </div>
              </Space>
            </Col>
          </Row>
        </Space>
      </Card>
    </Show>
  );
};
