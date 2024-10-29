import Script from "next/script";
import Link from 'next/link';
import "bootstrap/dist/css/bootstrap.min.css";
import '/public/assets/css/login.css'; // Điều chỉnh đường dẫn nếu cần thiết
import '/public/assets/font-awesome/css/all.min.css';
import '/public/assets/fonts/icomoon/style.css';

const Login = () => {
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

            <div className="d-lg-flex half">
                <div className="bg order-1 order-md-2"></div>
                <div className="contents order-2 order-md-1">
                    <div className="container">
                        <div className="row align-items-center justify-content-center">
                            <div className="col-md-7">
                                <h3>
                                    Đăng nhập <strong>Nông trại</strong>
                                </h3>
                                <p className="mb-4">Chào mừng đến với hệ thống quản lí trang trại số 1 Việt Nam.</p>
                                <form action="#" method="post">
                                    <div className="form-group first">
                                        <label htmlFor="username">Tên đăng nhập</label>
                                        <input type="text" className="form-control" placeholder="ten-email@gmail.com" id="username" />
                                    </div>
                                    <div className="form-group last mb-3">
                                        <label htmlFor="password">Mật khẩu</label>
                                        <input type="password" className="form-control" placeholder="Mật khẩu" id="password" />
                                    </div>

                                    <div className="d-flex mb-5 align-items-center">
                                        <label className="control control--checkbox mb-0">
                                            <span className="caption">Lưu mật khẩu</span>
                                            <input type="checkbox" defaultChecked />
                                            <div className="control__indicator"></div>
                                        </label>
                                        <span className="ml-auto">
                                            <a href="#" className="forgot-pass">Quên mật khẩu</a>
                                        </span>
                                    </div>
                                    <Link href="/admin"><button className="btn btn-block btn-primary">Đăng nhập</button></Link>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

// Không sử dụng layout cho trang login
Login.getLayout = (page) => page;

export default Login;
