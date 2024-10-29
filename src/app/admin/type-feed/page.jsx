"use client";
import Script from "next/script";
import "bootstrap/dist/css/bootstrap.min.css";
import "/public/assets/font-awesome/css/all.min.css";
import "/public/assets/css/type-feed.css";

import React, { useEffect, useState } from "react";
import { Table, Button, Space, Modal, Form, Input, message } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import axios from "axios";

// Columns for the feed category table

const columns = (handleEdit, handleDelete) => [
  {
    title: "Tên loại thức ăn",
    dataIndex: "CategoryFeedName",
    sorter: (a, b) => a.CategoryFeedName.localeCompare(b.CategoryFeedName),
  },
  {
    title: "Hành động",
    render: (text, record) => (
      <Space size="middle">
        <Button icon={<EditOutlined />} onClick={() => handleEdit(record)} />
        <Button
          icon={<DeleteOutlined />}
          onClick={() => handleDelete(record.key)}
        />
      </Space>
    ),
  },
];

export default function FeedCategoryManagement() {
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState(null);

  // Fetch data from the API
  const handleGetData = async () => {
    try {
      const response = await axios({
        method: "GET",
        url: `${process.env.NEXT_PUBLIC_API_URL}/api/v1/FeedTypes`,
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiIyMmUwNzQ2Mi0wNTQ2LTQ0NGYtODBiZC1jZGJmMjI1ZjdlOTAiLCJlbWFpbCI6IkFkbWluQGdtYWlsLmNvbSIsInJvbGUiOiJBZG1pbiIsIm5iZiI6MTczMDE2NDYwOSwiZXhwIjoxNzMwMTY4MjA5LCJpYXQiOjE3MzAxNjQ2MDksImlzcyI6IkJhY2tFbmQiLCJhdWQiOiJGcm9udEVuZCJ9.qlcoi2fuC9127lYaF2jrzdsBTTutxZuR0qC33bieunM", // Replace with actual token
        },
      });
      // Assuming the API returns an object with a data structure like response.data.data.items
      console.log(response.data.data.items);
      setData(
        response.data.data.items.map((item) => ({
          key: item.id, // Assuming item has an id property
          CategoryFeedName: item.feedTypeName,
        }))
      );
    } catch (error) {
      console.error("Error fetching data:", error);
      message.error("Failed to load feed categories");
    }
  };

  useEffect(() => {
    handleGetData(); // Load data on component mount
  }, []);

  const handleEdit = async (record) => {
    setEditingKey(record.key);
    form.setFieldsValue({
      name: record.CategoryFeedName,
    });

    setIsModalOpen(true);
  };

  const handleDelete = (key) => {
    console.log(key);
    Modal.confirm({
      title: "Bạn có chắc chắn muốn xóa loại thức ăn này?",
      content: "Loại thức ăn đã xóa sẽ không thể khôi phục lại.",
      okText: "Xác nhận",
      okType: "danger",
      cancelText: "Huỷ",
      onOk: async () => {
        try {
          const response = await axios({
            method: "DELETE",
            url: `${process.env.NEXT_PUBLIC_API_URL}/api/v1/FeedTypes`,
            headers: {
              "Content-Type": "application/json",
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiIyMmUwNzQ2Mi0wNTQ2LTQ0NGYtODBiZC1jZGJmMjI1ZjdlOTAiLCJlbWFpbCI6IkFkbWluQGdtYWlsLmNvbSIsInJvbGUiOiJBZG1pbiIsIm5iZiI6MTczMDE2NTMxOSwiZXhwIjoxNzMwMTY4OTE5LCJpYXQiOjE3MzAxNjUzMTksImlzcyI6IkJhY2tFbmQiLCJhdWQiOiJGcm9udEVuZCJ9.Yxn3MLddqmLYFwPfBaAaOQ4n5-lJF81rjPZ7iR9xV9Q", // Replace with actual token
            },
            params: {
              id: key,
            },
          });
          console.log(response.status);
          if (response.status === 200) {
            setData(data.filter((item) => item.key !== key));
            message.success(response.data.message);
          }
        } catch (error) {
          message.error(error.response.data.message);
        }
      },
    });
  };

  const handleAdd = () => {
    form.resetFields();
    setEditingKey(null);
    setIsModalOpen(true);
  };

  const handleAddDataAPI = async (feedTypeName) => {
    try {
      const response = await axios({
        method: "POST",
        url: `${process.env.NEXT_PUBLIC_API_URL}/api/v1/FeedTypes`,
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiIyMmUwNzQ2Mi0wNTQ2LTQ0NGYtODBiZC1jZGJmMjI1ZjdlOTAiLCJlbWFpbCI6IkFkbWluQGdtYWlsLmNvbSIsInJvbGUiOiJBZG1pbiIsIm5iZiI6MTczMDE2NDYwOSwiZXhwIjoxNzMwMTY4MjA5LCJpYXQiOjE3MzAxNjQ2MDksImlzcyI6IkJhY2tFbmQiLCJhdWQiOiJGcm9udEVuZCJ9.qlcoi2fuC9127lYaF2jrzdsBTTutxZuR0qC33bieunM", // Replace with actual token
        },
        data: {
          feedTypeName: feedTypeName,
        },
      });
      console.log(response.status);
      if (response.status === 201) {
        console.log(response.data.data);
        setData([
          ...data,
          {
            key: response.data.data.id,
            CategoryFeedName: response.data.data.feedTypeName,
          },
        ]);
        message.success("Thêm loại thức ăn thành công!");
      }
    } catch (error) {
      console.log(error);
      message.error(error.response.data.message);
    }
  };

  const handleUpdateDataAPI = async (key, feedTypeName) => {
    try {
      const response = await axios({
        url: `${process.env.NEXT_PUBLIC_API_URL}/api/v1/FeedTypes`,
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiIyMmUwNzQ2Mi0wNTQ2LTQ0NGYtODBiZC1jZGJmMjI1ZjdlOTAiLCJlbWFpbCI6IkFkbWluQGdtYWlsLmNvbSIsInJvbGUiOiJBZG1pbiIsIm5iZiI6MTczMDE2NDYwOSwiZXhwIjoxNzMwMTY4MjA5LCJpYXQiOjE3MzAxNjQ2MDksImlzcyI6IkJhY2tFbmQiLCJhdWQiOiJGcm9udEVuZCJ9.qlcoi2fuC9127lYaF2jrzdsBTTutxZuR0qC33bieunM", // Replace with actual token
        },
        params: {
          id: key,
        },
        data: {
          feedTypeName: feedTypeName,
        },
      });
      if (response.status == 200) {
        setData((prevData) =>
          prevData.map((item) =>
            item.key === response.data.data.id
              ? { ...item, CategoryFeedName: feedTypeName }
              : item
          )
        );
        message.success("Cập nhật loại thức ăn thành công!");
      }
    } catch (error) {
      console.log(error);
      message.error(error.response.data.message);
    }
  };

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        if (editingKey) {
          //   console.log(editingKey);
          handleUpdateDataAPI(editingKey, values.name);
        } else {
          handleAddDataAPI(values.name);
        }
        setIsModalOpen(false);
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {/* JavaScript Bootstrap */}
      <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js"
        strategy="lazyOnload"
      />
      <Script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM"
        crossOrigin="anonymous"
        strategy="lazyOnload"
      />
      <div className="content">
        <div className="ct_title">
          <h2>Quản lí loại thức ăn</h2>
        </div>
        <div className="ct_text">
          <p>
            Chào mừng bạn đến với hệ thống quản lí loại thức ăn của trang trại
          </p>
        </div>
        <div className="ct_manage">
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={handleAdd}
            style={{ marginBottom: 16 }}
          >
            Thêm loại thức ăn
          </Button>
          <Table
            columns={columns(handleEdit, handleDelete)}
            dataSource={data}
          />
        </div>
      </div>

      {/* Modal to add or edit feed category */}
      <Modal
        title={editingKey ? "Chỉnh sửa loại thức ăn" : "Thêm loại thức ăn mới"}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Lưu"
        cancelText="Hủy"
      >
        <Form form={form} layout="vertical" name="form_in_modal">
          <Form.Item
            name="name"
            label="Tên loại thức ăn"
            rules={[
              { required: true, message: "Vui lòng nhập tên loại thức ăn!" },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
