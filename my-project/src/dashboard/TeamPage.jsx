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
var pathFile = "http://localhost/StoreImageWebGame/";
const TeamPage = () => {
  const [state, setstate] = useState({
    list: [],
    loading: false,
    open: false,
  });
  const [formRef] = Form.useForm();

  useEffect(() => {
    getList();
  }, []);
  const getList = async () => {
    const res = await request("team", "get");
    if (res && !res.error) {
      setstate((pre) => ({ ...pre, list: res.data.data }));
    } else {
      setstate((pre) => ({ ...pre, list: [] }));
    }
  };
  const handleFinish = async (item) => {
    const params = new FormData();
    params.append("team_id", item.team_id);
    params.append("team_name", item.team_name);
    params.append("status", item.status);
    params.append("description", item.description);

    // set to data backend
    params.append("id", formRef.getFieldValue("id"));
    params.append("image", formRef.getFieldValue("image"));

    if (item.image_default) {
      if (item.image_default.file.status === "removed") {
        params.append("image_remove", "1");
      } else {
        params.append(
          "image_upload",
          item.image_default.file.originFileObj,
          item.image_default.file.name
        );
      }
    }

    let method = "post";
    if (formRef.getFieldValue("id")) {
      method = "put";
    }

    const res = await request("team", method, params);
    if (res && !res.error) {
      getList();
      message.success(res.message || "Team created successfully!");
      formRef.resetFields();
      setstate((pre) => ({ ...pre, open: false }));
    } else {
      message.error(res.message || "Failed to create Team!");
    }
  };

  const handleEdit = async (data) => {
    setstate((pre) => ({ ...pre, open: true }));
    formRef.setFieldsValue({
      ...data,
    });
    if (data.image != null && data.image != "") {
      const imageProduct = [
        {
          uid: "-1",
          name: data.image,
          status: "done",
          url: pathFile + data.image,
        },
      ];
      setimage_default(imageProduct);
    }
  };

  const handleDelete = async (item, index) => {
    Modal.confirm({
      title: "Delete Team",
      content: "Are you sure to delete this Team?",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk: async () => {
        const res = await request(`team`, "DELETE", item);
        if (res && !res.error) {
          console.log(res.data.results);
          message.success(res.data.message || "Team deleted successfully!");
          getList();
        } else {
          message.error(res.data.message || "Failed to delete Team!");
        }
      },
    });
  };
  const handleCancel = () => {
    setstate((pre) => ({ ...pre, open: false }));
    formRef.resetFields();
    setimage_default([]);
  };

  const handleAddNew = async () => {
    setstate((pre) => ({ ...pre, open: true }));
    const res = await request("new_id", "post");
    if (res && !res.error) {
      formRef.setFieldValue("team_id", res.data.new_id);
    }
  };

  // stata for image upload
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [image_default, setimage_default] = useState([]);

  // convert to base 64
  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  // function handlePreview
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };

  // handle for upload image
  const handleChangeImage_default = ({ fileList: newFileList }) =>
    setimage_default(newFileList);

  return (
    <>
      <Modal
        title="Add New Team"
        onCancel={handleCancel}
        open={state.open}
        footer={null}
        style={{ top: 20 }}
      >
        <Form layout="vertical" onFinish={handleFinish} form={formRef}>
          <Form.Item name="team_id" label="ID Team">
            <Input placeholder="ID Team" disabled />
          </Form.Item>

          <Form.Item name="team_name" label="Name" rules={[{ required: true }]}>
            <Input placeholder="Name" />
          </Form.Item>

          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true }]}
          >
            <Input placeholder="Description" />
          </Form.Item>

          <Form.Item name="status" label="Status" rules={[{ required: true }]}>
            <Select
              placeholder="Status"
              options={[
                { value: 1, label: "Active" },
                { value: 0, label: "Inactive" },
              ]}
            />
          </Form.Item>

          <Form.Item name="image_default" label="Image (Default)">
            <Upload
              listType="picture-card"
              maxCount={1}
              fileList={image_default}
              onPreview={handlePreview}
              onChange={handleChangeImage_default}
              customRequest={(option) => option.onSuccess()}
            >
              <div>Upload</div>
            </Upload>
          </Form.Item>

          {previewImage && (
            <Image
              wrapperStyle={{ display: "none" }}
              preview={{
                visible: previewOpen,
                onVisibleChange: (v) => setPreviewOpen(v),
                afterOpenChange: (v) => !v && setPreviewImage(""),
              }}
              src={previewImage}
            />
          )}

          <Space style={{ display: "flex", justifyContent: "flex-end" }}>
            <Button onClick={handleCancel}>Cancel</Button>
            <Button type="primary" htmlType="submit">
              Save
            </Button>
          </Space>
        </Form>
      </Modal>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "30px",
        }}
      >
        <div>
          <Space style={{ display: "flex", alignItems: "center" }}>
            <p>Team</p>
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
            render: (value, data, index) => <p>{index + 1}</p>,
          },
          {
            title: "TeamID",
            align: "center",
            dataIndex: "team_id",
            key: "id",
          },
          {
            title: "Name",
            align: "center",
            dataIndex: "team_name",
            key: "name",
          },
          {
            title: "image",
            align: "center",
            dataIndex: "image",
            key: "image",
            render: (value) =>
              value ? <Image width={50} src={pathFile + value} /> : null,
          },
          {
            title: "Description",
            align: "center",
            dataIndex: "description",
            key: "description",
          },
          {
            title: "Status",
            align: "center",
            dataIndex: "status",
            key: "status",
            render: (value) =>
              value === 1 ? (
                <Tag color="green">Active</Tag>
              ) : (
                <Tag color="red">Inactive</Tag>
              ),
          },
          {
            title: "Active",
            align: "center",
            dataIndex: "active",
            render: (value, data, index) => (
              <Space>
                <Button
                  type="primary"
                  danger
                  onClick={() => handleDelete(data, index)}
                >
                  Delete
                </Button>
                <Button type="primary" onClick={() => handleEdit(data)}>
                  Edit
                </Button>
              </Space>
            ),
          },
        ]}
        dataSource={state.list}
        rowKey="id"
        key={0}
        pagination={true}
      />
    </>
  );
};

export default TeamPage;
