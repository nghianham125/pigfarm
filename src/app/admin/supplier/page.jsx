'use client'
import Script from "next/script";
import "bootstrap/dist/css/bootstrap.min.css"
import '/public/assets/font-awesome/css/all.min.css';
import '/public/assets/css/supplier.css';

import React, { useState } from 'react';
import { Table, Button, Space, Modal, Form, Input, message } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

// Cấu hình cột
const columns = (handleEdit, handleDelete) => [
    {
        title: 'Tên nhà cung cấp',
        dataIndex: 'SupplierName',
        sorter: (a, b) => a.SupplierName.localeCompare(b.SupplierName),
    },
    {
        title: 'Loại nhà cung cấp',
        dataIndex: 'TypeSupplier',
        sorter: (a, b) => a.TypeSupplier.localeCompare(b.TypeSupplier),
    },
    {
        title: 'Ngày tạo',
        dataIndex: 'CreateAt',
        sorter: (a, b) => new Date(a.CreateAt) - new Date(b.CreateAt),
    },
    {
        title: 'Cập nhật lần cuối',
        dataIndex: 'UpdateAt',
        sorter: (a, b) => new Date(a.UpdateAt) - new Date(b.UpdateAt),
    },
    {
        title: 'Thông tin liên hệ',
        dataIndex: 'ContactInfo',
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
                    onClick={() => handleDelete(record.Id)}
                />
            </Space>
        ),
    },
];

// Dữ liệu mẫu
const initialData = [
    {
        Id: 'S001',
        SupplierName: 'Nhà cung cấp A',
        TypeSupplier: 'Vật nuôi',
        CreateAt: '2023-01-01T10:00:00Z',
        UpdateAt: '2023-01-10T12:00:00Z',
        ContactInfo: 'contact@providerA.com',
    },
    {
        Id: 'S002',
        SupplierName: 'Nhà cung cấp B',
        TypeSupplier: 'Thức ăn',
        CreateAt: '2023-02-15T09:00:00Z',
        UpdateAt: '2023-02-20T14:00:00Z',
        ContactInfo: 'contact@providerB.com',
    },
];

// Thành phần Quản lý Nhà Cung Cấp
export default function SupplierManagement() {
    const [data, setData] = useState(initialData);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();
    const [editingSupplier, setEditingSupplier] = useState(null); // Biến trạng thái cho bản ghi đang chỉnh sửa

    // Xử lý khi nhấn nút Chỉnh sửa
    const handleEdit = (record) => {
        setEditingSupplier(record); // Lưu bản ghi được chỉnh sửa
        setIsModalVisible(true); // Hiển thị modal với form để chỉnh sửa
        form.setFieldsValue({ // Đổ dữ liệu vào form
            name: record.SupplierName,
            address: record.ContactInfo.split(', ')[1], // Giả định dữ liệu chứa địa chỉ
            phone: record.ContactInfo.split(', ')[0].replace('Phone: ', ''), // Giả định dữ liệu chứa số điện thoại
            typeSupplier: record.TypeSupplier,
        });
    };

    // Xử lý khi nhấn nút Xóa
    const handleDelete = (key) => {
        Modal.confirm({
            title: 'Bạn có chắc chắn muốn xóa nhà cung cấp này?',
            content: 'Nhà cung cấp đã xóa sẽ không thể khôi phục lại.',
            okText: 'Xác nhận',
            okType: 'danger',
            cancelText: 'Huỷ',
            onOk: () => {
                setData(data.filter(item => item.Id !== key)); // Sửa lại từ item.key thành item.Id
            },
            onCancel: () => {
                console.log('Hủy xóa');
            },
        });
    };

    // Hiển thị modal thêm hoặc chỉnh sửa nhà cung cấp
    const handleAdd = () => {
        setEditingSupplier(null); // Xóa bản ghi đang chỉnh sửa nếu có
        setIsModalVisible(true); // Hiển thị modal thêm mới
        form.resetFields(); // Xóa dữ liệu trong form
    };

    // Xử lý khi nhấn "OK" để thêm hoặc chỉnh sửa nhà cung cấp
    const handleOk = () => {
        form
            .validateFields()
            .then((values) => {
                form.resetFields();
                if (editingSupplier) {
                    // Nếu đang ở chế độ chỉnh sửa, cập nhật bản ghi
                    const updatedData = data.map((item) =>
                        item.Id === editingSupplier.Id
                            ? {
                                ...item,
                                SupplierName: values.name,
                                TypeSupplier: values.typeSupplier,
                                UpdateAt: new Date().toISOString(),
                                ContactInfo: `Phone: ${values.phone}, Address: ${values.address}`,
                            }
                            : item
                    );
                    setData(updatedData);
                    // Hiển thị thông báo "Cập nhật thành công"
                    message.success('Cập nhật nhà cung cấp thành công!');
                } else {
                    // Nếu không có bản ghi chỉnh sửa, thêm mới bản ghi
                    const newRow = {
                        Id: `S00${data.length + 3}`, // Giả định ID tự động tăng
                        SupplierName: values.name,
                        TypeSupplier: values.typeSupplier,
                        CreateAt: new Date().toISOString(),
                        UpdateAt: new Date().toISOString(),
                        ContactInfo: `Phone: ${values.phone}, Address: ${values.address}`,
                    };
                    setData([...data, newRow]);
                    // Hiển thị thông báo "Thêm thành công"
                    message.success('Thêm nhà cung cấp thành công!');
                }
                setIsModalVisible(false);
            })
            .catch((info) => {
                console.log('Validate Failed:', info);
            });
    };

    // Đóng modal
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
                    <h2>Quản lý nhà cung cấp</h2>
                </div>
                <div className="ct_text">
                    <p>Chào mừng bạn đến với hệ thống quản lí nhà cung cấp của hệ thống trang trại heo số 1 thế giới</p>
                </div>
                <div className="ct_manage">
                    <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        onClick={handleAdd}
                        style={{ marginBottom: 16 }}
                    >
                        Thêm nhà cung cấp
                    </Button>
                    <Table
                        columns={columns(handleEdit, handleDelete)}
                        dataSource={data}
                    />
                </div>
            </div>

            {/* Modal thêm hoặc chỉnh sửa nhà cung cấp */}
            <Modal
                title={editingSupplier ? "Chỉnh sửa nhà cung cấp" : "Thêm nhà cung cấp"}
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <Form form={form} layout="vertical" name="add_supplier">
                    <Form.Item
                        name="name"
                        label="Tên nhà cung cấp"
                        rules={[{ required: true, message: 'Vui lòng nhập tên nhà cung cấp!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="address"
                        label="Địa chỉ"
                        rules={[{ required: true, message: 'Vui lòng nhập địa chỉ!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="phone"
                        label="Số điện thoại"
                        rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="typeSupplier"
                        label="Loại nhà cung cấp"
                        rules={[{ required: true, message: 'Vui lòng chọn loại nhà cung cấp!' }]}
                    >
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
}
