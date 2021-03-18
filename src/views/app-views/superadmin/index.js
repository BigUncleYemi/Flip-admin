import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  Tabs,
  Row,
  Col,
  Typography,
  Button,
  Popconfirm,
  Form,
  Input,
  Timeline,
  Pagination
} from "antd";
import { MailOutlined } from "@ant-design/icons";
import DataTable from "components/layout-components/DataTable";
import { date } from "utils/helper";
import {
  deleteAdminUserInvite,
  getAllAdminUserInvites,
  inviteAdminUser,
  getAllAdminLogs,
} from "redux/actions/SuperAdmin";
import styles from "../../styles.module.scss";
import ModalWrapper from "components/layout-components/Modal";

const SuperAdmin = ({
  getAllAdminInvite,
  inviteAdmin,
  deleteAdminInvite,
  inviteAdminDone,
  adminLog,
  getAllAdminUserLogs,
  admins,
  loading,
}) => {
  const { Title } = Typography;
  const { TabPane } = Tabs;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [page, setPage] = useState(1);
  useEffect(() => {
    getAllAdminInvite({ skip: 0, limit: 10 });
    getAllAdminUserLogs({ skip: 0, limit: 10 });
  }, [getAllAdminInvite, getAllAdminUserLogs]);
  useEffect(() => {
    if (inviteAdminDone && isModalVisible) {
      setIsModalVisible(false);
    }
    // eslint-disable-next-line
  }, [inviteAdminDone]);

  const handleAction = (id) => {
    deleteAdminInvite({ id });
  };

  const columns = [
    {
      title: "Date Created",
      dataIndex: "createdAt",
      render: (createdAt) => `${date(createdAt)}`,
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Invite Used",
      dataIndex: "inviteUsed",
      render: (inviteUsed) => <p>{inviteUsed ? "Yes" : "No"}</p>,
    },
    {
      title: "Action",
      dataIndex: "id",
      key: "x",
      render: (id) => (
        <Popconfirm
          placement="top"
          title={"Are you sure you want to Delete this invite?"}
          onConfirm={() => handleAction(id)}
          okText="Delete"
          cancelText="No"
        >
          <Button type="primary" danger>
            Delete Invite
          </Button>
        </Popconfirm>
      ),
    },
  ];

  const onSubmit = ({ email }) => {
    inviteAdmin({
      email,
    });
  };

  const onChange = page => {
    console.log(page);
    setPage(page)
  };

  return (
    <div>
      <ModalWrapper
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        className={styles.withdrawInitial}
        showClose="no"
        showCancel
      >
        <Form
          layout="vertical"
          name="admin-form"
          style={{ padding: "20px 10px" }}
          onFinish={onSubmit}
        >
          <p>Please enter the email of the new admin to invite.</p>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              {
                required: true,
                message: "Please input your email",
              },
              {
                type: "email",
                message: "Please enter a validate email!",
              },
            ]}
          >
            <Input prefix={<MailOutlined className="text-primary" />} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={loading}>
              Invite
            </Button>
          </Form.Item>
        </Form>
      </ModalWrapper>

      <Tabs
        defaultActiveKey="1"
        style={{ background: "white" }}
      >
        <TabPane
          tab={
            <div>
              <span>Admin users</span>
            </div>
          }
          key="1"
          style={{padding: 10}}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <Title level={2}>Admin Users</Title>
            <Button type="primary" onClick={() => setIsModalVisible(true)}>
              Invite Admin
            </Button>
          </div>
          <Row gutter={16}>
            <Col
              style={{ flex: 1, maxWidth: "100%" }}
              xs={24}
              sm={24}
              md={24}
              lg={18}
            >
              <Row gutter={16}>
                <DataTable
                  columns={columns}
                  transaction={admins}
                  fetchTrans={getAllAdminInvite}
                  title={"Admins"}
                  data={admins && admins.invites}
                />
              </Row>
            </Col>
          </Row>
        </TabPane>
        <TabPane
          tab={
            <div>
              <span>Admin logs</span>
            </div>
          }
          key="2"
          style={{padding: 10}}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <Title level={2}>Admin Logs</Title>
          </div>
          <Row gutter={16}>
            <Col
              style={{ flex: 1, maxWidth: "100%" }}
              xs={24}
              sm={24}
              md={24}
              lg={24}
            >{console.log(adminLog)}
              <Timeline mode={'right'}>
                <Timeline.Item label="2015-09-01">Create a services</Timeline.Item>
                <Timeline.Item label="2015-09-01 09:12:11">Solve initial network problems</Timeline.Item>
                <Timeline.Item>Technical testing</Timeline.Item>
                <Timeline.Item label="2015-09-01 09:12:11">Network problems being solved</Timeline.Item>
              </Timeline>
              <Pagination current={page} onChange={onChange} total={50} />
            </Col>
          </Row>
        </TabPane>
      </Tabs>
    </div>
  );
};

const mapStateToProps = (state) => ({
  admins: state.super.admins,
  loading: state.super.loading,
  inviteAdminDone: state.super.inviteAdminUser,
  deleteAdminDone: state.super.deleteAdminUser,
  adminLog: state.super.adminLog,
});

const mapDispatchToProps = (dispatch) => ({
  inviteAdmin: (data) => {
    dispatch(inviteAdminUser(data));
  },
  getAllAdminInvite: (data) => {
    dispatch(getAllAdminUserInvites(data));
  },
  getAllAdminUserLogs: (data) => {
    dispatch(getAllAdminLogs(data));
  },
  deleteAdminInvite: (data) => {
    dispatch(deleteAdminUserInvite(data));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(SuperAdmin);
