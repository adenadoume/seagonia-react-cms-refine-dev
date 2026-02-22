import { List, useTable, EditButton, DeleteButton, BooleanField } from "@refinedev/antd";
import { Table, Space } from "antd";
import type { BaseRecord } from "@refinedev/core";

export interface IAmenity extends BaseRecord {
  id: string;
  name: string;
  description?: string;
  icon?: string;
  display_order: number;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export const AmenityList = () => {
  const { tableProps } = useTable<IAmenity>({
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
          dataIndex="display_order"
          title="Order"
          width={80}
          sorter
        />
        <Table.Column dataIndex="icon" title="Icon" width={80} />
        <Table.Column dataIndex="name" title="Name" sorter />
        <Table.Column
          dataIndex="description"
          title="Description"
          ellipsis
        />
        <Table.Column
          dataIndex="is_published"
          title="Published"
          width={100}
          render={(value) => <BooleanField value={value} />}
        />
        <Table.Column
          title="Actions"
          dataIndex="actions"
          width={150}
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
