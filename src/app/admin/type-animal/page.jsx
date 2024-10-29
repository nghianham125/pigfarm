'use client'
import Script from "next/script";
import "bootstrap/dist/css/bootstrap.min.css";
import '/public/assets/font-awesome/css/all.min.css';
import '/public/assets/css/type-animal.css';

import React, { useState } from 'react';
import { Table, Button, Space, Modal, Form, Input, message } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

// Columns for Animal Types management table
const columns = (handleEdit, handleDelete) => [
    {
        title: 'Tên loại vật nuôi',
        dataIndex: 'AnimalTypeName',
        sorter: (a, b) => a.AnimalTypeName.localeCompare(b.AnimalTypeName),
    },
    {
        title: 'Ngày tạo',
        dataIndex: 'CreateAt',
        sorter: (a, b) => new Date(a.CreateAt) - new Date(b.CreateAt),
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

// Initial mock data for Animal Types
const initialData = [
    {
        key: '1',
        AnimalTypeName: 'Heo từ 3 đến 5 tuần',
        CreateAt: '2024-01-01',
        UpdateAt: '2024-05-01',
    },
    {
        key: '2',
        AnimalTypeName: 'Heo từ 1 đến 2 tháng',
        CreateAt: '2024-02-01',
        UpdateAt: '2024-06-01',
    },
];

export default function AnimalTypeManagement() {
    const [data, setData] = useState(initialData);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();
    const [editingKey, setEditingKey] = useState(null);

    const handleEdit = (record) => {
        setEditingKey(record.key);
        form.setFieldsValue({
            name: record.AnimalTypeName,
        });
        setIsModalOpen(true);
    };

    const handleDelete = (key) => {
        Modal.confirm({
            title: 'Bạn có chắc chắn muốn xóa loại vật nuôi này?',
            content: 'Loại vật nuôi đã xóa sẽ không thể khôi phục lại.',
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

    const handleAdd = () => {
        form.resetFields();
        setEditingKey(null);
        setIsModalOpen(true);
    };

    const handleOk = () => {
        form.validateFields().then(values => {
            if (editingKey) {
                // Editing
                const updatedData = data.map(item => {
                    if (item.key === editingKey) {
                        return {
                            ...item,
                            AnimalTypeName: values.name,
                            UpdateAt: new Date().toISOString().split('T')[0], // Current date as update time
                        };
                    }
                    return item;
                });
                setData(updatedData);
                message.success('Lưu loại vật nuôi thành công!');
            } else {
                // Adding new
                const newRow = {
                    key: data.length + 1,
                    AnimalTypeName: values.name,
                    CreateAt: new Date().toISOString().split('T')[0], // Current date as create time
                    UpdateAt: null,
                };
                setData([...data, newRow]);
                message.success('Thêm loại vật nuôi thành công!');
            }
            setIsModalOpen(false);
        }).catch(info => {
            console.log('Validate Failed:', info);
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
                    <h2>Quản lí loại vật nuôi</h2>
                </div>
                <div className="ct_text">
                    <p>Chào mừng bạn đến với hệ thống quản lí loại vật nuôi của trang trại heo.</p>
                </div>
                <div className="ct_manage">
                    <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        onClick={handleAdd}
                        style={{ marginBottom: 16 }}
                    >
                        Thêm loại vật nuôi
                    </Button>
                    <Table
                        columns={columns(handleEdit, handleDelete)}
                        dataSource={data}
                    />
                </div>
            </div>

            {/* Modal thêm hoặc chỉnh sửa loại vật nuôi */}
            <Modal
                title={editingKey ? "Chỉnh sửa loại vật nuôi" : "Thêm loại vật nuôi mới"}
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                okText="Lưu"
                cancelText="Hủy"
            >
                <Form
                    form={form}
                    layout="vertical"
                    name="form_in_modal"
                >
                    <Form.Item
                        name="name"
                        label="Tên loại vật nuôi"
                        rules={[{ required: true, message: 'Vui lòng nhập tên loại vật nuôi!' }]}
                    >
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
}
