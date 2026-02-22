import React from "react";
import { Edit, useForm } from "@refinedev/antd";
import { Form, Input, Tabs } from "antd";

const { TabPane } = Tabs;

export const PageContentEdit: React.FC = () => {
  const { formProps, saveButtonProps } = useForm();

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item
          label="Page Name"
          name="page_name"
          rules={[
            {
              required: true,
              message: "Please input the page name",
            },
          ]}
        >
          <Input placeholder="e.g., home, area, hotel, dining" />
        </Form.Item>

        <Tabs defaultActiveKey="hero">
          <TabPane tab="Hero Section" key="hero">
            <Form.Item
              label="Hero Title"
              name="hero_title"
            >
              <Input placeholder="Main hero title" />
            </Form.Item>

            <Form.Item
              label="Hero Subtitle"
              name="hero_subtitle"
            >
              <Input.TextArea rows={2} placeholder="Hero subtitle text" />
            </Form.Item>

            <Form.Item
              label="Hero Image URL"
              name="hero_image_url"
            >
              <Input placeholder="https://example.com/hero.jpg" />
            </Form.Item>
          </TabPane>

          <TabPane tab="Section 1" key="section1">
            <Form.Item
              label="Section 1 Title"
              name="section_1_title"
            >
              <Input placeholder="Section 1 title" />
            </Form.Item>

            <Form.Item
              label="Section 1 Text"
              name="section_1_text"
            >
              <Input.TextArea rows={4} placeholder="Section 1 content" />
            </Form.Item>

            <Form.Item
              label="Section 1 Image URL"
              name="section_1_image_url"
            >
              <Input placeholder="https://example.com/section1.jpg" />
            </Form.Item>
          </TabPane>

          <TabPane tab="Section 2" key="section2">
            <Form.Item
              label="Section 2 Title"
              name="section_2_title"
            >
              <Input placeholder="Section 2 title" />
            </Form.Item>

            <Form.Item
              label="Section 2 Text"
              name="section_2_text"
            >
              <Input.TextArea rows={4} placeholder="Section 2 content" />
            </Form.Item>

            <Form.Item
              label="Section 2 Image URL"
              name="section_2_image_url"
            >
              <Input placeholder="https://example.com/section2.jpg" />
            </Form.Item>
          </TabPane>
        </Tabs>
      </Form>
    </Edit>
  );
};
