import React from "react";
import {
  Tag,
  Button,
  Table,
  Input,
  Space,
  Form,
  Modal,
  Select,
  message,
  InputNumber,
  Image,
  Upload,
  Row,
  Col,
} from "antd";
import { useState, useEffect } from "react";
import { request } from ".././util/request";
import { countStore } from "../store/Config";

const Price_poor = () => {
  const { SetConfig, config } = countStore();
  const [formRef] = Form.useForm();
  const [state, setstate] = useState({
    list: [],
    loading: false,
    open: false,
  });
  const handleCancel = () => {
    setstate((pre) => ({ ...pre, open: false }));
    formRef.resetFields();
  };

  const handleAddNew = async () => {
    const res = await request("price-pool-id", "post");
    // console.log(res.data.new_id);
    formRef.setFieldValue("place", res.data.new_id);
    setstate((pre) => ({ ...pre, open: true }));
  };

  const handleFinish = async (value) => {
    const data = {
      price: value.price,
      place: value.place,
      team_id: value.team_id,
    };

    let method = "post";
    if (formRef.getFieldValue("id")) {
      method = "put";
    }
    const res = await request("price-pool", method, data);
    if (res && !res.error) {
      getPricePool();
      message.success(res.message || "Insert success");
      setstate((pre) => ({ ...pre, open: false }));
      formRef.resetFields();
    }
  };

  useEffect(() => {
    getPricePool();
  }, []);

  const getPricePool = async () => {
    const res = await request("price-pool", "get");
    setstate((pre) => ({ ...pre, list: res.data.pricePool }));
  };

  const handleDelete = async (data) => {
    try {
      const res = await request(`price-pool/${data.place}`, "delete");

      if (res?.error) {
        return message.error(res.error || "Delete failed");
      }
      if (res && !res.error) {
        console.log(res);
        message.success(res.message || "Delete success");
      }
      getPricePool();
    } catch (err) {
      message.error(err?.message || "Delete failed");
    }
  };

  const handleEdit = async (data) => {
    setstate((pre) => ({ ...pre, open: true }));
    formRef.setFieldsValue({ ...data, id: data.id });
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "30px",
        }}
      >
        <div>
          <Space style={{ display: "flex", alignItems: "center" }}>
            <p>Price Pool</p>
            <div>
              <Input.Search placeholder="Search" />
            </div>
          </Space>
        </div>
        <div>
          <Button type="primary" onClick={handleAddNew}>
            Add New
          </Button>
        </div>
      </div>

      <Table
        columns={[
          {
            title: "ID",
            align: "center",
            dataIndex: "id",
            key: "id",
            render: (value, data, index) => {
              return <p>{index + 1}</p>;
            },
          },
          {
            title: "No",
            align: "center",
            dataIndex: "place",
            key: "place",
          },
          {
            title: "Team Name",
            align: "center",
            dataIndex: "team_name",
            key: "team_id",
          },
          {
            title: "Price",
            align: "center",
            dataIndex: "price",
            key: "price",
          },
          {
            title: "Action",
            align: "center",
            dataIndex: "action",
            key: "action",
            render: (value, data, Index) => (
              <Space>
                <Button type="primary" onClick={() => handleEdit(data)}>
                  Edit
                </Button>
                <Button
                  type="primary"
                  danger
                  onClick={() => handleDelete(data)}
                >
                  Delete
                </Button>
              </Space>
            ),
          },
        ]}
        dataSource={state.list}
        rowKey="id"
        pagination={true}
      />
      <Modal
        footer={null}
        open={state.open}
        onCancel={handleCancel}
        title={
          formRef.getFieldValue("id") ? "Update Price Pool" : "Add Price Pool"
        }
        key={1}
      >
        <Form layout="vertical" onFinish={handleFinish} form={formRef} key={0}>
          <Form.Item name="place" label="No " rules={[{ required: true }]}>
            <Input placeholder="No" disabled />
          </Form.Item>
          <Form.Item
            name="team_id"
            label="Name Team"
            rules={[{ required: true }]}
          >
            <Select
              placeholder="Select team"
              options={config.data?.config.map((item) => ({
                label: item.lable,
                value: item.value,
              }))}
            />
          </Form.Item>
          <Form.Item name="price" label="Price" rules={[{ required: true }]}>
            <Input.Password placeholder="Price" />
          </Form.Item>
          <Space style={{ display: "flex", justifyContent: "flex-end" }}>
            <Button>Cancel</Button>
            <Button type="primary" htmlType="submit">
              {formRef.getFieldValue("id") ? "Update" : "Submit"}
            </Button>
          </Space>
        </Form>
      </Modal>
    </>
  );
};

export default Price_poor;
