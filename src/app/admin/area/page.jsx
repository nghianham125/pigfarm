"use client";
import Script from "next/script";
import "bootstrap/dist/css/bootstrap.min.css";
import "/public/assets/font-awesome/css/all.min.css";
import "/public/assets/css/area.css";

import React, { useEffect, useState } from "react";
import { Table, Button, Space, Modal, Form, Input, message } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import axios from "axios";

const columns = (handleEdit, handleDelete) => [
  {
    title: "Tên khu vực",
    dataIndex: "AreaName",
    sorter: (a, b) => a.AreaName.localeCompare(b.AreaName),
  },
  {
    title: "Mô tả",
    dataIndex: "Description",
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

// const initialData = [
//   {
//     key: "1",
//     AreaName: "Khu vực A",
//     Description: "Khu vực cho 3 - 5 tuần",
//   },
//   {
//     key: "2",
//     AreaName: "Khu vực B",
//     Description: "Khu vực cho 1 - 2 tháng",
//   },
// ];

export default function AreaManagement() {
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState(null); // Dùng để theo dõi bản ghi đang chỉnh sửa
  const handleAddDataAPI = async (AreaName, Description) => {
    try {
      const response = await axios({
        method: "POST",
        url: `${process.env.NEXT_PUBLIC_API_URL}/api/v1/Areas`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiIyMmUwNzQ2Mi0wNTQ2LTQ0NGYtODBiZC1jZGJmMjI1ZjdlOTAiLCJlbWFpbCI6IkFkbWluQGdtYWlsLmNvbSIsInJvbGUiOiJBZG1pbiIsIm5iZiI6MTczMDE3MDkyMywiZXhwIjoxNzMwMTc0NTIzLCJpYXQiOjE3MzAxNzA5MjMsImlzcyI6IkJhY2tFbmQiLCJhdWQiOiJGcm9udEVuZCJ9.o_H0H4oDl4HZMXpsQIRoqyY20mDP5ChySLU1WG4dlCw`,
        },
        data: {
          name: AreaName,
          description: Description,
        },
      });
      if (response.status === 201) {
        console.log(response.data.data);
        setData([
          ...data,
          {
            key: response.data.data.id,
            AreaName: response.data.data.name,
            Description: response.data.data.description,
          },
        ]);
      }
    } catch (error) {
      console.log(error);
      message.error(error.response.data.message);
    }
  };
  const handleGetAPI = async () => {
    try {
      const response = await axios({
        method: "GET",
        url: `${process.env.NEXT_PUBLIC_API_URL}/api/v1/Areas`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiIyMmUwNzQ2Mi0wNTQ2LTQ0NGYtODBiZC1jZGJmMjI1ZjdlOTAiLCJlbWFpbCI6IkFkbWluQGdtYWlsLmNvbSIsInJvbGUiOiJBZG1pbiIsIm5iZiI6MTczMDE3MDkyMywiZXhwIjoxNzMwMTc0NTIzLCJpYXQiOjE3MzAxNzA5MjMsImlzcyI6IkJhY2tFbmQiLCJhdWQiOiJGcm9udEVuZCJ9.o_H0H4oDl4HZMXpsQIRoqyY20mDP5ChySLU1WG4dlCw`,
        },
      });
      if (response.status === 200) {
        console.log(response.data.data.items);

        setData(
          response.data.data.items.map((item) => {
            return {
              key: item.id,
              AreaName: item.name,
              Description: item.description,
            };
          })
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateAPI = async (key, AreaName, Description) => {
    try {
      const response = await axios({
        method: "PATCH",
        url: `${process.env.NEXT_PUBLIC_API_URL}/api/v1/Areas`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiIyMmUwNzQ2Mi0wNTQ2LTQ0NGYtODBiZC1jZGJmMjI1ZjdlOTAiLCJlbWFpbCI6IkFkbWluQGdtYWlsLmNvbSIsInJvbGUiOiJBZG1pbiIsIm5iZiI6MTczMDE3MDkyMywiZXhwIjoxNzMwMTc0NTIzLCJpYXQiOjE3MzAxNzA5MjMsImlzcyI6IkJhY2tFbmQiLCJhdWQiOiJGcm9udEVuZCJ9.o_H0H4oDl4HZMXpsQIRoqyY20mDP5ChySLU1WG4dlCw`,
        },
        params: {
          id: key,
        },
        data: {
          name: AreaName,
          description: Description,
        },
      });
      if (response.status === 200) {
        setData((prevData) =>
          prevData.map((item) =>
            item.key === response.data.data.id
              ? {
                  ...item,
                  AreaName: response.data.data.name,
                  Description: response.data.data.description,
                }
              : item
          )
        );
        message.success("Cập nhật khu vực thành công!");
      }
    } catch (error) {
      console.log(error);
      message.error(error.response.data.message);
    }
  };

  const handleDeleteAPI = async (key) => {
    try {
      const response = await axios({
        method: "DELETE",
        url: `${process.env.NEXT_PUBLIC_API_URL}/api/v1/Areas/${key}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiIyMmUwNzQ2Mi0wNTQ2LTQ0NGYtODBiZC1jZGJmMjI1ZjdlOTAiLCJlbWFpbCI6IkFkbWluQGdtYWlsLmNvbSIsInJvbGUiOiJBZG1pbiIsIm5iZiI6MTczMDE3MDkyMywiZXhwIjoxNzMwMTc0NTIzLCJpYXQiOjE3MzAxNzA5MjMsImlzcyI6IkJhY2tFbmQiLCJhdWQiOiJGcm9udEVuZCJ9.o_H0H4oDl4HZMXpsQIRoqyY20mDP5ChySLU1WG4dlCw`,
        },
      });
      if (response.status === 200) {
        setData(data.filter((item) => item.key !== key));

        message.success(response.data.message);
      }
    } catch (error) {
      message.error(error.response.data.message);
    }
  };

  const handleEdit = (record) => {
    setEditingKey(record.key); // Lưu lại bản ghi đang chỉnh sửa
    form.setFieldsValue({
      name: record.AreaName,
      description: record.Description,
    });
    setIsModalOpen(true);
  };

  useEffect(() => {
    handleGetAPI();
  }, []);
  const handleDelete = (key) => {
    Modal.confirm({
      title: "Bạn có chắc chắn muốn xóa khu vực này?",
      content: "Khu vực đã xóa sẽ không thể khôi phục lại.",
      okText: "Xác nhận",
      okType: "danger",
      cancelText: "Huỷ",
      onOk: () => {
        handleDeleteAPI(key);
      },
      onCancel: () => {
        console.log("Hủy xóa");
      },
    });
  };

  const handleAdd = () => {
    form.resetFields();
    setEditingKey(null); // Khi thêm mới, đặt `editingKey` là null
    setIsModalOpen(true);
  };

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        if (editingKey) {
          handleUpdateAPI(editingKey, values.name, values.description);
        } else {
          console.log(values);
          handleAddDataAPI(values.name, values.description);
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
          <h2>Quản lí khu vực chăn nuôi</h2>
        </div>
        <div className="ct_text">
          <p>
            Chào mừng bạn đến với hệ thống quản lí khu vực chăn nuôi của hệ
            thống trang trại heo số 1 thế giới
          </p>
        </div>
        <div className="ct_manage">
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={handleAdd}
            style={{ marginBottom: 16 }}
          >
            Thêm khu vực
          </Button>
          <Table
            columns={columns(handleEdit, handleDelete)}
            dataSource={data}
          />
        </div>
      </div>

      {/* Modal thêm hoặc chỉnh sửa khu vực */}
      <Modal
        title={editingKey ? "Chỉnh sửa khu vực" : "Thêm khu vực mới"}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Lưu"
        cancelText="Hủy"
      >
        <Form form={form} layout="vertical" name="form_in_modal">
          <Form.Item
            name="name"
            label="Tên khu vực"
            rules={[{ required: true, message: "Vui lòng nhập tên khu vực!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="Mô tả"
            rules={[{ required: true, message: "Vui lòng nhập mô tả!" }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
