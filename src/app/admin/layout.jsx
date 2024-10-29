'use client'

import React, { useState } from 'react';
import Script from 'next/script';
import Link from 'next/link';
import { Avatar, Button, Col, Layout, Menu, Row, theme, Dropdown, Form, Input, Modal, Upload, message } from 'antd';
import {
    AppstoreOutlined,
    CheckCircleOutlined,
    DesktopOutlined,
    EnvironmentOutlined,
    HomeOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    TeamOutlined,
    UploadOutlined,
    UserOutlined,
} from '@ant-design/icons';
import '/public/assets/css/layout_admin.css'; // Adjust path if necessary
import '/public/assets/font-awesome/css/all.min.css';
import Search from 'antd/es/transfer/search';

const { Header, Sider, Content } = Layout;
const onSearch = (value, _e, info) => console.log(info?.source, value);

export default function RootLayout({ children }) {
    const [collapsed, setCollapsed] = useState(false);
    const [username, setUsername] = useState("Admin"); // State to store username
    const [avatarUrl, setAvatarUrl] = useState(null); // State to store avatar URL
    const [isModalVisible, setIsModalVisible] = useState(false); // Modal visibility for editing

    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const showEditModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleOk = (values) => {
        // Update the username with the value from the form
        setUsername(values.username);
        setIsModalVisible(false);
    };

    const handleAvatarChange = ({ file }) => {
        if (file.status === 'done') {
            // Fake uploading for demo purpose (normally you'd upload to a server)
            const newAvatarUrl = URL.createObjectURL(file.originFileObj);
            setAvatarUrl(newAvatarUrl);
            message.success(`${file.name} đã tải lên thành công.`);
        } else if (file.status === 'error') {
            message.error(`${file.name} tải lên thất bại.`);
        }
    };

    const avatarMenu = (
        <Menu>
            <Menu.Item key="edit" onClick={showEditModal}>
                Chỉnh sửa thông tin cá nhân
            </Menu.Item>
            <Menu.Item key="logout">
                <Link href="/user">Đăng xuất</Link>
            </Menu.Item>
        </Menu>
    );

    return (
        <>
            {/* External Scripts */}
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
            <html lang="en">
                <body>
                    <Layout>
                        {/* Sidebar */}
                        <Sider trigger={null} collapsible collapsed={collapsed}>
                            <div className="demo-logo-vertical" />
                            <Menu
                                theme="dark"
                                mode="inline"
                                defaultSelectedKeys={['1']}
                                className='menu_qly'
                                items={[
                                    {
                                        key: '1',
                                        icon: <AppstoreOutlined />,
                                        label: <Link href="/admin/area">Quản lí khu vực</Link>,
                                    },
                                    {
                                        key: '2',
                                        icon: <EnvironmentOutlined />,
                                        label: <Link href="/admin/stable">Quản lí chuồng</Link>,
                                    },
                                    {
                                        key: '3',
                                        label: 'Quản lí vật nuôi',
                                        icon: <DesktopOutlined />,
                                        children: [
                                            {
                                                key: '4',
                                                label: <Link href="/admin/type-animal">Loại vật nuôi</Link>,
                                            },
                                            {
                                                key: '5',
                                                label: <Link href="/admin/animal">Quản lí heo</Link>,
                                            },
                                            {
                                                key: '6',
                                                label: <Link href="/admin/pigintakes">Quản lí phiếu nhập</Link>,
                                            }
                                        ],
                                    },
                                    {
                                        key: '7',
                                        icon: <UploadOutlined />,
                                        label: 'Quản lí thuốc',
                                        children: [
                                            {
                                                key: '8',
                                                label: 'Theo dõi sức khoẻ',
                                            },
                                            {
                                                key: '9',
                                                label: 'Lập phiếu nhập thuốc',
                                            },
                                            {
                                                key: '10',
                                                label: 'Lập phiếu xuất thuốc',
                                            },
                                            {
                                                key: '11',
                                                label: 'Quản lí kho',
                                            },
                                        ],
                                    },
                                    {
                                        key: '12',
                                        icon: <UploadOutlined />,
                                        label: 'Quản lí thức ăn',
                                        children: [
                                            {
                                                key: '13',
                                                label: <Link href="/admin/type-feed">Quản lí loại thức ăn</Link>,
                                            },
                                            {
                                                key: '14',
                                                label: <Link href="/admin/feed">Quản lí thức ăn</Link>,
                                            },
                                            {
                                                key: '15',
                                                label: <Link href="/admin/feedintakes">Quản lí phiếu nhập</Link>,
                                            }
                                        ],
                                    },
                                    {
                                        key: '17',
                                        icon: <UploadOutlined />,
                                        label: 'Báo cáo thống kê',
                                    },
                                    {
                                        key: '18',
                                        icon: <CheckCircleOutlined />,
                                        label: 'Xét duyệt',
                                        children: [
                                            {
                                                key: '19',
                                                label: <Link href="/admin/acpigintakes">Phiếu nhập heo</Link>,
                                            },
                                            {
                                                key: '20',
                                                label: <Link href="/admin/acfeedintakes">Phiếu nhập thức ăn</Link>,
                                            },
                                        ],
                                    },
                                    {
                                        key: '21',
                                        icon: <TeamOutlined />,
                                        label: 'Quản lí tài khoản',
                                        children: [
                                            {
                                                key: '22',
                                                label: 'Phân quyền',
                                            },
                                            {
                                                key: '23',
                                                label: <Link href="/admin/role">Vai trò</Link>,
                                            },
                                            {
                                                key: '24',
                                                label: <Link href="/admin/account">Tài khoản</Link>,
                                            },
                                            {
                                                key: '25',
                                                label: <Link href="/user">Đăng xuất</Link>,
                                            },
                                        ],
                                    },
                                    {
                                        key: '26',
                                        icon: <HomeOutlined />,
                                        label: <Link href="/admin/supplier">Quản lí nhà cung cấp</Link>,
                                    },
                                ]}
                            />
                        </Sider>

                        {/* Main Layout */}
                        <Layout>
                            {/* Header */}
                            <Header
                                style={{
                                    padding: 0,
                                    background: colorBgContainer,
                                }}
                            >
                                <Row>
                                    <Col md={18}>
                                        <div className="d_nav">
                                            <Button
                                                type="text"
                                                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                                                onClick={() => setCollapsed(!collapsed)}
                                                style={{
                                                    fontSize: '16px',
                                                    width: 64,
                                                    height: 64,
                                                }}
                                            />
                                            <Search placeholder="Tìm kiếm gì đó không biết nữa" onSearch={onSearch} enterButton />
                                        </div>
                                    </Col>
                                    <Col md={6}>
                                        <div className="d_avatar">
                                            <Dropdown overlay={avatarMenu} trigger={['click']}>
                                                <Avatar
                                                    size="default"
                                                    icon={<UserOutlined />}
                                                    src={avatarUrl} // Display the new avatar URL if uploaded
                                                />
                                            </Dropdown>
                                            <span className="d_username">{username}</span> {/* Display dynamic username */}
                                        </div>
                                    </Col>
                                </Row>
                            </Header>

                            {/* Content */}
                            <Content
                                style={{
                                    margin: '24px 16px',
                                    padding: 24,
                                    minHeight: 280,
                                    background: colorBgContainer,
                                    borderRadius: borderRadiusLG,
                                }}
                            >
                                {children} {/* Render child components */}
                            </Content>

                            {/* Modal for editing user info */}
                            <Modal
                                title="Chỉnh sửa thông tin cá nhân"
                                visible={isModalVisible}
                                onCancel={handleCancel}
                                footer={null}
                            >
                                <Form onFinish={handleOk}>
                                    <Form.Item
                                        label="Tên người dùng"
                                        name="username"
                                        rules={[{ required: true, message: 'Vui lòng nhập tên người dùng' }]}
                                    >
                                        <Input placeholder="Nhập tên người dùng mới" />
                                    </Form.Item>

                                    {/* Avatar Upload Field */}
                                    <Form.Item label="Ảnh đại diện">
                                        <Upload
                                            name="avatar"
                                            listType="picture"
                                            showUploadList={false}
                                            onChange={handleAvatarChange}
                                        >
                                            <Button icon={<UploadOutlined />}>Tải lên ảnh đại diện</Button>
                                        </Upload>
                                    </Form.Item>

                                    <Form.Item>
                                        <Button type="primary" htmlType="submit">
                                            Cập nhật
                                        </Button>
                                    </Form.Item>
                                </Form>
                            </Modal>
                        </Layout>
                    </Layout>
                </body>
            </html>
        </>
    );
}
