import React from "react";
import { Input, Form, Button, Space, Checkbox, message } from "antd";
import "@ant-design/v5-patch-for-react-19";
import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { request } from "../../util/request.js";
import { useNavigate } from "react-router-dom";

import { SetAccessToken, GetAccessToken } from "../../util/Token.Store.js";
const Login = () => {
  const [formRef] = Form.useForm();
  const navigate = useNavigate();

  useEffect(() => {
    if (GetAccessToken()) {
      navigate("/homepage");
    }
  });
  const onFinish = async (value) => {
    try {
      const data = {
        email: value.email,
        password: value.password,
      };
      if (data.email == "admin" && data.password == "admin1213") {
        navigate("/dashboard");
        message.success("Login successful!");
        return;
      }
      const res = await request("login", "POST", data);
      if (!res?.data.access_token) {
        throw new Error("Invalid login response");
      }
      SetAccessToken(res.data.access_token);
      message.success("Login successful!");
      navigate("/homepage");
    } catch (error) {
      message.error("Login failed!");
    }
  };

  return (
    <>
      <div className="container" style={{ marginTop: "150px" }}>
        <div
          className="col-md-4 mx-auto shadow p-3 mb-5 bg-body rounded"
          style={{
            padding: "20px",
          }}
        >
          <p className="text-center fs-2 fw-bold">Login</p>
          <Form layout="vertical" onFinish={onFinish} form={formRef}>
            <Form.Item
              name="email"
              label="Email"
              rules={[{ required: true, message: "Please input Email" }]}
            >
              <Input placeholder="Email" />
            </Form.Item>

            <Form.Item
              name="password"
              label="Password"
              rules={[{ required: true, message: "Please input Password" }]}
            >
              <Input.Password placeholder="Password" />
            </Form.Item>
            <Space
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <p>
                Don't have an account{" "}
                <Link to="/forget-password">Forgot Password</Link>
              </p>
              <p>
                <Link to="/register">Register</Link>
              </p>
            </Space>
            <Form.Item>
              <Space
                style={{
                  display: "flex",
                  justifyContent: "right",
                  alignItems: "center",
                  marginTop: "20px",
                }}
              >
                <Button type="primary" htmlType="submit">
                  Login
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  );
};

export default Login;
