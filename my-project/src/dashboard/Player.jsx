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
const Player = () => {
  const [state, setstate] = useState({
    list: [],
    loading: false,
    open: false,
  });
  const [formRef] = Form.useForm();
  // stata for image upload
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [image_default, setimage_default] = useState([]);

  useEffect(() => {
    getList();
  }, []);
  const getList = async () => {
    const res = await request("player", "get");
    console.log(res);
    if (res && !res.error) {
      setstate((pre) => ({ ...pre, list: res.data.data }));
    } else {
      setstate((pre) => ({ ...pre, list: [] }));
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

  const handleDelete = async (data) => {
    Modal.confirm({
      title: "Are you sure to delete this player?",
      onOk: async () => {
        const res = await request(`player`, "DELETE", data);
        if (res && !res.error) {
          message.success(res.data.message || "Player deleted successfully!");
          getList();
        } else {
          message.error(res.data.message || "Failed to delete Player!");
        }
      },
    });
  };

  const handleAddNew = async () => {
    setstate((pre) => ({ ...pre, open: true }));
    const res = await request("new_id_player", "post");
    if (res && !res.error) {
      formRef.setFieldValue("team_id", res.data.new_id);
    }
  };

  const handleCancel = () => {
    setstate((pre) => ({ ...pre, open: false }));
    formRef.resetFields();
  };

  const handleFinish = async (value) => {
    const params = new FormData();
    params.append("team_id", value.team_id);
    params.append("player_name", value.player_name);
    params.append("status", value.status);

    params.append("id", formRef.getFieldValue("id"));
    params.append("image", formRef.getFieldValue("image"));

    if (value.image_default) {
      if (value.image_default.file.states === "removed") {
        params.append("image_remove", "1");
      } else {
        params.append(
          "image_upload",
          value.image_default.file.originFileObj,
          value.image_default.file.name
        );
      }
    }

    let method = "post";
    if (formRef.getFieldValue("id")) {
      method = "put";
    }

    const res = await request("player", method, params);
    if (res && !res.error) {
      message.success(res.message || "Insert success");
      setstate((pre) => ({ ...pre, open: false }));
      getList();
      formRef.resetFields();
    }
  };

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
        title="Player Detail"
        open={state.open}
        onCancel={handleCancel}
        footer={null}
      >
        <Form layout="vertical" onFinish={handleFinish} form={formRef}>
          <Form.Item name="team_id" label="Team ID">
            <Input placeholder="Team ID" disabled />
          </Form.Item>

          <Form.Item name="player_name" label="Player Name">
            <Input placeholder="Player Name" />
          </Form.Item>

          <Form.Item name="status" label="Status">
            <Select
              placeholder="Select Status"
              options={[
                { label: "Active", value: 1 },
                { label: "Inactive", value: 0 },
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
              {formRef.getFieldValue("id") ? "Update" : "Submit"}
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
            render: (value, data, index) => {
              return <p>{index + 1}</p>;
            },
          },
          {
            title: "Team ID",
            align: "center",
            dataIndex: "team_id",
          },
          {
            title: "Player Name",
            align: "center",
            dataIndex: "player_name",
          },
          {
            title: "image",
            align: "center",
            dataIndex: "image",
            render: (value) => {
              return (
                <Image
                  width={50}
                  src={pathFile + value}
                  placeholder={<Image preview={false} src={pathFile + value} />}
                />
              );
            },
          },
          {
            title: "Status",
            align: "center",
            dataIndex: "status",
            render: (value) => {
              return value == 1 ? (
                <Tag color="green">Active</Tag>
              ) : (
                <Tag color="red">Inactive</Tag>
              );
            },
          },
          {
            title: "Action",
            align: "center",
            dataIndex: "action",
            render: (value, data, index) => {
              return (
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
              );
            },
          },
        ]}
        dataSource={state.list}
      />
    </>
  );
};

export default Player;
