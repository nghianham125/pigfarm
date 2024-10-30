"use client";
import React, { useState } from "react";

import Link from "next/link";

const LoginForm = () => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Xử lý logic đăng nhập ở đây
    setLoading(true);
  };

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
                Đăng nhập{" "}
                <strong style={{ color: "#e67e22" }}>Nông trại</strong>
              </h3>
              <p style={{ color: "#7f8c8d", fontSize: "1.1rem" }}>
                Chào mừng bạn quay trở lại
              </p>
            </div>

            <form onSubmit={handleSubmit} className="login-form">
              {/* Email Field */}
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

              {/* Password Field */}
              <div className="form-group mb-4">
                <label
                  htmlFor="password"
                  style={{ color: "#34495e", marginBottom: "0.5rem" }}
                >
                  Mật khẩu
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Nhập mật khẩu"
                  style={{
                    height: "50px",
                    borderRadius: "10px",
                    border: "2px solid #eee",
                    transition: "all 0.3s ease",
                  }}
                />
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="d-flex mb-4 align-items-center justify-content-between">
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="remember"
                    style={{ borderColor: "#e67e22" }}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="remember"
                    style={{ color: "#7f8c8d" }}
                  >
                    Ghi nhớ đăng nhập
                  </label>
                </div>
                <Link
                  href="/auth/forgotpassword"
                  style={{
                    color: "#e67e22",
                    textDecoration: "none",
                    fontWeight: 500,
                  }}
                >
                  Quên mật khẩu?
                </Link>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                className="btn btn-block btn-primary w-100"
                disabled={loading}
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
                {loading ? "Đang đăng nhập..." : "Đăng nhập"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
