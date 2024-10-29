// components/Header
import Link from 'next/link';
import Script from "next/script";
import "bootstrap/dist/css/bootstrap.min.css"
import '/public/assets/css/header.css'; // Điều chỉnh đường dẫn nếu cần thiết
import '/public/assets/font-awesome/css/all.min.css';


const Header = () => {
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
            <header className="sticky-top">
                <div className="d_hd1 container-fluid">
                    <div className="d_nav1 container">
                        <div className="d_nav1_info">
                            <p className="p_nav1_info">
                                <i className="fa-solid fa-house"></i> Chăn nuôi lợn, 140 Lê Trọng Tấn, Việt Nam
                            </p>
                        </div>
                        <div className="d_nav1_phone">
                            <p className="p_nav1_phone">
                                <i className="fa-solid fa-phone"></i> +848556778345
                            </p>
                        </div>
                        <div className="d_nav1_icon">
                            <a href="#">
                                <i className="fa-brands fa-facebook-f"></i>
                            </a>
                            <a href="#">
                                <i className="fa-brands fa-twitter"></i>
                            </a>
                            <a href="#">
                                <i className="fa-brands fa-tiktok"></i>
                            </a>
                            <a href="#">
                                <i className="fa-brands fa-pinterest-p"></i>
                            </a>
                        </div>
                    </div>
                </div>

                <div className="d_hd2 container-fluid">
                    <div className="d_nav2 container">
                        <div className="d_nav2_logo">
                            <img src="/assets/image/logo.png" alt="Logo" />
                        </div>
                        <div className="d_nav2_menu">
                            <ul>
                                <li>
                                    <Link href="/user">Trang chủ</Link>
                                </li>
                                <li>
                                    <a href="#">Về chúng tôi</a>
                                </li>
                                <li>
                                    <Link href="/login">
                                        Dịch vụ chăn nuôi <i className="fa-sharp-duotone fa-solid fa-angle-down fa-2xs"></i>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/user/contact">Liên hệ</Link>
                                </li>
                            </ul>
                        </div>
                        <div className="d_nav2_icon_contact">
                            <a className="icon_search">
                                <i className="fas fa-search"></i>
                            </a>
                            <Link href="/login" className="contact">Đăng nhập</Link>
                        </div>
                    </div>
                </div>


            </header>
        </>
    );
};

export default Header;
