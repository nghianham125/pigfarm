"use client";

import "bootstrap/dist/css/bootstrap.min.css";
import "/public/assets/font-awesome/css/all.min.css";
import "/public/assets/css/acpigintakes.css";

import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Form, Input, Select, Badge } from "antd";
import moment from "moment";
import axios from "axios";
import { toast, Toaster } from "sonner";

// Dữ liệu mẫu ban đầu
const PigIntakes = () => {
  const [data, setData] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);
  const [selectedSlipId, setSelectedSlipId] = useState(null);
  const [detailForm] = Form.useForm();
  const handleGetData = async () => {
    try {
      const response = await axios({
        method: "GET",
        url: `${process.env.NEXT_PUBLIC_API_URL}/api/v1/PigIntakes`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      console.log(response.data.data.items);
      setData(
        response.data.data.items.map((item) => ({
          key: item.id,
          deliveryDate: item.deliveryDate ? item.deliveryDate : null,
          isStock: item.stokeDate ? item.stokeDate : null,
          expectedQuantity: item.expectedQuantity,
          approvedQuantity: item.approvedTime ? item.approvedTime : null,
          CreateAt: moment(item.CreateAt).format("DD/MM/YYYY"),
          suppliersName: item.suppliersName
            ? item.suppliersName
            : "Chưa chọn nhà cung cấp",
        }))
      );
    } catch (error) {
      console.log(error);
    }
  };
  const getAPISuppliers = async () => {
    try {
      const response = await axios({
        method: "GET",
        url: `${process.env.NEXT_PUBLIC_API_URL}/api/v1/Suppliers`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      console.log(response.data.data.items);
      setSuppliers(
        response.data.data.items.map((item) => ({
          key: item.id,
          suppliersName: item.name,
        }))
      );
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    handleGetData();
    getAPISuppliers();
  }, []);

  const columns = [
    {
      title: "Nhà cung cấp",
      dataIndex: "suppliersName",
    },
    {
      title: "Ngày tạo",
      dataIndex: "CreateAt",
      //   render: (text) => moment(text).format("YYYY-MM-DD HH:mm:ss"),
    },

    {
      title: "Số lượng dự kiến",
      dataIndex: "expectedQuantity",
    },
    {
      title: "Xét duyệt",
      key: "approvedQuantity",
      render: (_, record) => {
        if (record.approvedQuantity) {
          return <Badge status="success" text="Đã xét duyệt" />;
        }
        return (
          <Button onClick={() => showDetailModal(record.key)}>Xét duyệt</Button>
        );
      },
    },
  ];

  // Function to show the detail modal for approving an intake slip
  const showDetailModal = (intakeSlipId) => {
    setSelectedSlipId(intakeSlipId);
    setIsDetailModalVisible(true);
  };

  const handleDetailOk = async () => {
    try {
      // Validate the form fields
      const values = await detailForm.validateFields();

      // Handle approval details for the selected intake slip here
      console.log("Approval Details: ", values);

      // Make the API call to accept the pig intake
      const response = await axios({
        method: "PATCH",
        url: `${process.env.NEXT_PUBLIC_API_URL}/api/v1/PigIntakes/Accept`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        params: {
          id: selectedSlipId,
        },
        data: {
          suppliersId: values.suppliersId,
          unitPrice: values.unitPrice,
          deposit: values.deposit,
        },
      });

      console.log(response.data.data);
      setData((prevData) =>
        prevData.map((item) =>
          item.key === response.data.data.id
            ? {
                ...item,
                suppliersName: response.data.data.suppliersName,
                expectedQuantity: response.data.data.expectedQuantity,
                approvedQuantity: response.data.data.approvedTime,
              }
            : item
        )
      );

      // Show a success message (optional)
      toast.success("Phê duyệt phiếu nhập thành công!");

      // Close the modal and reset form fields
      setIsDetailModalVisible(false);
      detailForm.resetFields();
    } catch (error) {
      // Handle error and show an error message
      console.error("Error:", error);

      toast.error(error.response.data.message);
    }
  };

  const handleCancel = () => {
    setIsDetailModalVisible(false);
  };

  return (
    <>
      <Toaster position="top-right" richColors closeButton />
      <div className="content">
        <div className="ct_title">
          <h2>Xét duyệt phiếu nhập heo</h2>
        </div>
        <div className="ct_text">
          <p>
            Chào mừng bạn đến với hệ thống quản lí xét duyệt phiếu nhập của hệ
            thống trang trại heo số 1 thế giới
          </p>
        </div>
        <div className="ct_manage">
          <Table columns={columns} dataSource={data} rowKey="intakeSlipId" />
        </div>

        {/* Modal Xét Duyệt */}
        <Modal
          title={`Xét duyệt cho phiếu nhập ID: ${selectedSlipId}`}
          open={isDetailModalVisible}
          onOk={handleDetailOk}
          onCancel={handleCancel}
          okText="Xác nhận"
          cancelText="Hủy"
        >
          <Form form={detailForm} layout="vertical">
            <Form.Item
              name="suppliersId"
              label="Nhà cung cấp"
              rules={[
                { required: true, message: "Vui lòng chọn nhà cung cấp" },
              ]}
            >
              <Select placeholder="Chọn nhà cung cấp">
                {suppliers.map((supplier) => (
                  <Select.Option key={supplier.key} value={supplier.key}>
                    {supplier.suppliersName}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              name="unitPrice"
              label="Đơn giá"
              rules={[{ required: true, message: "Vui lòng nhập đơn giá" }]}
            >
              <Input type="number" min={0} />
            </Form.Item>
            <Form.Item
              name="deposit"
              label="Tiền cọc"
              rules={[{ required: true, message: "Vui lòng nhập tiền cọc" }]}
            >
              <Input type="number" min={0} />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </>
  );
};

export default PigIntakes;
