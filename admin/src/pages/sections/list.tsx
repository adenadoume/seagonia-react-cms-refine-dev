import React from "react";
import {
  List,
  useTable,
  EditButton,
} from "@refinedev/antd";
import { Table, Space, Switch, Tag } from "antd";
import type { BaseRecord } from "@refinedev/core";

export const SectionList: React.FC = () => {
  const { tableProps } = useTable({
    syncWithLocation: true,
    sorters: {
      initial: [
        {
          field: "sort_order",
          order: "asc",
        },
      ],
    },
  });

  return (
    <List>
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex="key" title="Key" />
        <Table.Column dataIndex="label" title="Label" />
        <Table.Column
          dataIndex="page"
          title="Page"
          render={(value: string) => <Tag color="blue">{value}</Tag>}
        />
        <Table.Column
          dataIndex="is_visible"
          title="Visible"
          render={(value: boolean) => (
            <Switch checked={value} disabled />
          )}
        />
        <Table.Column
          dataIndex="sort_order"
          title="Sort Order"
          sorter
        />
        <Table.Column
          title="Actions"
          dataIndex="actions"
          render={(_, record: BaseRecord) => (
            <Space>
              <EditButton hideText size="small" recordItemId={record.id} />
            </Space>
          )}
        />
      </Table>
    </List>
  );
};
