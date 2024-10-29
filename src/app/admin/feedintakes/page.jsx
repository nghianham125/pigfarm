'use client'
import Script from "next/script";
import "bootstrap/dist/css/bootstrap.min.css"
import '/public/assets/font-awesome/css/all.min.css';
import '/public/assets/css/feed.css';


import React, { useState } from 'react';
import { Table, Button, Space, Modal, Form, Input, Select, Checkbox, message } from 'antd';
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
    const [isPhiNhapModalOpen, setIsPhiNhapModalOpen] = useState(false);
    const [formPhiNhap] = Form.useForm();
    const [selectedFeeds, setSelectedFeeds] = useState([]);
    const [addedFeeds, setAddedFeeds] = useState([]);

    const handleAdd = () => {
        setIsPhiNhapModalOpen(true); // Open the 'Phiếu nhập' modal
    };

    const handlePhiNhapOk = () => {
        // Confirmation message when the "Xác nhận" button is clicked
        message.success('Phiếu nhập đã được xác nhận!');
        setAddedFeeds([]); // Reset added feeds after confirmation
        setIsPhiNhapModalOpen(false); // Close the modal
    };

    const handlePhiNhapCancel = () => {
        setIsPhiNhapModalOpen(false);
        setSelectedFeeds([]);
        setAddedFeeds([]);
    };

    const handleAddFeedToList = () => {
        const values = formPhiNhap.getFieldsValue();
        const updatedFeeds = selectedFeeds.map(feed => ({
            ...feed,
            expectedQuantity: values[feed.key],
        }));

        setAddedFeeds(prev => [...prev, ...updatedFeeds]);
        setSelectedFeeds([]);
        formPhiNhap.resetFields();
    };

    const handleSelectFeed = (feed, checked) => {
        if (checked) {
            setSelectedFeeds([...selectedFeeds, feed]);
        } else {
            setSelectedFeeds(selectedFeeds.filter(f => f.key !== feed.key));
        }
    };

    const feedOptions = initialData.map(feed => ({
        ...feed,
        expectedQuantity: 0,
    }));

    return (
        <>
            <div className="content">
                <div className="ct_title">
                    <h2>Quản lí phiếu nhập thức ăn</h2>
                </div>
                <div className="ct_manage">
                    <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        onClick={handleAdd}
                        style={{ marginBottom: 16 }}
                    >
                        Tạo phiếu nhập
                    </Button>
                    <Table
                        columns={columns()}
                        dataSource={data}
                    />
                </div>
            </div>

            {/* Modal for Phiếu nhập */}
            <Modal
                title="Tạo phiếu nhập"
                open={isPhiNhapModalOpen}
                onOk={handlePhiNhapOk}
                onCancel={handlePhiNhapCancel}
                footer={[
                    <Button key="add" onClick={handleAddFeedToList}>Thêm</Button>,
                    <Button key="confirm" type="primary" onClick={handlePhiNhapOk}>Xác nhận</Button>
                ]}
                width={800}
            >
                <Form
                    form={formPhiNhap}
                    layout="vertical"
                >
                    <Form.Item label="Khu vực" name="area">
                        <Select placeholder="Chọn khu vực">
                            <Option value="Khu A">Khu A</Option>
                            <Option value="Khu B">Khu B</Option>
                            <Option value="Khu C">Khu C</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label="Số ngày cần thêm" name="days">
                        <Input type="number" placeholder="Nhập số ngày cần thêm" />
                    </Form.Item>
                    <div className="modal-content-container" style={{ display: 'flex', justifyContent: 'space-between', padding: '16px 0' }}>
                        <div className="left-side" style={{ flex: 1, padding: '16px', border: '1px solid #f0f0f0', borderRadius: '8px', marginRight: '16px' }}>
                            <h3 style={{ marginBottom: '16px' }}>Danh sách thức ăn</h3>
                            {feedOptions.map(feed => (
                                <div key={feed.key} style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
                                    <Checkbox
                                        onChange={(e) => handleSelectFeed(feed, e.target.checked)}
                                        style={{ marginRight: '8px' }}
                                    >
                                        {feed.feedName}
                                    </Checkbox>
                                    <Input
                                        style={{ width: "60%" }}
                                        placeholder="Số lượng dự kiến"
                                        type="number"
                                        onChange={(e) =>
                                            formPhiNhap.setFieldsValue({ [feed.key]: e.target.value })
                                        }
                                    />
                                </div>
                            ))}
                        </div>
                        <div className="right-side" style={{ flex: 1, padding: '16px', border: '1px solid #f0f0f0', borderRadius: '8px' }}>
                            <h3 style={{ marginBottom: '16px' }}>Phiếu nhập đã thêm</h3>
                            {addedFeeds.length > 0 ? (
                                addedFeeds.map((feed, index) => (
                                    <div key={index} style={{ marginBottom: '8px' }}>
                                        <span>{feed.feedName}: {feed.expectedQuantity}</span>
                                    </div>
                                ))
                            ) : (
                                <span>Chưa có phiếu nhập nào</span>
                            )}
                        </div>
                    </div>
                </Form>
            </Modal>
        </>
    );
}
