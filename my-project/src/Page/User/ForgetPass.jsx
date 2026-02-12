import React from "react";
import { Input, Form, Button, Space, Checkbox, message } from "antd";
import "@ant-design/v5-patch-for-react-19";
import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { request } from "../../util/request.js";
import { useNavigate } from "react-router-dom";

import { SetAccessToken, GetAccessToken } from "../../util/Token.Store.js";
const ForgetPass = () => {
  const [formRef] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = async (value) => {
    try {
      const data = {
        email: value.email,
        passwordNew: value.passwordNew,
      };

      const res = await request("forgetPass", "put", data);
      if (res && !res.error) {
        message.success(res.message || "Password updated successfully");
        navigate("/");
        formRef.resetFields();
      }
    } catch (error) {
      message.error(error.message || "ForgetPass failed!");
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
          <p className="text-center fs-2 fw-bold">ForgotPass</p>
          <Form layout="vertical" onFinish={onFinish} form={formRef}>
            <Form.Item
              name="email"
              label="Email"
              rules={[{ required: true, message: "Please input Email" }]}
            >
              <Input placeholder="Email" />
            </Form.Item>

            <Form.Item
              name="passwordNew"
              label=" New Password"
              rules={[{ required: true, message: "Please input Password" }]}
            >
              <Input.Password placeholder="New Password" />
            </Form.Item>
            <Space
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <p>
                Don't have an account <Link to="/register">Register</Link>
              </p>
              <p>
                <Link to="/">login</Link>
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
                  Save
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  );
};

export default ForgetPass;
