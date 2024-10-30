"use client";
import { Suspense, useEffect, useState } from "react";
// import dynamic from "next/dynamic";
import styles from "./styles.module.css";
import {
  Table,
  Button,
  Space,
  Modal,
  Form,
  Input,
  Select,
  DatePicker,
  List,
  Card,
} from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import axios from "axios";
import moment from "moment";
import { toast, Toaster } from "sonner";

// Columns configuration
const columns = (handleEdit, handleDelete, handleViewDetails) => [
  {
    title: "Mã phiếu",
    dataIndex: "id",
    sorter: (a, b) => a.id.localeCompare(b.id),
  },
  {
    title: "Tên vắc xin",
    dataIndex: "vaccineName",
  },
  {
    title: "Ngày tiêm",
    dataIndex: "injectionDate",
    render: (text) => moment(text).format("DD/MM/YYYY"),
  },
  {
    title: "Số lượng heo",
    dataIndex: "quantity",
  },
  {
    title: "Khu vực",
    dataIndex: "areaName",
  },
  {
    title: "Ghi chú",
    dataIndex: "note",
  },
  {
    title: "Hành động",
    key: "action",
    render: (_, record) => (
      <Space size="middle">
        <Button
          key="view"
          type="primary"
          onClick={() => handleViewDetails(record)}
        >
          Xem chi tiết
        </Button>
        <Button
          key="edit"
          icon={<EditOutlined />}
          onClick={() => handleEdit(record)}
        />
        <Button
          key="delete"
          icon={<DeleteOutlined />}
          onClick={() => handleDelete(record.id)}
        />
      </Space>
    ),
  },
];

