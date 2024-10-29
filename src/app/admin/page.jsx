'use client';

import { Typography, Card, Row, Col } from 'antd';
import Script from 'next/script';
import '/public/assets/css/admin.css';

const { Title, Paragraph } = Typography;

export default function Admin() {
    return (
        <>
            {/* Bootstrap JavaScript */}
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

            <div className="container">
                <Title level={2} className="title">
                    Chào mừng đến với Bảng điều khiển Quản lý Trang trại Heo
                </Title>
                <Paragraph className="paragraph">
                    Bảng điều khiển này cho phép bạn quản lý và theo dõi các khía cạnh khác nhau của trang trại heo, bao gồm tồn kho, nhân viên và hiệu suất sản xuất. Dưới đây là một số lĩnh vực chính mà bạn có thể quản lý:
                </Paragraph>

                <Row gutter={16} justify="center" className="row">
                    <Col xs={24} sm={12} md={8}>
                        <Card title="Tồn kho Heo" bordered={false} className="card">
                            <Paragraph className="card-paragraph">
                                Quản lý số lượng heo trong trang trại, bao gồm tình trạng sức khỏe, độ tuổi và các dữ liệu liên quan khác. Bạn có thể theo dõi sự phát triển và doanh số của gia súc.
                            </Paragraph>
                        </Card>
                    </Col>
                    <Col xs={24} sm={12} md={8}>
                        <Card title="Quản lý Nhân viên" bordered={false} className="card">
                            <Paragraph className="card-paragraph">
                                Giám sát nhân viên trong trang trại, phân công nhiệm vụ và theo dõi hiệu suất của họ để đảm bảo hoạt động của trang trại diễn ra suôn sẻ.
                            </Paragraph>
                        </Card>
                    </Col>
                    <Col xs={24} sm={12} md={8}>
                        <Card title="Phân tích Trang trại" bordered={false} className="card">
                            <Paragraph className="card-paragraph">
                                Xem báo cáo và phân tích để theo dõi năng suất của trang trại bạn. Sử dụng dữ liệu để đưa ra quyết định thông minh và cải thiện hiệu quả hoạt động của trang trại.
                            </Paragraph>
                        </Card>
                    </Col>
                </Row>

                <Paragraph className="footer-paragraph">
                    Sử dụng thanh điều hướng bên trái để khám phá các tính năng quản lý khác, chẳng hạn như đơn hàng, đánh giá của khách hàng và nhiều hơn nữa.
                </Paragraph>
            </div>
        </>
    );
}
