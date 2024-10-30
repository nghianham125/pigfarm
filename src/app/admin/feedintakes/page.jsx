'use client';
import "bootstrap/dist/css/bootstrap.min.css";
import '/public/assets/font-awesome/css/all.min.css';
import '/public/assets/css/feed.css';

import React, { useState } from 'react';
import { Table, Button, Space, Modal, Form, Input, Select, Checkbox, message } from 'antd';
import { PlusOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';

const { Option } = Select;

const initialData = [
    {
        key: 'feed1',
        feedName: 'Thức ăn loại A',
        feedTypeId: 'Loại 1',
        feedPerPig: 50,
        areasId: 'Khu A',
        feedQuantity: 100,
    },
    {
        key: 'feed2',
        feedName: 'Thức ăn loại B',
        feedTypeId: 'Loại 2',
        feedPerPig: 60,
        areasId: 'Khu B',
        feedQuantity: 80,
    },
];

export default function FeedCategoryManagement() {
    const [data, setData] = useState([]); // Dữ liệu phiếu nhập
    const [isPhiNhapModalOpen, setIsPhiNhapModalOpen] = useState(false);
    const [formPhiNhap] = Form.useForm();
    const [selectedFeeds, setSelectedFeeds] = useState([]); // Thức ăn đã chọn cho phiếu nhập
    const [addedFeeds, setAddedFeeds] = useState([]); // Thức ăn để thêm
    const [importId, setImportId] = useState(1); // ID phiếu nhập duy nhất
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false); // Modal hiển thị chi tiết phiếu nhập
    const [currentDetail, setCurrentDetail] = useState(null); // Dữ liệu chi tiết phiếu nhập

    const handleAdd = () => {
        setIsPhiNhapModalOpen(true); // Mở modal 'Phiếu nhập'
    };

    const handlePhiNhapOk = () => {
        const values = formPhiNhap.getFieldsValue();
        if (addedFeeds.length > 0) {
            const newImportSlip = {
                key: importId,
                area: values.area,
                days: values.days,
                feeds: addedFeeds,
            };

            setData(prevData => [...prevData, newImportSlip]);
            setImportId(prevId => prevId + 1); // Tăng ID phiếu nhập
            message.success('Phiếu nhập đã được xác nhận!');

            setAddedFeeds([]); // Reset thức ăn đã thêm sau khi xác nhận
        } else {
            message.warning('Vui lòng thêm thức ăn trước khi xác nhận!');
        }

        setIsPhiNhapModalOpen(false); // Đóng modal
    };

    const handlePhiNhapCancel = () => {
        setIsPhiNhapModalOpen(false);
        setSelectedFeeds([]); // Reset thức ăn đã chọn
        setAddedFeeds([]); // Reset thức ăn đã thêm
        formPhiNhap.resetFields(); // Reset các trường form
    };

    const handleSelectFeed = (feed, checked) => {
        if (checked) {
            // Thêm thức ăn vào danh sách đã chọn
            setSelectedFeeds(prev => [...prev, feed]);
        } else {
            // Xóa thức ăn ra khỏi danh sách đã chọn
            setSelectedFeeds(prev => prev.filter(f => f.key !== feed.key));
        }
    };

    const handleInputChange = (feed, value) => {
        formPhiNhap.setFieldsValue({ [feed.key]: value });

        // Cập nhật addedFeeds
        setAddedFeeds(prev => {
            const existingFeed = prev.find(f => f.key === feed.key);
            if (existingFeed) {
                return prev.map(f => f.key === feed.key ? { ...f, expectedQuantity: value } : f);
            }
            return [...prev, { ...feed, expectedQuantity: value }];
        });
    };

    const feedOptions = initialData.map(feed => ({
        ...feed,
        expectedQuantity: 0,
    }));

    const columns = [
        {
            title: 'ID phiếu nhập',
            dataIndex: 'key',
        },
        {
            title: 'Khu vực',
            dataIndex: 'area',
        },
        {
            title: 'Số ngày thêm',
            dataIndex: 'days',
        },
        {
            title: 'Hành động',
            render: (_, record) => (
                <Space size="middle">
                    <Button icon={<DeleteOutlined />} />
                    <Button
                        type="link"
                        icon={<EyeOutlined />} // Use the EyeOutlined icon here
                        onClick={() => {
                            setCurrentDetail(record);
                            setIsDetailModalOpen(true);
                        }}
                    />
                </Space>
            ),
        },
    ];

    const handleDetailModalCancel = () => {
        setIsDetailModalOpen(false);
        setCurrentDetail(null);
    };

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
                        columns={columns}
                        dataSource={data}
                    />
                </div>
            </div>

            {/* Modal cho Phiếu nhập */}
            <Modal
                title="Tạo phiếu nhập"
                open={isPhiNhapModalOpen}
                onOk={handlePhiNhapOk}
                onCancel={handlePhiNhapCancel}
                footer={[
                    <Button key="confirm" type="primary" onClick={handlePhiNhapOk}>Xác nhận</Button>
                ]}
                width={800}
            >
                <Form form={formPhiNhap} layout="vertical">
                    <Form.Item label="Khu vực" name="area" rules={[{ required: true, message: 'Vui lòng chọn khu vực!' }]}>
                        <Select placeholder="Chọn khu vực">
                            <Option value="Khu A">Khu A</Option>
                            <Option value="Khu B">Khu B</Option>
                            <Option value="Khu C">Khu C</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label="Số ngày cần thêm" name="days" rules={[{ required: true, message: 'Vui lòng nhập số ngày!' }]}>
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
                                        name={feed.key}
                                        onChange={(e) => handleInputChange(feed, e.target.value)}
                                        disabled={!selectedFeeds.some(f => f.key === feed.key)}
                                    />
                                </div>
                            ))}
                        </div>
                        <div className="right-side" style={{ flex: 1, padding: '16px', border: '1px solid #f0f0f0', borderRadius: '8px' }}>
                            <h3 style={{ marginBottom: '16px' }}>Chi tiết phiếu nhập</h3>
                            <ul>
                                {addedFeeds.map(feed => (
                                    <li key={feed.key}>{feed.feedName}: {feed.expectedQuantity}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </Form>
            </Modal>

            {/* Modal cho chi tiết phiếu nhập */}
            <Modal
                title="Chi tiết phiếu nhập"
                open={isDetailModalOpen}
                onCancel={handleDetailModalCancel}
                footer={[
                    <Button key="close" onClick={handleDetailModalCancel}>Đóng</Button>,
                ]}
                width={600}
            >
                {currentDetail && (
                    <>
                        <p><strong>ID phiếu nhập:</strong> {currentDetail.key}</p>
                        <p><strong>Khu vực:</strong> {currentDetail.area}</p>
                        <p><strong>Số ngày thêm:</strong> {currentDetail.days}</p>
                        <h3>Danh sách thức ăn</h3>
                        <ul>
                            {currentDetail.feeds.map((feed, index) => (
                                <li key={index}>{feed.feedName}: {feed.expectedQuantity}</li>
                            ))}
                        </ul>
                    </>
                )}
            </Modal>
        </>
    );
}