export default function HealthRecord() {
  const [data, setData] = useState([]);
  const [areas, setAreas] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingRecord, setEditingRecord] = useState(null);
  const [detailsModalVisible, setDetailsModalVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [pigsList, setPigsList] = useState([]);

  // API calls remain the same...
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
      setAreas(
        response.data.data.items.map((item) => ({
          value: item.id,
          label: item.name,
        }))
      );
    } catch (error) {
      console.log(error);
      toast.error("Lỗi khi tải danh sách khu vực");
    }
  };

  const getHealthRecords = async () => {
    try {
      const response = await axios({
        method: "GET",
        url: `${process.env.NEXT_PUBLIC_API_URL}/api/v1/HealthRecords`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      setData(response.data.data.items);
    } catch (error) {
      console.log(error);
      toast.error("Lỗi khi tải danh sách phiếu chích ngừa");
    }
  };

  useEffect(() => {
    getAreas();
    getHealthRecords();
  }, []);

  // CRUD operations remain the same...

  // Add these CRUD operation handlers
  const handleAdd = () => {
    setEditingRecord(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEdit = (record) => {
    setEditingRecord(record);
    form.setFieldsValue({
      ...record,
      injectionDate: moment(record.injectionDate),
      areaId: record.areaId,
    });
    setIsModalVisible(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios({
        method: "DELETE",
        url: `${process.env.NEXT_PUBLIC_API_URL}/api/v1/HealthRecords/${id}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      toast.success("Xóa phiếu chích ngừa thành công");
      getHealthRecords();
    } catch (error) {
      console.log(error);
      toast.error("Lỗi khi xóa phiếu chích ngừa");
    }
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      const formData = {
        ...values,
        injectionDate: values.injectionDate.format("YYYY-MM-DD"),
      };

      if (editingRecord) {
        await axios({
          method: "PUT",
          url: `${process.env.NEXT_PUBLIC_API_URL}/api/v1/HealthRecords/${editingRecord.id}`,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
          data: formData,
        });
        toast.success("Cập nhật phiếu chích ngừa thành công");
      } else {
        await axios({
          method: "POST",
          url: `${process.env.NEXT_PUBLIC_API_URL}/api/v1/HealthRecords`,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
          data: formData,
        });
        toast.success("Thêm phiếu chích ngừa thành công");
      }

      setIsModalVisible(false);
      form.resetFields();
      getHealthRecords();
    } catch (error) {
      console.log(error);
      toast.error("Lỗi khi lưu phiếu chích ngừa");
    }
  };

  // Add this new function to fetch pigs for a health record
  const getPigsForHealthRecord = async (recordId) => {
    try {
      const response = await axios({
        method: "GET",
        url: `${process.env.NEXT_PUBLIC_API_URL}/api/v1/HealthRecords/${recordId}/pigs`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      setPigsList(response.data.data.items);
    } catch (error) {
      console.log(error);
      toast.error("Lỗi khi tải danh sách heo");
    }
  };

  // Add handler for viewing details
  const handleViewDetails = (record) => {
    setSelectedRecord(record);
    getPigsForHealthRecord(record.id);
    setDetailsModalVisible(true);
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className={styles.container}>
        <Toaster position="top-right" richColors closeButton />

        <div className={styles.header}>
          <h2 className={styles.title}>Quản lý phiếu chích ngừa</h2>
          <p className={styles.description}>
            Chào mừng bạn đến với hệ thống quản lý phiếu chích ngừa của trang
            trại
          </p>
        </div>

        <div className={styles.content}>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={handleAdd}
            style={{ marginBottom: 16 }}
          >
            Thêm phiếu chích ngừa
          </Button>
          <Table
            columns={columns(handleEdit, handleDelete, handleViewDetails)}
            dataSource={data}
            rowKey="id"
          />
        </div>

        <Modal
          title="Chi tiết phiếu chích ngừa"
          open={detailsModalVisible}
          onCancel={() => setDetailsModalVisible(false)}
          footer={null}
          width={800}
        >
          {selectedRecord && (
            <div>
              <Card style={{ marginBottom: 16 }}>
                <h3>Thông tin chích ngừa</h3>
                <p>
                  <strong>Mã phiếu:</strong> {selectedRecord.id}
                </p>
                <p>
                  <strong>Tên vắc xin:</strong> {selectedRecord.vaccineName}
                </p>
                <p>
                  <strong>Ngày tiêm:</strong>{" "}
                  {moment(selectedRecord.injectionDate).format("DD/MM/YYYY")}
                </p>
                <p>
                  <strong>Khu vực:</strong> {selectedRecord.areaName}
                </p>
                <p>
                  <strong>Ghi chú:</strong> {selectedRecord.note}
                </p>
              </Card>

              <h3>Danh sách heo được chích ngừa</h3>
              <List
                dataSource={pigsList}
                renderItem={(pig) => (
                  <List.Item>
                    <Card style={{ width: "100%" }}>
                      <p>
                        <strong>Mã heo:</strong> {pig.id}
                      </p>
                      <p>
                        <strong>Giống:</strong> {pig.breed}
                      </p>
                      <p>
                        <strong>Cân nặng:</strong> {pig.weight} kg
                      </p>
                      <p>
                        <strong>Tình trạng:</strong> {pig.status}
                      </p>
                    </Card>
                  </List.Item>
                )}
              />
            </div>
          )}
        </Modal>

        <Modal
          title={
            editingRecord
              ? "Chỉnh sửa phiếu chích ngừa"
              : "Thêm phiếu chích ngừa"
          }
          open={isModalVisible}
          onOk={handleOk}
          onCancel={() => setIsModalVisible(false)}
          okText="Xác nhận"
          cancelText="Hủy"
        >
          <Form form={form} layout="vertical">
            <Form.Item
              name="vaccineName"
              label="Tên vắc xin"
              rules={[
                { required: true, message: "Vui lòng nhập tên vắc xin!" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="injectionDate"
              label="Ngày tiêm"
              rules={[{ required: true, message: "Vui lòng chọn ngày tiêm!" }]}
            >
              <DatePicker style={{ width: "100%" }} format="DD/MM/YYYY" />
            </Form.Item>
            <Form.Item
              name="quantity"
              label="Số lượng heo"
              rules={[
                { required: true, message: "Vui lòng nhập số lượng heo!" },
              ]}
            >
              <Input type="number" min={1} />
            </Form.Item>
            <Form.Item
              name="areaId"
              label="Khu vực"
              rules={[{ required: true, message: "Vui lòng chọn khu vực!" }]}
            >
              <Select options={areas} />
            </Form.Item>
            <Form.Item name="note" label="Ghi chú">
              <Input.TextArea />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </Suspense>
  );
}
