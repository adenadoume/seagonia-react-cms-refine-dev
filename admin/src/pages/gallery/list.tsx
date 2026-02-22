import React from "react";
import {
  List,
  useTable,
  EditButton,
  ShowButton,
  DeleteButton,
} from "@refinedev/antd";
import { Table, Space, Switch, Image } from "antd";
import type { BaseRecord } from "@refinedev/core";

export const GalleryList: React.FC = () => {
  const { tableProps } = useTable({
    syncWithLocation: true,
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
          dataIndex="image_url"
          title="Image"
          render={(value: string) => (
            <Image
              src={value}
              alt="Gallery image"
              width={80}
              height={60}
              style={{ objectFit: "cover", borderRadius: "4px" }}
            />
          )}
        />
        <Table.Column dataIndex="title" title="Title" />
        <Table.Column dataIndex="description" title="Description" />
        <Table.Column
          dataIndex={["category_id"]}
          title="Category"
          render={(value: string) => value || "N/A"}
        />
        <Table.Column
          dataIndex={["room_id"]}
          title="Room"
          render={(value: string) => value || "N/A"}
        />
        <Table.Column
          dataIndex="is_published"
          title="Published"
          render={(value: boolean) => (
            <Switch checked={value} disabled />
          )}
        />
        <Table.Column
          dataIndex="display_order"
          title="Order"
          sorter
        />
        <Table.Column
          title="Actions"
          dataIndex="actions"
          render={(_, record: BaseRecord) => (
            <Space>
              <EditButton hideText size="small" recordItemId={record.id} />
              <DeleteButton hideText size="small" recordItemId={record.id} />
            </Space>
          )}
        />
      </Table>
    </List>
  );
};
