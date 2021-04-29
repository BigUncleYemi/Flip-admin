import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  Tabs,
  Typography,
  Row,
  Col,
  List,
  Avatar,
  Button,
  Popconfirm,
  Drawer,
  Popover,
  Input,
  Form,
  Switch,
  Modal,
  Select,
} from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { date, Money } from "utils/helper";
import styles from "../../styles.module.scss";
import DataTable from "components/layout-components/DataTable";
import ModalWrapper from "components/layout-components/Modal";
import {
  getAllWithdrawalsTransactions,
  getNewWithdrawalsTransactions,
  getWithdrawalTransactionsById,
  approveWithdrawalTransaction,
  declineWithdrawalTransaction,
  getWithdrawalsSettings,
  updateWithdrawalsSettings,
} from "redux/actions/withdrawal";
import { getUserDetailsById } from "redux/actions/user";

const { confirm } = Modal;
const { Option } = Select;

const ActionType = ["SUBMITTED", "ALL"];

const convertToProperName = (name) => {
  return name
    .split("_")
    .map((word) => `${word[0].toUpperCase()}${word.slice(1)}`)
    .join(" ");
};

const Withdrawal = ({
  loading,
  getAllWithdrawals,
  getNewWithdrawals,
  getWithdrawalById,
  approveWithdrawal,
  declineWithdrawal,
  withdrawals,
  newWithdrawal,
  withdrawalDetails,
  getUserDetailsById,
  declineWithdrawalTransaction,
  approveWithdrawalTransaction,
  selectedUser,
  getWithdrawalsSettings,
  updateWithdrawalsSettings,
  withdrawalSettings,
}) => {
  const { TabPane } = Tabs;
  const { Title } = Typography;
  const { TextArea } = Input;
  const [isUserModalVisible, setUserIsModalVisible] = useState(false);
  const [comment, setComment] = useState("");
  const [debitWallet, setDebitWallet] = useState("");
  const [Trigger, setTrigger] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [visible, setVisible] = useState(false);
  const [actionTypeSel, setActionTypeSel] = useState("");
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: withdrawals && withdrawals.meta && withdrawals.meta.limit,
    total: withdrawals && withdrawals.meta && withdrawals.meta.count,
  });
  useEffect(() => {
    if (Trigger) {
      setIsModalVisible(true);
      approveWithdrawal({
        transactionId:
          withdrawalDetails &&
          withdrawalDetails.transaction &&
          withdrawalDetails.transaction.id,
        debitWallet,
      });
      getAllWithdrawals({ skip: 0, limit: 10 });
      // getNewWithdrawals({ skip: 0, limit: 10 });
      setTrigger(false);
    }
    // eslint-disable-next-line
  }, [Trigger]);
  function callback(key) {
    console.log(key);
  }
  useEffect(() => {
    getWithdrawalsSettings();
    getAllWithdrawals({ skip: 0, limit: 10 });
    // getNewWithdrawals({ skip: 0, limit: 10 });
  }, [getAllWithdrawals, getWithdrawalsSettings]);
  useEffect(() => {
    if (declineWithdrawalTransaction && isModalVisible) {
      setIsModalVisible(false);
    }
    // eslint-disable-next-line
  }, [declineWithdrawalTransaction]);
  useEffect(() => {
    if (approveWithdrawalTransaction && isModalVisible) {
      setIsModalVisible(false);
    }
    // eslint-disable-next-line
  }, [approveWithdrawalTransaction]);

  useEffect(() => {
    getAllWithdrawals({
      skip: 0,
      limit: pagination.pageSize,
      actionType: actionTypeSel,
    });
    // setLoading(false);
    // eslint-disable-next-line
  }, [actionTypeSel, pagination]);

  const handleAction = (id) => {
    setIsModalVisible(true);
    getWithdrawalById({ transactionId: id });
  };

  const columns = [
    {
      title: "Date",
      dataIndex: "created_at",
      render: (createdAt) => `${date(createdAt)}`,
    },
    {
      title: "Reference",
      dataIndex: "reference",
    },
    {
      title: "Amount",
      dataIndex: "amount",
    },
    {
      title: "Bank Account",
      dataIndex: "bankAccount",
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Action",
      dataIndex: "id",
      key: "x",
      render: (id) => (
        <p style={{ cursor: "pointer" }} onClick={() => handleAction(id)}>
          View Details
        </p>
      ),
    },
  ];

  const handleUserAction = (id) => {
    setUserIsModalVisible(true);
    getUserDetailsById({ id });
  };

  function handleTypeChange(value) {
    console.log(`selected ${value}`);
    setActionTypeSel(value);
  }

  const UserModal = () => {
    return (
      <ModalWrapper
        isModalVisible={
          selectedUser && selectedUser.user ? isUserModalVisible : false
        }
        setIsModalVisible={setUserIsModalVisible}
        className={styles.withdrawInitial}
        showClose="no"
        showCancel
      >
        <div className={styles.transactionBig}>
          <div className={styles.transactionBig__tag}>
            <Avatar size="large" style={{ margin: 10 }}>
              {`${
                selectedUser &&
                selectedUser.user &&
                selectedUser.user.firstName[0]
              } ${
                selectedUser &&
                selectedUser.user &&
                selectedUser.user.lastName[0]
              }`}
            </Avatar>
            <span>
              {selectedUser && selectedUser.user && selectedUser.user.firstName}
            </span>{" "}
            <span>
              {selectedUser && selectedUser.user && selectedUser.user.lastName}
            </span>
          </div>
          <div style={{ margin: 10 }}>
            <List.Item>
              <List.Item.Meta
                title={"ID"}
                description={
                  selectedUser && selectedUser.user && selectedUser.user.id
                }
              />
            </List.Item>
            <List.Item>
              <List.Item.Meta
                title={"First Name"}
                description={
                  selectedUser &&
                  selectedUser.user &&
                  selectedUser.user.firstName
                }
              />
            </List.Item>
            <List.Item>
              <List.Item.Meta
                title={"Last Name"}
                description={
                  selectedUser &&
                  selectedUser.user &&
                  selectedUser.user.lastName
                }
              />
            </List.Item>
            <List.Item>
              <List.Item.Meta
                title={"Email"}
                description={
                  selectedUser && selectedUser.user && selectedUser.user.email
                }
              />
            </List.Item>
            <List.Item>
              <List.Item.Meta
                title={"User Type"}
                description={
                  selectedUser && selectedUser.user && selectedUser.user.type
                }
              />
            </List.Item>
            <List.Item>
              <List.Item.Meta
                title={"Date Created"}
                description={date(
                  selectedUser &&
                    selectedUser.user &&
                    selectedUser.user.createdAt
                )}
              />
            </List.Item>
            <List.Item>
              <List.Item.Meta
                title={"Date last updated"}
                description={date(
                  selectedUser &&
                    selectedUser.user &&
                    selectedUser.user.updatedAt
                )}
              />
            </List.Item>
            <List.Item>
              <List.Item.Meta
                title={"verification"}
                description={
                  <div>
                    <span>
                      Email:{" "}
                      {selectedUser &&
                      selectedUser.user &&
                      selectedUser.user.verification.email.isVerified
                        ? "✅"
                        : "🚫"}
                    </span>
                    <span style={{ paddingLeft: 10 }}>
                      Phone Number:{" "}
                      {selectedUser &&
                      selectedUser.user &&
                      selectedUser.user.verification.phoneNumber.isVerified
                        ? "✅"
                        : "🚫"}
                    </span>
                  </div>
                }
              />
            </List.Item>
          </div>
        </div>
      </ModalWrapper>
    );
  };

  const handleApproval = () => {
    confirm({
      title: `Please select wallet to complete the action with.`,
      icon: <ExclamationCircleOutlined />,
      content: (
        <div>
          <Select
            onChange={(value) => setDebitWallet(value)}
            style={{ width: "100%" }}
          >
            <Option value="NGN">NGN Wallet</Option>
            <Option value="GHS">GHS Wallet</Option>
          </Select>
        </div>
      ),
      onOk() {
        setTrigger(true);
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  const handleDecline = () => {
    setIsModalVisible(true);
    declineWithdrawal({
      transactionId:
        withdrawalDetails &&
        withdrawalDetails.transaction &&
        withdrawalDetails.transaction.id,
      comment,
    });
    getAllWithdrawals({ skip: 0, limit: 10 });
    getNewWithdrawals({ skip: 0, limit: 10 });
  };

  const content = (
    <div>
      <p>
        Please provide a reason for declining the request.(min of ten
        characters)
      </p>
      <div style={{ marginBottom: 10 }}>
        <TextArea
          required
          value={comment}
          minLength={10}
          rows={4}
          onChange={(e) => setComment(e.target.value)}
        />
      </div>
      <Popconfirm
        placement="top"
        title={"Are you sure you want to Decline this request?"}
        onConfirm={handleDecline}
        okText="Decline"
        cancelText="No"
      >
        <Button
          type="primary"
          danger
          disabled={!comment || comment.length < 10}
        >
          Decline
        </Button>
      </Popconfirm>
    </div>
  );

  const [form] = Form.useForm();

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const onFinish = (value) => {
    // console.log(value);
    const data = {
      updateBody: {
        rates: {
          NGN: [
            {
              min: value.ratesNGNMIn,
              max: value.ratesNGNMax,
              charge: {
                value: value.ratesNGNChargeValue,
                isPercent: value.ratesNGNChargeIsPercent,
              },
            },
          ],
          GHS: [
            {
              min: value.ratesGHSMIn,
              max: value.ratesGHSMax,
              charge: {
                value: value.ratesGHSChargeValue,
                isPercent: value.ratesGHSChargeIsPercent,
              },
            },
          ],
        },
        withdrawalDelay: value.withdrawalDelay,
      },
    };
    updateWithdrawalsSettings(data);
  };

  return (
    <div>
      {/* <UserModal /> */}
      <ModalWrapper
        isModalVisible={
          withdrawalDetails && withdrawalDetails.transaction
            ? isModalVisible
            : false
        }
        setIsModalVisible={setIsModalVisible}
        className={styles.withdrawInitial}
        showClose="no"
        showCancel
      >
        <div className={styles.transactionBig}>
          <div className={styles.transactionBig__tag}>
            <p>
              <strong>Status:</strong>{" "}
              <span>
                {withdrawalDetails &&
                  withdrawalDetails.transaction &&
                  withdrawalDetails.transaction.status}
              </span>
            </p>
            <strong>Reference:</strong>{" "}
            <span>
              {withdrawalDetails &&
                withdrawalDetails.transaction &&
                withdrawalDetails.transaction.reference}
            </span>
          </div>
          <div style={{ margin: 10 }}>
            <List.Item>
              <List.Item.Meta
                title={"Date Created"}
                description={date(
                  withdrawalDetails &&
                    withdrawalDetails.transaction &&
                    withdrawalDetails.transaction.created_at
                )}
              />
            </List.Item>
            <List.Item>
              <List.Item.Meta
                title={"ID"}
                description={
                  withdrawalDetails &&
                  withdrawalDetails.transaction &&
                  withdrawalDetails.transaction.id
                }
              />
            </List.Item>
            <List.Item>
              <List.Item.Meta
                title={"Bank Account"}
                description={
                  withdrawalDetails &&
                  withdrawalDetails.transaction &&
                  withdrawalDetails.transaction.bankAccount
                }
              />
            </List.Item>
            <List.Item>
              <List.Item.Meta
                title={"Amount"}
                description={Money(
                  withdrawalDetails &&
                    withdrawalDetails.transaction &&
                    withdrawalDetails.transaction.amount,
                  "NGN"
                )}
              />
            </List.Item>
            <List.Item>
              <List.Item.Meta
                title={"Transaction Fee"}
                description={Money(
                  withdrawalDetails &&
                    withdrawalDetails.transaction &&
                    withdrawalDetails.transaction.transactionFee,
                  "NGN"
                )}
              />
            </List.Item>
            <List.Item>
              <List.Item.Meta
                title={"User Id"}
                description={
                  <p
                    style={{ cursor: "pointer" }}
                    onClick={() =>
                      handleUserAction(
                        withdrawalDetails &&
                          withdrawalDetails.transaction &&
                          withdrawalDetails.transaction.userId
                      )
                    }
                  >
                    {withdrawalDetails &&
                      withdrawalDetails.transaction &&
                      withdrawalDetails.transaction.userId}
                  </p>
                }
              />
            </List.Item>
          </div>
          {withdrawalDetails &&
            withdrawalDetails.transaction &&
            withdrawalDetails.transaction.status === "SUBMITTED" && (
              <div style={{ display: "flex" }}>
                <Popconfirm
                  placement="top"
                  title={"Are you sure you want to Approve this request?"}
                  onConfirm={handleApproval}
                  okText="Approve"
                  cancelText="No"
                >
                  <Button type="primary" style={{ marginRight: 10 }}>
                    Approve
                  </Button>
                </Popconfirm>
                <Popover content={content} title="Title" trigger="click">
                  <Button type="primary" danger>
                    Decline
                  </Button>
                </Popover>
              </div>
            )}
        </div>
      </ModalWrapper>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <Title level={2}>Withdrawals</Title>
        <Button type="primary" onClick={showDrawer}>
          Withdrawals Settings
        </Button>
      </div>
      <Drawer
        title="Withdrawals Settings"
        placement="right"
        closable={false}
        onClose={onClose}
        width={350}
        visible={visible}
      >
        <Form
          form={form}
          layout="vertical"
          name="login-form"
          onFinish={onFinish}
        >
          {withdrawalSettings && Object.keys(withdrawalSettings).map((item)=> (
            <div key={withdrawalSettings[item].id.toString()}>
            
            <Form.Item
            label={withdrawalSettings[item]?.description}
            >
              {withdrawalSettings[item]?.type === "boolean" && (
                <Switch defaultChecked={JSON.parse(withdrawalSettings[item]?.value)["data"]}/>
              )}
              {withdrawalSettings[item]?.type === "string" && (
                <Input type="text" defaultValue={JSON.parse(withdrawalSettings[item]?.value)["data"]} />
              )}
              {withdrawalSettings[item]?.type === "number" && (
                <Input type="number" defaultValue={JSON.parse(withdrawalSettings[item]?.value)["data"]} />
              )}
              
            </Form.Item>
            </div>
          ))}
          
          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={loading}>
              Update Settings
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
      <Row align="start">
        <Col span={6}>
          <p>Filter By Status</p>
          <Select
            style={{ minWidth: 200 }}
            allowClear
            onChange={handleTypeChange}
          >
            <Option value="">Select Status</Option>
            {ActionType.map((item) => (
              <Option key={item} value={item}>
                {convertToProperName(item)}
              </Option>
            ))}
          </Select>
        </Col>
       
      </Row>
      <Row gutter={16}>
        <Col
          style={{ flex: 1, maxWidth: "100%" }}
          xs={24}
          sm={24}
          md={24}
          lg={18}
        >
          <DataTable
            columns={columns}
            transaction={withdrawals}
            fetchTrans={getAllWithdrawals}
            title={"Withdrawals"}
            data={withdrawals && withdrawals.transactions}
          />
          
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (state) => ({
  loading: state.withdrawals.loading,
  withdrawals: state.withdrawals.withdrawals,
  newWithdrawal: state.withdrawals.newWithdrawal,
  withdrawalDetails: state.withdrawals.withdrawalDetails,
  selectedUser: state.users.userById,
  declineWithdrawalTransaction: state.withdrawals.declineWithdrawalTransaction,
  approveWithdrawalTransaction: state.withdrawals.approveWithdrawalTransaction,
  withdrawalSettings:
    state.withdrawals.withdrawalSettings &&
    state.withdrawals.withdrawalSettings.settings,
});

const mapDispatchToProps = (dispatch) => ({
  getAllWithdrawals: (data) => {
    dispatch(getAllWithdrawalsTransactions(data));
  },
  getNewWithdrawals: (data) => {
    dispatch(getNewWithdrawalsTransactions(data));
  },
  getWithdrawalById: (data) => {
    dispatch(getWithdrawalTransactionsById(data));
  },
  approveWithdrawal: (data) => {
    dispatch(approveWithdrawalTransaction(data));
  },
  declineWithdrawal: (data) => {
    dispatch(declineWithdrawalTransaction(data));
  },
  getUserDetailsById: (userId) => {
    dispatch(getUserDetailsById(userId));
  },
  updateWithdrawalsSettings: (data) => {
    dispatch(updateWithdrawalsSettings(data));
  },
  getWithdrawalsSettings: () => {
    dispatch(getWithdrawalsSettings());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Withdrawal);
