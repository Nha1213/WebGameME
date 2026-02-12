import React from "react";
import { Input, Form, Button, Space, message, Select } from "antd";
import "@ant-design/v5-patch-for-react-19";
import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { request } from "../../util/request.js";
import { useNavigate } from "react-router-dom";

import { SetAccessToken, GetAccessToken } from "../../util/Token.Store.js";
const Register = () => {
  const [formRef] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = async (value) => {
    try {
      const data = {
        email: value.email,
        name: value.name,
        password: value.password,
        status: value.status,
      };
      if (value.password !== value.confirmPassword) {
        message.error("Password does not match!");
        return;
      }
      const res = await request("register", "POST", data);
      if (res && !res.error) {
        message.success(res.message || "User registered successfully");
        navigate("/");
      } else {
        message.error(res.message || "Register failed!");
      }
    } catch (error) {
      message.error(error.message || "Register failed!");
    }
  };

  return (
    <>
      <div className="container" style={{ marginTop: "40px" }}>
        <div
          className="col-md-4 mx-auto shadow p-3 mb-5 bg-body rounded"
          style={{
            padding: "20px",
          }}
        >
          <p className="text-center fs-2 fw-bold">Register</p>
          <Form layout="vertical" onFinish={onFinish} form={formRef}>
            <Form.Item
              name="email"
              label="Email"
              rules={[{ required: true, message: "Please input Email" }]}
            >
              <Input placeholder="Email" />
            </Form.Item>

            <Form.Item
              name="name"
              label="Name"
              rules={[{ required: true, message: "Please input Name" }]}
            >
              <Input placeholder="Name" />
            </Form.Item>

            <Form.Item
              name="password"
              label="Password"
              rules={[{ required: true, message: "Please input Password" }]}
            >
              <Input.Password placeholder="Password" />
            </Form.Item>

            <Form.Item
              name="confirmPassword"
              label="ConfirmPassword"
              rules={[
                { required: true, message: "Please input ConfirmPassword" },
              ]}
            >
              <Input.Password placeholder="ConfirmPassword" />
            </Form.Item>

            <Form.Item
              name="status"
              label="Gender"
              rules={[{ required: true, message: "Please input Gender" }]}
            >
              <Select
                options={[
                  { value: 1, label: "Male" },
                  { value: 0, label: "Female" },
                ]}
                placeholder="Select Gender"
              />
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
                <Link to="/">Login</Link>
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
                  Register
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  );
};

export default Register;
