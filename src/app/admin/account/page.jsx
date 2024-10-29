'use client'
import Script from "next/script";
import "bootstrap/dist/css/bootstrap.min.css"
import '/public/assets/font-awesome/css/all.min.css';
import '/public/assets/css/account.css';

import React, { useState } from 'react';
import { Table, Button, Space, Modal, Form, Input } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

// Cấu hình cột cho quản lý tài khoản
const columns = (handleEdit, handleDelete) => [
    {
        title: 'Tên người dùng',
        dataIndex: 'UserName',
        sorter: (a, b) => a.UserName.localeCompare(b.UserName),
    },
    {
        title: 'Email',
        dataIndex: 'Email',
    },
    {
        title: 'Số điện thoại',
        dataIndex: 'PhoneNumber',
    },
    {
        title: 'Ngày tạo',
        dataIndex: 'CreateAt',
    },
    {
        title: 'Ngày cập nhật',
        dataIndex: 'UpdateAt',
    },
    {
        title: 'Hành động',
        render: (text, record) => (
            <Space size="middle">
                <Button
                    icon={<EditOutlined />}
                    onClick={() => handleEdit(record)}
                />
                <Button
                    icon={<DeleteOutlined />}
                    onClick={() => handleDelete(record.key)}
                />
            </Space>
        ),
    },
];

// Dữ liệu mẫu cho người dùng
const initialData = [
    {
        key: '1',
        UserName: 'admin123',
        Email: 'admin@example.com',
        PhoneNumber: '0123456789',
        CreateAt: '2024-10-19',
        UpdateAt: '2024-10-19',
    },
    {
        key: '2',
        UserName: 'farmmanager123',
        Email: 'manager@example.com',
        PhoneNumber: '0987654321',
        CreateAt: '2024-10-19',
        UpdateAt: '2024-10-19',
    },
];

// Thành phần Admin để quản lý tài khoản
export default function UserManagement() {
    const [data, setData] = useState(initialData);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();

    // Xử lý khi nhấn nút Chỉnh sửa
    const handleEdit = (record) => {
        console.log('Chỉnh sửa', record);
    };

    // Xử lý khi nhấn nút Xóa
    const handleDelete = (key) => {
        setData(data.filter(item => item.key !== key));
    };

    // Mở modal
    const showModal = () => {
        setIsModalVisible(true);
    };

    // Đóng modal
    const handleCancel = () => {
        setIsModalVisible(false);
        form.resetFields();
    };

    // Xử lý khi nhấn nút Lưu trong form
    const handleOk = () => {
        form
            .validateFields()
            .then(values => {
                const newRow = {
                    key: data.length + 1,
                    UserName: values.userName,
                    Email: values.email,
                    PhoneNumber: values.phoneNumber,
                    CreateAt: new Date().toISOString().slice(0, 10),
                    UpdateAt: new Date().toISOString().slice(0, 10),
                };
                setData([...data, newRow]);
                handleCancel(); // Đóng modal và reset form
            })
            .catch(info => {
                console.log('Validate Failed:', info);
            });
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
                    <h2>Quản lí tài khoản</h2>
                </div>
                <div className="ct_manage">
                    <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        onClick={showModal}
                        style={{ marginBottom: 16 }}
                    >
                        Thêm tài khoản
                    </Button>
                    <Table
                        columns={columns(handleEdit, handleDelete)}
                        dataSource={data}
                    />
                </div>
            </div>

            {/* Modal Form */}
            <Modal
                title="Thêm Tài Khoản"
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                okText="Lưu"
                cancelText="Hủy"
            >
                <Form
                    form={form}
                    layout="vertical"
                >
                    <Form.Item
                        label="Tên người dùng"
                        name="userName"
                        rules={[{ required: true, message: 'Vui lòng nhập tên người dùng!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[{ required: true, message: 'Vui lòng nhập email!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Số điện thoại"
                        name="phoneNumber"
                        rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]}
                    >
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
}
