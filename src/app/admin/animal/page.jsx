"use client";
import Script from "next/script";
import "bootstrap/dist/css/bootstrap.min.css";
import "/public/assets/font-awesome/css/all.min.css";
import "/public/assets/css/animal.css";

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

// Cấu hình cột
const columns = (handleEdit, handleDelete) => [
  {
    title: "ID Vật nuôi",
    dataIndex: "Id",
    sorter: (a, b) => a.Id.localeCompare(b.Id),
  },
  {
    title: "Ngày nhập",
    dataIndex: "DateOfAcquisition",
    sorter: (a, b) =>
      new Date(a.DateOfAcquisition) - new Date(b.DateOfAcquisition),
  },
  {
    title: "ID Khu vực",
    dataIndex: "AreaId",
  },
  {
    title: "Ngày tạo",
    dataIndex: "CreateAt",
    sorter: (a, b) => new Date(a.CreateAt) - new Date(b.CreateAt),
  },
  {
    title: "Ngày cập nhật",
    dataIndex: "UpdateAt",
  },
  {
    title: "Người tạo",
    dataIndex: "CreateBy",
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

// Dữ liệu mẫu
const initialData = [
  {
    key: "1",
    Id: "AN001",
    DateOfAcquisition: "2024-01-15T10:00:00",
    AreaId: "A",
    CreateAt: "2024-01-10T09:00:00",
    UpdateAt: null,
    CreateBy: "admin",
  },
  {
    key: "2",
    Id: "AN002",
    DateOfAcquisition: "2024-02-20T11:00:00",
    AreaId: "B",
    CreateAt: "2024-02-15T08:30:00",
    UpdateAt: null,
    CreateBy: "admin",
  },
  // Thêm nhiều dòng nếu cần
];

// Thành phần Admin
export default function AnimalManagement() {
  const [data, setData] = useState(initialData);
  const [areas, setAreas] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  const getAreas = async () => {
    try {
      const response = await axios({
        method: "GET",
        url: `${process.env.NEXT_PUBLIC_API_URL}/api/v1/Areas`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      console.log(response.data.data.items);
      setAreas(
        response.data.data.items.map((item) => ({
          id: item.id,
          name: item.name,
        }))
      );
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAreas();
  }, []);

  const firstArea = areas[2];

  // Xử lý khi nhấn nút Chỉnh sửa
  const handleEdit = (record) => {
    console.log("Chỉnh sửa", record);
    // Thêm logic chỉnh sửa ở đây (ví dụ: mở form modal để chỉnh sửa)
  };

  // Xử lý khi nhấn nút Xóa
  const handleDelete = (key) => {
    Modal.confirm({
      title: "Bạn có chắc chắn muốn xóa vật nuôi này?",
      content: "Vật nuôi đã xóa sẽ không thể khôi phục lại.",
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

  // Hiển thị Modal khi nhấn "Tạo phiếu nhập"
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCallAPIAdd = async (values) => {
    try {
      const response = await axios({
        method: "POST",
        url: `${process.env.NEXT_PUBLIC_API_URL}/api/v1/PigIntakes`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        data: {
          expectedQuantity: values.quantity,
          areasId: firstArea.id,
        },
      });
      console.log(response);
    } catch (error) {
      message.error(error.response.data.message);
    }
  };

  // Xử lý khi đóng Modal và tạo hóa đơn nhập mới
  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        // const newPigIntake = {
        //   deliveryDate: new Date().toISOString(),
        //   expectedQuantity: values.quantity || 0,
        //   receivedQuantity: 0,
        //   acceptedQuantity: 0,
        // };
        handleCallAPIAdd(values);

        // handleAdd(); // Thêm vật nuôi mới vào bảng
        setIsModalVisible(false); // Đóng Modal
      })
      .catch((info) => {
        console.log("Xác nhận thất bại:", info);
      });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
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
          <h2>Quản lí vật nuôi</h2>
        </div>
        <div className="ct_text">
          <p>
            Chào mừng bạn đến với hệ thống quản lí vật nuôi của hệ thống trang
            trại heo số 1 thế giới
          </p>
        </div>
        <div className="ct_manage">
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={showModal}
            style={{ marginBottom: 16 }}
          >
            Tạo phiếu nhập
          </Button>
          <Table
            columns={columns(handleEdit, handleDelete)}
            dataSource={data}
          />
        </div>

        {/* Modal Tạo Phiếu Nhập */}
        <Modal
          title="Tạo phiếu nhập"
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          okText="Xác nhận"
          cancelText="Hủy"
        >
          <Form form={form} layout="vertical">
            <Form.Item
              name="quantity"
              label="Số lượng vật nuôi"
              rules={[
                { required: true, message: "Vui lòng nhập số lượng vật nuôi" },
              ]}
            >
              <Input type="number" min={1} />
            </Form.Item>
            <Form.Item name="area" label="Khu vực" initialValue={firstArea?.id}>
              <Select>
                {areas.map((area) => (
                  <Select.Option key={area.id} value={area.id}>
                    {area.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </>
  );
}
