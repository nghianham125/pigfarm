'use client'

import Script from "next/script";
import "bootstrap/dist/css/bootstrap.min.css";
import '/public/assets/font-awesome/css/all.min.css';
import '/public/assets/css/pigintakes.css';

import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form, Input, DatePicker } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import moment from 'moment';
import axios from "axios";

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
            title: 'Thêm chi tiết',
            key: 'addDetails',
            render: (_, record) => (
                <Button onClick={() => showDetailModal(record.intakeSlipId)}>
                    Thêm chi tiết
                </Button>
            ),
        },
    ];


    // Function to show the detail modal for adding details to an intake slip
    const showDetailModal = (intakeSlipId) => {
        setSelectedSlipId(intakeSlipId);
        setIsDetailModalVisible(true);
    };

    const handleOk = () => {
        form.validateFields().then(values => {
            const newRecord = {
                intakeSlipId: data.length + 1,
                deliveryDate: values.deliveryDate.toISOString(),
                expectedQuantity: values.expectedQuantity || 0,
                receivedQuantity: values.receivedQuantity || 0,
                acceptedQuantity: values.acceptedQuantity || 0,
                status: 'Chưa xét duyệt',
            };
            setData([...data, newRecord]);
            setIsModalVisible(false);
            form.resetFields();
        }).catch(info => {
            console.log('Xác nhận thất bại:', info);
        });
    };

    const handleDetailOk = () => {
        detailForm.validateFields().then(values => {
            // Handle additional details for the selected intake slip here
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
                    <h2>Quản lý phiếu nhập heo</h2>
                </div>
                <div className="ct_text">
                    <p>Chào mừng bạn đến với hệ thống quản lí phiếu nhập của hệ thống trang trại heo số 1 thế giới</p>
                </div>
                <div className="ct_manage">
                    <Table
                        columns={columns}
                        dataSource={data}
                        rowKey="intakeSlipId"
                    />
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
                            rules={[{ required: true, message: 'Vui lòng chọn ngày giao hàng' }]}
                        >
                            <DatePicker showTime />
                        </Form.Item>
                        <Form.Item
                            name="expectedQuantity"
                            label="Số lượng dự kiến"
                            rules={[{ required: true, message: 'Vui lòng nhập số lượng dự kiến' }]}
                        >
                            <Input type="number" min={0} />
                        </Form.Item>
                        <Form.Item
                            name="receivedQuantity"
                            label="Số lượng nhận được"
                            rules={[{ required: true, message: 'Vui lòng nhập số lượng nhận được' }]}
                        >
                            <Input type="number" min={0} />
                        </Form.Item>
                        <Form.Item
                            name="acceptedQuantity"
                            label="Số lượng chấp nhận"
                            rules={[{ required: true, message: 'Vui lòng nhập số lượng chấp nhận' }]}
                        >
                            <Input type="number" min={0} />
                        </Form.Item>
                        <Form.Item
                            name="approvalStatus"
                            label="Trạng thái xét duyệt"
                            rules={[{ required: true, message: 'Vui lòng chọn trạng thái xét duyệt' }]}
                        >
                            <Input.TextArea rows={2} />
                        </Form.Item>
                        <Form.Item
                            name="unitPrice"
                            label="Đơn giá"
                            rules={[{ required: true, message: 'Vui lòng nhập đơn giá' }]}
                        >
                            <Input type="number" min={0} />
                        </Form.Item>
                        <Form.Item
                            name="depositAmount"
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