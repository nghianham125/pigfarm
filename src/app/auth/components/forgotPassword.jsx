"use client";
import React from "react";

const ForgotPasswordForm = () => {
  return (
    <div className="contents order-2 order-md-1">
      <div className="container">
        <div className="row align-items-center justify-content-center">
          <div className="col-md-7">
            <div className="mb-4">
              <h3
                className="mb-2"
                style={{ fontSize: "2rem", color: "#2c3e50" }}
              >
                Quên mật khẩu{" "}
                <strong style={{ color: "#e67e22" }}>Nông trại</strong>
              </h3>
              <p style={{ color: "#7f8c8d", fontSize: "1.1rem" }}>
                Nhập email của bạn để khôi phục mật khẩu
              </p>
            </div>

            <form action="#" className="forgot-form">
              <div className="form-group first mb-4">
                <label
                  htmlFor="email"
                  style={{ color: "#34495e", marginBottom: "0.5rem" }}
                >
                  Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="your-email@gmail.com"
                  style={{
                    height: "50px",
                    borderRadius: "10px",
                    border: "2px solid #eee",
                    transition: "all 0.3s ease",
                  }}
                />
              </div>

              <div className="d-flex mb-4 align-items-center justify-content-between">
                <span>
                  <a
                    href="/auth/login"
                    className="forgot-pass"
                    style={{
                      color: "#e67e22",
                      textDecoration: "none",
                      fontWeight: 500,
                    }}
                  >
                    <i className="fas fa-arrow-left me-2"></i>
                    Quay lại đăng nhập
                  </a>
                </span>
              </div>

              <button
                type="submit"
                className="btn btn-block btn-primary w-100"
                style={{
                  height: "50px",
                  borderRadius: "10px",
                  background: "#e67e22",
                  border: "none",
                  fontWeight: 500,
                  fontSize: "1.1rem",
                  transition: "all 0.3s ease",
                }}
              >
                Gửi yêu cầu
              </button>

              <div className="text-center mt-4">
                <p style={{ color: "#7f8c8d", fontSize: "0.9rem" }}>
                  Chúng tôi sẽ gửi hướng dẫn khôi phục mật khẩu vào email của
                  bạn
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;
