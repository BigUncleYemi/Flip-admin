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
  Pagination,
  Statistic,
  Collapse,
  Select,
  message,
} from "antd";
import StatisticWidget from "components/shared-components/StatisticWidget";
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
import AppFetch from "auth/FetchInterceptor";
import { Money } from "utils/helper";

const convertToProperName = (name) => {
  return name.split("_").map(word => `${word[0].toUpperCase()}${word.slice(1,)}`).join(" ")
};

const ActionType = [
  "APPROVED_CARD_TRX", "DECLINED_CARD_TRX",
  "APPROVED_WITHDRAWAL_TRX", "DECLINED_WITHDRAWAL_TRX",
  "UPDATED_CARD_RATES", "UPDATED_COIN_RATES", "UPDATED_WITHDRAWAL_RATES", "UPDATED_BUYCARD_SETTINGS",
  "PROCESSING_CARD_TRX", "COMPLETED_CARD_TRX",
]

const generateMessage = (Data) => {
  let message = "";
  for (const [key, value] of Object.entries(Data)) {
    if (typeof value === "object") {
      message += `<h5>${convertToProperName(key)}</h5>`;
      message += `<h5>-------</h5>`;
      for (const [a, b] of Object.entries(value)) {
        if (typeof b === "object") {
          message += `<code>${JSON.stringify(b)}</code>`;
        } else {
          message += `<p><strong>${convertToProperName(a)}</strong>: ${
            typeof b === "object" ? <code>${JSON.stringify(b)}</code> : b
          }</p>`;
        }
        if (typeof b === "object") {
          message += `<h5>${convertToProperName(a)}</h5>`;
          message += `<h5>--------</h5>`;
          for (const [x, y] of Object.entries(b)) {
            if (typeof y === "object") {
              message += `<p><strong>${convertToProperName(
                x
              )}</strong>: ${""}</p>`;
              message += `<code>${JSON.stringify(y)}</code>`;
            } else {
              message += `<p><strong>${convertToProperName(x)}</strong>: ${
                typeof y === "object" ? <code>${JSON.stringify(y)}</code> : y
              }</p>`;
            }
          }
        }
      }
      message += `<h5>--------</h5>`;
    } else {
      message += `<p><strong>${convertToProperName(
        key
      )}</strong>: ${value}</p>`;
    }
  }
  return message;
};

const { Option } = Select;

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
  const { Panel } = Collapse;
  const { Search } = Input;
  const { TabPane } = Tabs;
  const [wallet, setWallet] = useState({});
  const [queryDate, setQueryData] = useState(false);
  const [actionTypeSel, setActionTypeSel] = useState("");
  const [actionBy, setActionBy] = useState("");
  const [loader, setLoader] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: adminLog && adminLog.meta && adminLog.meta.limit,
    total: adminLog && adminLog.meta && adminLog.meta.count,
  });
  useEffect(() => {
    if (inviteAdminDone && isModalVisible) {
      setIsModalVisible(false);
    }
    // eslint-disable-next-line
  }, [inviteAdminDone]);
  useEffect(() => {
    getAllAdminInvite({ skip: 0, limit: 10 });
    getAllAdminUserLogs({ skip: 0, limit: 10 });
  }, [getAllAdminInvite, getAllAdminUserLogs]);
  useEffect(() => {
    setPagination((pagination) => ({
      current: pagination.current,
      pageSize: adminLog && adminLog.meta && adminLog.meta.limit,
      total: adminLog && adminLog.meta && adminLog.meta.count,
    }));
    // setLoading(false);
  }, [adminLog]);
  useEffect(() => {
    getAllAdminUserLogs({
      skip: 0,
      limit: pagination.pageSize,
      actionType: actionTypeSel,
      actionBy
    });
    // setLoading(false);
    // eslint-disable-next-line
  }, [actionTypeSel, actionBy]);

  useEffect(() => {
    AppFetch({
      url: `/api/admin/super/misc/wallet-balances`,
      method: "GET",
    }).then((response) => {
      setWallet(response.data);
    });
  }, []);

  const handleTableChange = (pagination, filters, sorter) => {
    fetch({
      pagination: {
        current: pagination,
        pageSize: adminLog && adminLog.meta && adminLog.meta.limit,
        total: adminLog && adminLog.meta && adminLog.meta.count,
      },
    });
  };

  const fetch = async (params = {}) => {
    await getAllAdminUserLogs({
      skip: (params.pagination.current - 1) * params.pagination.pageSize,
      limit: params.pagination.pageSize,
      actionType: actionTypeSel,
      actionBy
    });
    setPagination({
      ...params.pagination,
      total: adminLog && adminLog.meta && adminLog.meta.count,
    });
  };

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

  const onQuery = ({ amount, currency, debitWallet }) => {
    setLoader(true);
    setQueryData();
    AppFetch({
      url: `/api/admin/misc/check-balance`,
      method: "GET",
      params: {
        amount,
        currency,
        debitWallet,
      },
    })
      .then((response) => {
        setQueryData(response.data);
        message.success(response.message);
        setLoader(false);
      })
      .catch((e) => {
        console.log(e);
        setLoader(false);
      });
  };

  function handleChange(value) {
    console.log(`selected ${value}`);
    setActionTypeSel(value);
  }

