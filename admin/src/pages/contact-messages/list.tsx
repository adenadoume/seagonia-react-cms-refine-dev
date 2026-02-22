import { useList } from "@refinedev/core";
import {
  List,
  useTable,
  DateField,
  ShowButton,
} from "@refinedev/antd";
import { Table, Space, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  status: string;
  created_at: string;
}

export const ContactMessageList = () => {
  const { tableProps } = useTable<ContactMessage>({
    syncWithLocation: true,
    resource: "contact_messages",
    sorters: {
      initial: [
        {
          field: "created_at",
          order: "desc",
        },
      ],
    },
  });

  const columns: ColumnsType<ContactMessage> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: true,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      sorter: true,
    },
    {
      title: "Subject",
      dataIndex: "subject",
      key: "subject",
      sorter: true,
      ellipsis: true,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      sorter: true,
      render: (status: string) => {
        const color = status === "new" ? "blue" : status === "read" ? "green" : "default";
        return <Tag color={color}>{status?.toUpperCase()}</Tag>;
      },
    },
    {
      title: "Created At",
      dataIndex: "created_at",
      key: "created_at",
      sorter: true,
      render: (value: string) => <DateField value={value} format="LLL" />,
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <ShowButton hideText size="small" recordItemId={record.id} />
        </Space>
      ),
    },
  ];

  return (
    <List>
      <Table
        {...tableProps}
        columns={columns}
        rowKey="id"
      />
    </List>
  );
};
