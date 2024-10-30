"use client";

import "bootstrap/dist/css/bootstrap.min.css";
import "/public/assets/font-awesome/css/all.min.css";
import "/public/assets/css/pigintakes.css";

import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Form, Input, DatePicker, Badge } from "antd";
import moment from "moment";
import axios from "axios";
import { toast, Toaster } from "sonner";

const PigIntakes = () => {
  const [data, setData] = useState([]);
  const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);
  const [isViewDetailModalVisible, setIsViewDetailModalVisible] =
    useState(false);
  const [selectedSlipId, setSelectedSlipId] = useState(null);
  const [selectedDetails, setSelectedDetails] = useState(null);
  //   const [form] = Form.useForm();
  const [detailForm] = Form.useForm();

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
      title: "Quản lý xét duyệt",
      key: "approvedQuantity",
      render: (_, record) => {
        if (record.approvedQuantity) {
          return <Badge status="success" text="Đã xác nhận" />;
        }
        return <Badge status="Processing" text="Chưa xác nhận" />;
      },
    },

    {
      title: "Nhà cung cấp giao hàng",
      key: "addDetails",
      render: (_, record) => {
        if (record.deliveryDate) {
          return <Badge status="success" text="Nhà cung cấp đã giao hàng" />;
        }
        return (
          <Button onClick={() => showDetailModal(record.key)}>Giao hàng</Button>
        );
      },
    },
    {
      title: "Phân bổ vào chuồng",
      //   key: "addDetails",
      render: (_, record) => {
        if (record.isStock) {
          return <Badge status="success" text="Hóa đơn đã phân bổ" />;
        }
        return (
          <Button onClick={() => AllocatePigsToPens(record.key)}>
            Phân bổ
          </Button>
        );
      },
    },
    {
      title: "Xem chi tiết",
      key: "viewDetails",
      render: (_, record) => (
        <Button onClick={() => viewDetails(record)}>Xem chi tiết</Button>
      ),
    },
  ];

  const AllocatePigsToPens = async (id) => {
    try {
      const response = await axios({
        method: "POST",
        url: `${process.env.NEXT_PUBLIC_API_URL}/api/v1/PigIntakes/Allocate`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        params: {
          pigIntakeId: id,
          AreasId: "fa1e5ba1-c2b1-4ce0-8a59-2a82bc0c0a33",
        },
      });

      setData((prevData) =>
        prevData.map((item) =>
          item.key === response.data.data.id
            ? {
                ...item,
                isStock: response.data.data.stokeDate,
              }
            : item
        )
      );
      toast.success("Phân bổ heo vào chuồng thành công!");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

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
  useEffect(() => {
    handleGetData();
  }, []);

  // Function to show the detail modal for adding details to an intake slip
  const showDetailModal = (intakeSlipId) => {
    setSelectedSlipId(intakeSlipId);
    setIsDetailModalVisible(true);
  };

  const viewDetails = (record) => {
    setSelectedDetails(record);
    setIsViewDetailModalVisible(true);
  };

  const handleDetailOk = async () => {
    try {
      // Xác thực các trường
      const values = await detailForm.validateFields();
      console.log(values);

      // Gọi API để cập nhật
      const response = await axios({
        method: "PATCH",
        url: `${process.env.NEXT_PUBLIC_API_URL}/api/v1/PigIntakes`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        params: {
          id: selectedSlipId,
        },
        data: {
          receivedQuantity: values.receivedQuantity,
          acceptedQuantity: values.acceptedQuantity,
          deliveryDate: values.deliveryDate,
        },
      });
      console.log(response.data.data);
      setData((prevData) =>
        prevData.map((item) =>
          item.key === response.data.data.pigIntakeId
            ? {
                ...item,
                RemainingAmount: response.data.data.remainingAmount,
                TotalPrice: response.data.data.totalPrice,
                deliveryDate: values.deliveryDate,
              }
            : item
        )
      );
      toast.success(
        `Số tiền của hóa đơn này là: ${response.data.data.totalPrice},
        Số tiền còn lại là: ${response.data.data.remainingAmount}`
      );
      setIsDetailModalVisible(false);
      detailForm.resetFields();
    } catch (error) {
      toast.error(error.response.data.message);
      //   setIsDetailModalVisible(false);
    }
  };

  const handleCancel = () => {
    setIsDetailModalVisible(false);
    setIsViewDetailModalVisible(false);
  };

  return (
    <>
      <Toaster position="top-right" richColors closeButton />
      <div className="content">
        <div className="ct_title">
          <h2>Quản lý phiếu nhập heo</h2>
        </div>
        <div className="ct_text">
          <p>
            Chào mừng bạn đến với hệ thống quản lí phiếu nhập của hệ thống trang
            trại heo số 1 thế giới
          </p>
        </div>
        <div className="ct_manage">
          <Table columns={columns} dataSource={data} rowKey={data.key} />
        </div>

        {/* Modal Thêm Chi Tiết */}
        <Modal
          title={`Thêm chi tiết cho phiếu nhập ID: ${selectedSlipId}`}
          open={isDetailModalVisible}
          onOk={handleDetailOk}
          onCancel={handleCancel}
          okText="Xác nhận"
          cancelText="Hủy"
        >
          <Form form={detailForm} layout="vertical">
            <Form.Item
              name="deliveryDate"
              label="Ngày giao hàng"
              rules={[
                { required: true, message: "Vui lòng chọn ngày giao hàng" },
              ]}
            >
              <DatePicker showTime />
            </Form.Item>
            <Form.Item
              name="receivedQuantity"
              label="Số lượng nhận được"
              rules={[
                { required: true, message: "Vui lòng nhập số lượng nhận được" },
              ]}
            >
              <Input type="number" min={0} />
            </Form.Item>
            <Form.Item
              name="acceptedQuantity"
              label="Số lượng chấp nhận"
              rules={[
                { required: true, message: "Vui lòng nhập số lượng chấp nhận" },
              ]}
            >
              <Input type="number" min={0} />
            </Form.Item>
          </Form>
        </Modal>

        {/* Modal Xem Chi Tiết */}
        <Modal
          title={`Chi tiết phiếu nhập ID: ${selectedSlipId}`}
          open={isViewDetailModalVisible}
          onOk={handleCancel}
          onCancel={handleCancel}
          okText="Đóng"
        >
          {selectedDetails && (
            <div>
              <p>
                <strong>ID Phiếu Nhập:</strong> {selectedDetails.intakeSlipId}
              </p>
              <p>
                <strong>Ngày Nhập:</strong>{" "}
                {moment(selectedDetails.deliveryDate).format(
                  "YYYY-MM-DD HH:mm:ss"
                )}
              </p>
              <p>
                <strong>Số Lượng Dự Kiến:</strong>{" "}
                {selectedDetails.expectedQuantity}
              </p>
              <p>
                <strong>Số Lượng Nhận Được:</strong>{" "}
                {selectedDetails.receivedQuantity}
              </p>
              <p>
                <strong>Số Lượng Chấp Nhận:</strong>{" "}
                {selectedDetails.acceptedQuantity}
              </p>
              <p>
                <strong>Trạng Thái Xét Duyệt:</strong> {selectedDetails.status}
              </p>
            </div>
          )}
        </Modal>
      </div>
    </>
  );
};

export default PigIntakes;