const onSearch = value => setActionBy(value);

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
            hasFeedback
            required
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

      <Tabs defaultActiveKey="1" style={{ background: "white" }}>
        <TabPane
          tab={
            <div>
              <span>Admin users</span>
            </div>
          }
          key="1"
          style={{ padding: 10 }}
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
          style={{ padding: 10 }}
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
          <Row align="start">
            <Col span={6}>
              <p>Filter By Action Type</p>
              <Select style={{minWidth: 200}} allowClear onChange={handleChange}>
                <Option value="">Select Action Type</Option>
                {ActionType.map((item) => <Option key={item} value={item}>{convertToProperName(item)}</Option>)}
              </Select>
            </Col>
            <Col span={6}>
              <p>Filter By Action By</p>
              <Search
                placeholder="Search by admin email"
                allowClear
                enterButton="Search"
                style={{minWidth: 280}}
                onSearch={onSearch}
              />
            </Col>
          </Row>
          <br />
          <br/>
          <Row gutter={16}>
            <Col
              style={{ flex: 1, maxWidth: "100%" }}
              xs={24}
              sm={24}
              md={24}
              lg={24}
            >
              <Timeline mode={"left"}>
                {adminLog?.activities.map((log, index) => (
                  <Timeline.Item label={date(log?.createdAt)}>
                    <Collapse ghost>
                      <Panel
                        header={`${log.actionType
                          .replace("_", " ")
                          .replace(
                            "_",
                            " "
                          )} by ${log?.actionedBy?.type.replace("_", " ")}-${
                          log?.actionedBy?.email
                        } `}
                        key="1"
                      >
                        <div
                          dangerouslySetInnerHTML={{
                            __html: generateMessage(log),
                          }}
                        />
                      </Panel>
                    </Collapse>
                  </Timeline.Item>
                ))}
              </Timeline>
              <Pagination
                pageSize={pagination.pageSize}
                current={pagination.current}
                onChange={handleTableChange}
                total={adminLog && adminLog.meta && adminLog.meta.count}
              />
            </Col>
          </Row>
        </TabPane>
        <TabPane
          tab={
            <div>
              <span>Admin Wallet Management</span>
            </div>
          }
          key="3"
          style={{ padding: 10 }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <Title level={2}>Admin Wallet Management</Title>
          </div>

          <Title level={4}>Master Wallet Balance</Title>
          <Row gutter={16}>
            <Col
              style={{ flex: 1, maxWidth: "100%" }}
              xs={24}
              sm={24}
              md={24}
              lg={24}
            >
              <Row gutter={16} style={{ marginBottom: 20 }}>
                <Col xs={24} sm={24} md={24} lg={24} xl={12}>
                  <StatisticWidget
                    title={"NGN Master Wallet Stat"}
                    value={
                      <>
                        <Statistic
                          title={"Available Balance"}
                          value={Money(
                            (wallet &&
                              wallet.fwBalances &&
                              wallet.fwBalances[0]?.available_balance) ||
                              0,
                            (wallet &&
                              wallet.fwBalances &&
                              wallet.fwBalances[0]?.currency) ||
                              "NGN"
                          )}
                        />
                        <Statistic
                          title={"Ledger Balance"}
                          value={Money(
                            (wallet &&
                              wallet.fwBalances &&
                              wallet.fwBalances[0]?.ledger_balance) ||
                              0,
                            (wallet &&
                              wallet.fwBalances &&
                              wallet.fwBalances[0]?.currency) ||
                              "NGN"
                          )}
                        />
                      </>
                    }
                  />
                </Col>
                <Col xs={24} sm={24} md={24} lg={24} xl={12}>
                  <StatisticWidget
                    title={"GHS Master Wallet Stat"}
                    value={
                      <>
                        <Statistic
                          title={"Available Balance"}
                          value={Money(
                            (wallet &&
                              wallet.wallets &&
                              wallet.wallets[1].available_balance) ||
                              0,
                            (wallet &&
                              wallet.wallets &&
                              wallet.wallets[1].currency) ||
                              "GHS"
                          )}
                        />
                        <Statistic
                          title={"Ledger Balance"}
                          value={Money(
                            (wallet &&
                              wallet.wallets &&
                              wallet.wallets[1].ledger_balance) ||
                              0,
                            (wallet &&
                              wallet.wallets &&
                              wallet.wallets[1].currency) ||
                              "GHS"
                          )}
                        />
                      </>
                    }
                  />
                </Col>
              </Row>
            </Col>
          </Row>
          <Title level={4}>Master Wallet Balances Sufficient Checker</Title>
          <Row gutter={16}>
            <Col
              style={{ flex: 1, maxWidth: "100%" }}
              xs={24}
              sm={24}
              md={24}
              lg={12}
            >
              <Row gutter={16} style={{ marginBottom: 20 }}>
                <Form
                  layout="vertical"
                  name="admin-form"
                  style={{ padding: "20px 10px" }}
                  onFinish={onQuery}
                >
                  <Form.Item
                    name="amount"
                    label="Amount"
                    hasFeedback
                    required
                    rules={[
                      {
                        required: true,
                        message: "Please input your amount",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    name="currency"
                    label="Currency to query For"
                    hasFeedback
                    required
                    rules={[
                      {
                        required: true,
                        message: "Please select your Currency",
                      },
                    ]}
                  >
                    <Select style={{ width: "100%" }}>
                      <Option value="NGN">NGN</Option>
                      <Option value="GHS">GHS</Option>
                    </Select>
                  </Form.Item>
                  <Form.Item
                    name="debitWallet"
                    label="Wallet to Debit from"
                    hasFeedback
                    required
                    rules={[
                      {
                        required: true,
                        message: "Please select your Wallet",
                      },
                    ]}
                  >
                    <Select style={{ width: "100%" }}>
                      <Option value="NGN">NGN Wallet</Option>
                      <Option value="GHS">GHS Wallet</Option>
                    </Select>
                  </Form.Item>
                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      block
                      loading={loader}
                    >
                      Query
                    </Button>
                  </Form.Item>
                </Form>
              </Row>
            </Col>
            <Col
              style={{ flex: 1, maxWidth: "100%" }}
              xs={24}
              sm={24}
              md={24}
              lg={12}
            >
              <Row gutter={16} style={{ marginBottom: 20 }}>
                {queryDate && queryDate.wallets && queryDate.wallets[0] && (
                  <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <StatisticWidget
                      title={`${
                        queryDate &&
                        queryDate.wallets &&
                        queryDate.wallets[0].currency
                      } Gallant`}
                      value={
                        queryDate &&
                        queryDate.wallets &&
                        queryDate.wallets[0].isGallant
                          ? "Yes"
                          : "NO"
                      }
                    />
                  </Col>
                )}
                {queryDate && queryDate.wallets && queryDate.wallets[1] && (
                  <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <StatisticWidget
                      title={`${
                        queryDate &&
                        queryDate.wallets &&
                        queryDate.wallets[1].currency
                      } Gallant`}
                      value={
                        queryDate &&
                        queryDate.wallets &&
                        queryDate.wallets[1].isGallant
                          ? "Yes"
                          : "NO"
                      }
                    />
                  </Col>
                )}
              </Row>
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
