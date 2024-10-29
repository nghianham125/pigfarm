'use client'

import Script from "next/script";
import "bootstrap/dist/css/bootstrap.min.css";
import '/public/assets/font-awesome/css/all.min.css';
import '/public/assets/css/acpigintakes.css';

import React, { useState } from 'react';
import { Table, Button, Modal, Form, Input, DatePicker, Select } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import moment from 'moment';

// Dữ liệu mẫu ban đầu
const initialData = [
    {
        intakeSlipId: '1',
        deliveryDate: '2024-10-27T07:54:05.680Z',
        expectedQuantity: 0,
        receivedQuantity: 0,
        acceptedQuantity: 0,
        status: 'Chưa xét duyệt',
    },
    // Add additional records if needed
];

const PigIntakes = () => {
    const [data, setData] = useState(initialData);
    const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);
    const [selectedSlipId, setSelectedSlipId] = useState(null);
    const [form] = Form.useForm();
    const [detailForm] = Form.useForm();

    const columns = [
        {
            title: 'ID Phiếu Nhập',
            dataIndex: 'intakeSlipId',
            key: 'intakeSlipId',
        },
        {
            title: 'Ngày nhập',
            dataIndex: 'deliveryDate',
            render: (text) => moment(text).format('YYYY-MM-DD HH:mm:ss'),
        },
        {
            title: 'Trạng thái xét duyệt',
            dataIndex: 'status',
            render: (status) => status || 'Chưa xét duyệt',
        },
        {
            title: 'Xét duyệt',
            key: 'approve',
            render: (_, record) => (
                <Button onClick={() => showDetailModal(record.intakeSlipId)}>
                    Xét duyệt
                </Button>
            ),
        },
    ];

    // Function to show the detail modal for approving an intake slip
    const showDetailModal = (intakeSlipId) => {
        setSelectedSlipId(intakeSlipId);
        setIsDetailModalVisible(true);
    };

    const handleDetailOk = () => {
        detailForm.validateFields().then(values => {
            // Handle approval details for the selected intake slip here
            console.log("Approval Details: ", values);
            setIsDetailModalVisible(false);
            detailForm.resetFields();
        }).catch(info => {
            console.log('Xác nhận thất bại:', info);
        });
    };

    const handleCancel = () => {
        setIsDetailModalVisible(false);
    };

    return (
        <>
            <div className="content">
                <div className="ct_title">
                    <h2>Xét duyệt phiếu nhập heo</h2>
                </div>
                <div className="ct_text">
                    <p>Chào mừng bạn đến với hệ thống quản lí xét duyệt phiếu nhập của hệ thống trang trại heo số 1 thế giới</p>
                </div>
                <div className="ct_manage">
                    <Table
                        columns={columns}
                        dataSource={data}
                        rowKey="intakeSlipId"
                    />
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
                            rules={[{ required: true, message: 'Vui lòng chọn nhà cung cấp' }]}
                        >
                            <Select placeholder="Chọn nhà cung cấp">
                                {/* Replace these options with real supplier data */}
                                <Select.Option value="supplier1">Nhà cung cấp 1</Select.Option>
                                <Select.Option value="supplier2">Nhà cung cấp 2</Select.Option>
                                <Select.Option value="supplier3">Nhà cung cấp 3</Select.Option>
                            </Select>
                        </Form.Item>
                        <Form.Item
                            name="unitPrice"
                            label="Đơn giá"
                            rules={[{ required: true, message: 'Vui lòng nhập đơn giá' }]}
                        >
                            <Input type="number" min={0} />
                        </Form.Item>
                        <Form.Item
                            name="deposit"
                            label="Tiền cọc"
                            rules={[{ required: true, message: 'Vui lòng nhập tiền cọc' }]}
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
