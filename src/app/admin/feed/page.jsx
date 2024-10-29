'use client'
import Script from "next/script";
import "bootstrap/dist/css/bootstrap.min.css"
import '/public/assets/font-awesome/css/all.min.css';
import '/public/assets/css/feed.css';

import React, { useState } from 'react';
import { Table, Button, Space, Modal, Form, Input, Select, message } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

const { Option } = Select;

const columns = (handleEdit, handleDelete) => [
    {
        title: 'Tên thức ăn',
        dataIndex: 'feedName',
        sorter: (a, b) => a.feedName.localeCompare(b.feedName),
    },
    {
        title: 'Loại thức ăn',
        dataIndex: 'feedTypeId',
    },
    {
        title: 'Lượng thức ăn mỗi con',
        dataIndex: 'feedPerPig',
    },
    {
        title: 'Khu vực',
        dataIndex: 'areasId',
    },
    {
        title: 'Số lượng tồn kho',
        dataIndex: 'feedQuantity',
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

const initialData = [
    {
        key: '1',
        feedName: 'Thức ăn loại A',
        feedTypeId: 'Loại 1',
        feedPerPig: 50,
        areasId: 'Khu A',
        feedQuantity: 100,
    },
    {
        key: '2',
        feedName: 'Thức ăn loại B',
        feedTypeId: 'Loại 2',
        feedPerPig: 60,
        areasId: 'Khu B',
        feedQuantity: 80,
    },
];

export default function FeedCategoryManagement() {
    const [data, setData] = useState(initialData);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();
    const [editingKey, setEditingKey] = useState(null);

    const handleEdit = (record) => {
        setEditingKey(record.key);
        form.setFieldsValue({
            feedName: record.feedName,
            feedTypeId: record.feedTypeId,
            feedPerPig: record.feedPerPig,
            areasId: record.areasId,
            feedQuantity: record.feedQuantity,
        });
        setIsModalOpen(true);
    };

    const handleDelete = (key) => {
        Modal.confirm({
            title: 'Bạn có chắc chắn muốn xóa loại thức ăn này?',
            content: 'Loại thức ăn đã xóa sẽ không thể khôi phục lại.',
            okText: 'Xác nhận',
            okType: 'danger',
            cancelText: 'Huỷ',
            onOk: () => {
                setData(data.filter(item => item.key !== key));
            },
        });
    };

    const handleOk = () => {
        form.validateFields().then(values => {
            if (editingKey) {
                const updatedData = data.map(item => {
                    if (item.key === editingKey) {
                        return {
                            ...item,
                            ...values,
                        };
                    }
                    return item;
                });
                setData(updatedData);
                message.success('Lưu thông tin thức ăn thành công!');
            } else {
                const newRow = {
                    key: data.length + 1,
                    ...values,
                };
                setData([...data, newRow]);
                message.success('Thêm thông tin thức ăn thành công!');
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
                    <h2>Quản lí thức ăn</h2>
                </div>
                <div className="ct_manage">
                    <Table
                        columns={columns(handleEdit, handleDelete)}
                        dataSource={data}
                    />
                </div>
            </div>

            {/* Modal for Edit */}
            <Modal
                title={editingKey ? "Chỉnh sửa thông tin thức ăn" : "Thêm thức ăn mới"}
                open={isModalOpen}
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
                        name="feedName"
                        label="Tên thức ăn"
                        rules={[{ required: true, message: 'Vui lòng nhập tên thức ăn!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="feedTypeId"
                        label="Loại thức ăn"
                        rules={[{ required: true, message: 'Vui lòng nhập loại thức ăn!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="feedPerPig"
                        label="Lượng thức ăn mỗi con"
                        rules={[{ required: true, message: 'Vui lòng nhập lượng thức ăn mỗi con!' }]}
                    >
                        <Input type="number" />
                    </Form.Item>
                    <Form.Item
                        name="areasId"
                        label="Khu vực"
                        rules={[{ required: true, message: 'Vui lòng chọn khu vực!' }]}
                    >
                        <Select placeholder="Chọn khu vực">
                            <Option value="Khu A">Khu A</Option>
                            <Option value="Khu B">Khu B</Option>
                            <Option value="Khu C">Khu C</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="feedQuantity"
                        label="Số lượng tồn kho"
                        rules={[{ required: true, message: 'Vui lòng nhập số lượng tồn kho!' }]}
                    >
                        <Input type="number" />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
}
