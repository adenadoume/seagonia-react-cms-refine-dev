import { useList } from "@refinedev/core";
import {
  List,
  useTable,
  DateField,
  BooleanField,
} from "@refinedev/antd";
import { Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";

interface NewsletterSubscriber {
  id: string;
  email: string;
  is_active: boolean;
  created_at: string;
}

export const NewsletterList = () => {
  const { tableProps } = useTable<NewsletterSubscriber>({
    syncWithLocation: true,
    resource: "newsletter_subscribers",
    sorters: {
      initial: [
        {
          field: "created_at",
          order: "desc",
        },
      ],
    },
  });

  const columns: ColumnsType<NewsletterSubscriber> = [
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      sorter: true,
    },
    {
      title: "Status",
      dataIndex: "is_active",
      key: "is_active",
      sorter: true,
      render: (isActive: boolean) => (
        <Tag color={isActive ? "green" : "red"}>
          {isActive ? "Active" : "Inactive"}
        </Tag>
      ),
    },
    {
      title: "Subscribed At",
      dataIndex: "created_at",
      key: "created_at",
      sorter: true,
      render: (value: string) => <DateField value={value} format="LLL" />,
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
