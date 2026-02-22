import { List, useTable, EditButton, DeleteButton, BooleanField, ImageField } from "@refinedev/antd";
import { Table, Space, Typography } from "antd";
import type { BaseRecord } from "@refinedev/core";

const { Paragraph } = Typography;

export interface ITestimonial extends BaseRecord {
  id: string;
  quote: string;
  name?: string;
  country?: string;
  image_url?: string;
  display_order: number;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export const TestimonialList = () => {
  const { tableProps } = useTable<ITestimonial>({
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
        <Table.Column
          dataIndex="image_url"
          title="Image"
          width={80}
          render={(value) => (
            <ImageField value={value} width={50} height={50} style={{ objectFit: "cover", borderRadius: "50%" }} />
          )}
        />
        <Table.Column
          dataIndex="quote"
          title="Quote"
          width={300}
          render={(value) => (
            <Paragraph ellipsis={{ rows: 2 }} style={{ margin: 0 }}>
              "{value}"
            </Paragraph>
          )}
        />
        <Table.Column dataIndex="name" title="Name" width={150} />
        <Table.Column dataIndex="country" title="Country" width={120} />
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
