"use client";
import Script from "next/script";
import "bootstrap/dist/css/bootstrap.min.css";
import "/public/assets/font-awesome/css/all.min.css";
import "/public/assets/css/stable.css";

import React, { useEffect, useState } from "react";
import {
  Table,
  Button,
  Space,
  Modal,
  Form,
  Input,
  Select,
  message,
} from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import axios from "axios";

const columns = (handleEdit, handleDelete) => [
  {
    title: "Tên chuồng",
    dataIndex: "StableName",
    sorter: (a, b) => a.StableName.localeCompare(b.StableName),
  },
  {
    title: "Sức chứa",
    dataIndex: "Capacity",
    sorter: (a, b) => a.Capacity - b.Capacity,
  },
  {
    title: "Sức chứa hiện tại",
    dataIndex: "CurrentOccupancy",
    sorter: (a, b) => a.CurrentOccupancy - b.CurrentOccupancy,
  },
  {
    title: "Tên Khu vực",
    dataIndex: "AreaID",
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
export default function Admin() {
  const [data, setData] = useState([]);
  const [areas, setAreas] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingRecord, setEditingRecord] = useState(null); // Thêm biến lưu bản ghi đang chỉnh sửa

  useEffect(() => {
    fetchAreas();
  }, []);

  const fetchAreas = async () => {
    try {
      const response = await axios({
        url: `${process.env.NEXT_PUBLIC_API_URL}/api/v1/Areas`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiIyMmUwNzQ2Mi0wNTQ2LTQ0NGYtODBiZC1jZGJmMjI1ZjdlOTAiLCJlbWFpbCI6IkFkbWluQGdtYWlsLmNvbSIsInJvbGUiOiJBZG1pbiIsIm5iZiI6MTczMDE3NTEwNCwiZXhwIjoxNzMwMTc4NzA0LCJpYXQiOjE3MzAxNzUxMDQsImlzcyI6IkJhY2tFbmQiLCJhdWQiOiJGcm9udEVuZCJ9.dzoyrnSLYmIGztvGPKNUjNq3KOfrBiYSnAKM0MQRutY`,
        },
      });
      console.log(response);
      setAreas(
        response.data.data.items.map((item) => {
          return {
            value: item.id,
            label: item.name,
          };
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (record) => {
    setEditingRecord(record); // Lưu bản ghi hiện tại vào trạng thái
    form.setFieldsValue({
      name: record.StableName,
      capacity: record.Capacity,
      currentOccupancy: record.CurrentOccupancy,
      areaId: record.AreaID,
    });
    setIsModalVisible(true); // Mở modal
  };

  const handleDelete = (key) => {
    Modal.confirm({
      title: "Bạn có chắc chắn muốn xóa chuồng này?",
      content: "Chuồng đã xóa sẽ không thể khôi phục lại.",
      okText: "Xác nhận",
      okType: "danger",
      cancelText: "Huỷ",
      onOk: () => {
        setData(data.filter((item) => item.key !== key));
      },
      onCancel: () => {
        console.log("Hủy xóa");
      },
    });
  };

  const showModal = () => {
    setEditingRecord(null); // Đặt null khi mở modal để thêm mới
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
    setEditingRecord(null); // Reset bản ghi đang chỉnh sửa
  };

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        if (editingRecord) {
          // Chỉnh sửa bản ghi
          const updatedData = data.map((item) =>
            item.key === editingRecord.key
              ? { ...item, ...values, AreaID: values.areaId }
              : item
          );
          setData(updatedData);

          // Hiển thị thông báo "Lưu thành công"
          message.success("Lưu chuồng thành công!");
        } else {
          // Thêm bản ghi mới
          const newRow = {
            key: data.length + 1,
            StableName: values.name,
            Capacity: values.capacity,
            CurrentOccupancy: values.currentOccupancy,
            AreaID: values.areaId,
          };
          setData([...data, newRow]);

          // Hiển thị thông báo "Thêm thành công"
          message.success("Thêm chuồng thành công!");
        }
        handleCancel(); // Đóng modal và reset form
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };
  const handleChangeArea = async (value) => {
    try {
      const response = await axios({
        method: "GET",
        url: `${process.env.NEXT_PUBLIC_API_URL}/api/v1/Stables`,

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiIyMmUwNzQ2Mi0wNTQ2LTQ0NGYtODBiZC1jZGJmMjI1ZjdlOTAiLCJlbWFpbCI6IkFkbWluQGdtYWlsLmNvbSIsInJvbGUiOiJBZG1pbiIsIm5iZiI6MTczMDE3NTEwNCwiZXhwIjoxNzMwMTc4NzA0LCJpYXQiOjE3MzAxNzUxMDQsImlzcyI6IkJhY2tFbmQiLCJhdWQiOiJGcm9udEVuZCJ9.dzoyrnSLYmIGztvGPKNUjNq3KOfrBiYSnAKM0MQRutY`,
        },
        params: {
          areaId: value,
        },
      });
      if (response.status === 200) {
        setData(
          response.data.data.items.map((item) => {
            return {
              key: item.id,
              StableName: item.name,
              Capacity: item.capacity,
              CurrentOccupancy: item.currentOccupancy,
              AreaID: item.areaName,
            };
          })
        );
      }
    } catch (error) {
      message.warning(error.response.data.message);
    }
  };
  return (
    <>
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
          <h2>Quản lí chuồng</h2>
        </div>
        <div className="ct_text">
          <p>
            Chào mừng bạn đến với hệ thống quản lí chuồng của hệ thống trang
            trại heo số 1 thế giới
          </p>
        </div>
        <div className="ct_manage flex justify-between w-full">
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={showModal}
            style={{ marginBottom: 16, marginRight: 16 }}
          >
            Thêm chuồng
          </Button>

          <Select
            placeholder="Khu vực"
            className="w-32"
            size="large"
            options={areas}
            onChange={handleChangeArea}
          />
        </div>

        <Table columns={columns(handleEdit, handleDelete)} dataSource={data} />
      </div>

      <Modal
        title={editingRecord ? "Chỉnh sửa Chuồng" : "Thêm Chuồng"}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Lưu"
        cancelText="Hủy"
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="Tên chuồng"
            name="name"
            rules={[{ required: true, message: "Vui lòng nhập tên chuồng!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Sức chứa tối đa"
            name="capacity"
            rules={[{ required: true, message: "Vui lòng nhập sức chứa!" }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            label="Sức chứa hiện tại"
            name="currentOccupancy"
            rules={[
              { required: true, message: "Vui lòng nhập sức chứa hiện tại!" },
            ]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            label="Khu vực"
            name="areaId"
            rules={[{ required: true, message: "Vui lòng chọn khu vực!" }]}
          >
            <Select options={areas} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
