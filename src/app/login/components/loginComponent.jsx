"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Button, Form } from "antd";
import { toast, Toaster } from "sonner";
import axios from "axios";

export default function LoginComponent() {
  const router = useRouter();
  const onFinish = async (values) => {
    try {
      const response = await axios({
        url: `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/login`,
        method: "POST",
        data: {
          email: values.email,
          password: values.password,
        },
      });
      if (response.status == 200) {
        console.log(response.data);
        const { accessToken, refreshToken } = response.data.data;
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        router.push("/admin");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <React.Fragment>
      <Toaster position="top-right" richColors closeButton />
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 600,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        // onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your email!",
            },
            {
              type: "email",
              message: "Nhập đúng định dạng email!",
            },
          ]}
        >
          <div className="form-group first">
            <label htmlFor="Email">Email</label>
            <input
              type="text"
              className="form-control"
              placeholder="ten-email@gmail.com"
              id="username"
              // onChange={(e) => setUsername(e.target.value)}
            />
          </div>
        </Form.Item>

        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
            {
              pattern:
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.])[A-Za-z\d@$!%*?&.]{8,16}$/,
              message:
                "Mật khẩu phải có ít nhất 8 ký tự, 1 chữ hoa, 1 chữ thường, 1 số và 1 ký tự đặc biệt!",
            },
          ]}
        >
          <div className="form-group last mb-3">
            <label htmlFor="password">Mật khẩu</label>
            <input
              type="password"
              className="form-control"
              placeholder="Mật khẩu"
              id="password"
              // onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </Form.Item>

        {/* <div className="d-flex mb-5 align-items-center">
        <label className="control control--checkbox mb-0">
          <span className="caption">Lưu mật khẩu</span>
          <input type="checkbox" defaultChecked />
          <div className="control__indicator"></div>
        </label>
        <span className="ml-auto">
          <a href="#" className="forgot-pass">
            Quên mật khẩu
          </a>
        </span>
      </div> */}
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="btn btn-block btn-primary"
          >
            Đăng nhập
          </Button>
        </Form.Item>
      </Form>
    </React.Fragment>
  );
}
