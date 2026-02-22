import { useShow, useUpdate } from "@refinedev/core";
import { Show, DateField } from "@refinedev/antd";
import { Typography, Card, Descriptions, Select, Space, message } from "antd";

const { Title, Text } = Typography;

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  status: string;
  created_at: string;
  updated_at?: string;
}

export const ContactMessageShow = () => {
  const { queryResult } = useShow<ContactMessage>({
    resource: "contact_messages",
  });
  const { data, isLoading } = queryResult;
  const record = data?.data;

  const { mutate: updateStatus } = useUpdate();

  const handleStatusChange = (newStatus: string) => {
    if (!record?.id) return;

    updateStatus(
      {
        resource: "contact_messages",
        id: record.id,
        values: {
          status: newStatus,
        },
      },
      {
        onSuccess: () => {
          message.success("Status updated successfully");
        },
        onError: () => {
          message.error("Failed to update status");
        },
      }
    );
  };

  return (
    <Show isLoading={isLoading}>
      <Card
        title="Contact Message Details"
        extra={
          <Space>
            <Text>Status:</Text>
            <Select
              value={record?.status}
              onChange={handleStatusChange}
              style={{ width: 120 }}
              options={[
                { value: "new", label: "New" },
                { value: "read", label: "Read" },
                { value: "replied", label: "Replied" },
                { value: "archived", label: "Archived" },
              ]}
            />
          </Space>
        }
      >
        <Descriptions column={1} bordered>
          <Descriptions.Item label="Name">
            <Text strong>{record?.name}</Text>
          </Descriptions.Item>
          <Descriptions.Item label="Email">
            <a href={`mailto:${record?.email}`}>{record?.email}</a>
          </Descriptions.Item>
          {record?.phone && (
            <Descriptions.Item label="Phone">
              <a href={`tel:${record.phone}`}>{record.phone}</a>
            </Descriptions.Item>
          )}
          <Descriptions.Item label="Subject">
            <Text strong>{record?.subject}</Text>
          </Descriptions.Item>
          <Descriptions.Item label="Created At">
            <DateField value={record?.created_at} format="LLL" />
          </Descriptions.Item>
          {record?.updated_at && (
            <Descriptions.Item label="Updated At">
              <DateField value={record.updated_at} format="LLL" />
            </Descriptions.Item>
          )}
        </Descriptions>

        <Card
          title="Message"
          style={{ marginTop: 24 }}
          bodyStyle={{ whiteSpace: "pre-wrap" }}
        >
          <Text>{record?.message}</Text>
        </Card>
      </Card>
    </Show>
  );
};
