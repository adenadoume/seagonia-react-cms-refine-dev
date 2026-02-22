import React from "react";
import {
  List,
  useTable,
  EditButton,
  DeleteButton,
} from "@refinedev/antd";
import { Table, Space, Tag } from "antd";
import type { BaseRecord } from "@refinedev/core";

export const TextList: React.FC = () => {
  const { tableProps } = useTable({
    syncWithLocation: true,
  });

  return (
    <List>
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex="key" title="Key" />
        <Table.Column dataIndex="label" title="Label" />
        <Table.Column
          dataIndex="value"
          title="Value"
          render={(value: string) => (
            value ? (
              <span>
                {value.substring(0, 60)}
                {value.length > 60 ? "..." : ""}
              </span>
            ) : (
              <Tag color="orange">Empty</Tag>
            )
          )}
        />
        <Table.Column
          dataIndex="page"
          title="Page"
          render={(value: string) => (
            value ? <Tag color="blue">{value}</Tag> : <Tag>All</Tag>
          )}
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
