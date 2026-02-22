import { List, useTable, EditButton, ShowButton, DeleteButton } from "@refinedev/antd";
import { Table, Space, Tag } from "antd";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";

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

export const RoomList = () => {
  const { tableProps } = useTable<IRoom>({
    sorters: {
      initial: [
        {
          field: "display_order",
          order: "asc",
        },
      ],
    },
  });

  return (
    <List>
      <Table {...tableProps} rowKey="id">
        <Table.Column
          dataIndex="room_type"
          title="Type"
          sorter
          render={(value) => (
            <Tag color="blue" style={{ fontSize: "14px", fontWeight: "bold" }}>
              {value}
            </Tag>
          )}
        />
        <Table.Column
          dataIndex="name"
          title="Name"
          sorter
          render={(value) => <strong>{value}</strong>}
        />
        <Table.Column
          dataIndex="count"
          title="Count"
          sorter
          align="center"
        />
        <Table.Column
          dataIndex="floor"
          title="Floor"
          sorter
        />
        <Table.Column
          dataIndex="max_guests"
          title="Max Guests"
          sorter
          align="center"
        />
        <Table.Column
          dataIndex="is_featured"
          title="Featured"
          align="center"
          render={(value) =>
            value ? (
              <CheckCircleOutlined style={{ color: "#52c41a", fontSize: "18px" }} />
            ) : (
              <CloseCircleOutlined style={{ color: "#d9d9d9", fontSize: "18px" }} />
            )
          }
        />
        <Table.Column
          dataIndex="is_published"
          title="Published"
          align="center"
          render={(value) =>
            value ? (
              <Tag color="success">Published</Tag>
            ) : (
              <Tag color="default">Draft</Tag>
            )
          }
        />
        <Table.Column
          dataIndex="display_order"
          title="Order"
          sorter
          align="center"
        />
        <Table.Column
          title="Actions"
          dataIndex="actions"
          fixed="right"
          render={(_, record: IRoom) => (
            <Space>
              <ShowButton hideText size="small" recordItemId={record.id} />
              <EditButton hideText size="small" recordItemId={record.id} />
              <DeleteButton hideText size="small" recordItemId={record.id} />
            </Space>
          )}
        />
      </Table>
    </List>
  );
};
