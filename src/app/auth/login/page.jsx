import "bootstrap/dist/css/bootstrap.min.css";
import "/public/assets/css/login.css";
import "/public/assets/font-awesome/css/all.min.css";
import "/public/assets/fonts/icomoon/style.css";
import { Toaster } from "sonner";
import Image from "next/image";
import LoginForm from "../components/loginComponent";

const LoginPage = () => {
  return (
    <>
      <Toaster position="top-right" richColors />
      <div className="d-lg-flex half">
        <div
          className="bg order-1 order-md-2"
          style={{
            position: "relative",
            height: "100vh",
            width: "50%",
            overflow: "hidden",
          }}
        >
          <Image
            src="https://res.cloudinary.com/dug5qzlcy/image/upload/v1730314420/x1ohtt8pmskzsriwh1lm.jpg"
            alt="Farm Background"
            fill
            style={{
              objectFit: "cover",
              objectPosition: "center",
            }}
            priority
          />

          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: "linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.7))",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              padding: "2rem",
              zIndex: 1,
            }}
          >
            <div className="text-center" style={{ maxWidth: "600px" }}>
              <h2
                className="text-white mb-4"
                style={{
                  fontSize: "2.8rem",
                  fontWeight: "bold",
                  textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
                }}
              >
                Quản lý trang trại thông minh
              </h2>
              <p
                className="text-white"
                style={{
                  fontSize: "1.2rem",
                  lineHeight: "1.6",
                  textShadow: "1px 1px 2px rgba(0,0,0,0.5)",
                  opacity: 0.9,
                }}
              >
                Giải pháp quản lý toàn diện cho trang trại của bạn
              </p>
            </div>
          </div>
        </div>

        <LoginForm />
      </div>
    </>
  );
};

export default LoginPage;
