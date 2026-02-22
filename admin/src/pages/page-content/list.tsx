import React from "react";
import {
  List,
  useTable,
  EditButton,
} from "@refinedev/antd";
import { Table, Space, Tag } from "antd";
import type { BaseRecord } from "@refinedev/core";

export const PageContentList: React.FC = () => {
  const { tableProps } = useTable({
    syncWithLocation: true,
  });

  return (
    <List>
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex="page_name" title="Page Name" />
        <Table.Column
          dataIndex="hero_title"
          title="Hero Title"
          render={(value: string) => (
            value ? value.substring(0, 50) + (value.length > 50 ? "..." : "") : "N/A"
          )}
        />
        <Table.Column
          dataIndex="hero_subtitle"
          title="Hero Subtitle"
          render={(value: string) => (
            value ? value.substring(0, 50) + (value.length > 50 ? "..." : "") : "N/A"
          )}
        />
        <Table.Column
          dataIndex="is_published"
          title="Status"
          render={(value: boolean) => (
            <Tag color={value ? "green" : "red"}>
              {value ? "Published" : "Draft"}
            </Tag>
          )}
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
