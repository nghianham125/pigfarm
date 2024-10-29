'use client'
import Script from "next/script";
import "bootstrap/dist/css/bootstrap.min.css"
import '/public/assets/font-awesome/css/all.min.css';
import '/public/assets/css/role.css';

import React, { useState } from 'react';
import { Table, Button, Space, Modal, Form, Input, message } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

// Cấu hình cột cho quản lý vai trò
const columns = (handleEdit, handleDelete) => [
    {
        title: 'Tên vai trò',
        dataIndex: 'RoleName',
        sorter: (a, b) => a.RoleName.localeCompare(b.RoleName),
    },
    {
        title: 'Mô tả',
        dataIndex: 'Description',
    },
    {
        title: 'Ngày tạo',
        dataIndex: 'CreatedAt',
    },
    {
        title: 'Ngày cập nhật',
        dataIndex: 'UpdatedAt',
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

// Dữ liệu mẫu cho vai trò
const initialData = [
    {
        key: '1',
        RoleName: 'Admin',
        Description: 'Quản lý toàn bộ hệ thống - tạo ra người dùng.',
        CreatedAt: '2024-10-19',
        UpdatedAt: '2024-10-19',
    },
    {
        key: '2',
        RoleName: 'FarmManager',
        Description: 'Quản lý chuồng, vật nuôi, thức ăn, sức khỏe.',
        CreatedAt: '2024-10-19',
        UpdatedAt: '2024-10-19',
    },
    {
        key: '3',
        RoleName: 'Veterinarian',
        Description: 'Quản lý sức khỏe vật nuôi, thuốc, vacxin.',
        CreatedAt: '2024-10-19',
        UpdatedAt: '2024-10-19',
    },
    {
        key: '4',
        RoleName: 'FeedInventory',
        Description: 'Quản lý kho thức ăn, nhập xuất kho.',
        CreatedAt: '2024-10-19',
        UpdatedAt: '2024-10-19',
    },
];

// Thành phần Admin để quản lý vai trò
export default function RoleManagement() {
    const [data, setData] = useState(initialData);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();

    // Xử lý khi nhấn nút Chỉnh sửa
    const handleEdit = (record) => {
        console.log('Chỉnh sửa', record);
    };

    // Xử lý khi nhấn nút Xóa
    const handleDelete = (key) => {
        Modal.confirm({
            title: 'Bạn có chắc chắn muốn xóa vai trò này?',
            content: 'Vai trò đã xóa sẽ không thể khôi phục lại.',
            okText: 'Xác nhận',
            okType: 'danger',
            cancelText: 'Huỷ',
            onOk: () => {
                setData(data.filter(item => item.key !== key));
            },
            onCancel: () => {
                console.log('Hủy xóa');
            },
        });
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
                    RoleName: values.roleName,
                    Description: values.description,
                    CreatedAt: new Date().toISOString().slice(0, 10),
                    UpdatedAt: new Date().toISOString().slice(0, 10),
                };
                setData([...data, newRow]);
                // Hiển thị thông báo "Thêm thành công"
                message.success('Thêm vai trò thành công!');
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
                    <h2>Quản lí vai trò</h2>
                </div>
                <div className="ct_manage">
                    <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        onClick={showModal}
                        style={{ marginBottom: 16 }}
                    >
                        Thêm vai trò
                    </Button>
                    <Table
                        columns={columns(handleEdit, handleDelete)}
                        dataSource={data}
                    />
                </div>
            </div>

            {/* Modal Form */}
            <Modal
                title="Thêm Vai Trò"
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
                        label="Tên vai trò"
                        name="roleName"
                        rules={[{ required: true, message: 'Vui lòng nhập tên vai trò!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Mô tả"
                        name="description"
                        rules={[{ required: true, message: 'Vui lòng nhập mô tả!' }]}
                    >
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
}
