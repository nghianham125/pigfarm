import Script from "next/script";
import "bootstrap/dist/css/bootstrap.min.css";
import "/public/assets/css/login.css"; // Điều chỉnh đường dẫn nếu cần thiết
import "/public/assets/font-awesome/css/all.min.css";
import "/public/assets/fonts/icomoon/style.css";
import "./components/loginComponent";
import LoginComponent from "./components/loginComponent";
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
                <p className="mb-4">
                  Chào mừng đến với hệ thống quản lí trang trại số 1 VN.
                </p>
                <LoginComponent />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

// Không sử dụng layout cho trang login
Login.getLayout = (page) => page;

export default Login;
