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
  Popover,
  Input,
} from "antd";
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
} from "redux/actions/withdrawal";
import { getUserDetailsById } from "redux/actions/user";

const Withdrawal = ({
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
}) => {
  const { TabPane } = Tabs;
  const { Title } = Typography;
  const { TextArea } = Input;
  const [isUserModalVisible, setUserIsModalVisible] = useState(false);
  const [comment, setComment] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  function callback(key) {
    console.log(key);
  }
  useEffect(() => {
    getAllWithdrawals({ skip: 0, limit: 10 });
    getNewWithdrawals({ skip: 0, limit: 10 });
  }, [getAllWithdrawals, getNewWithdrawals]);
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

  const handleAction = (id) => {
    setIsModalVisible(true);
    getWithdrawalById({ transactionId: id });
  };

  const columns = [
    {
      title: "Date",
      dataIndex: "createdAt",
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
    setIsModalVisible(true);
    approveWithdrawal({
      transactionId:
        withdrawalDetails &&
        withdrawalDetails.transaction &&
        withdrawalDetails.transaction.id,
    });
    getAllWithdrawals({ skip: 0, limit: 10 });
    getNewWithdrawals({ skip: 0, limit: 10 });
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

  return (
    <div>
      <UserModal />
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
                    withdrawalDetails.transaction.createdAt
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
      <Title level={2}>Withdrawals</Title>
      <Row gutter={16}>
        <Col
          style={{ flex: 1, maxWidth: "100%" }}
          xs={24}
          sm={24}
          md={24}
          lg={18}
        >
          <Tabs
            defaultActiveKey="1"
            onChange={callback}
            style={{ background: "white" }}
          >
            <TabPane
              tab={
                <div>
                  <span>New Submitted Withdrawals</span>
                </div>
              }
              key="1"
            >
              <DataTable
                columns={columns}
                transaction={newWithdrawal}
                fetchTrans={getNewWithdrawals}
                title={"New Submitted Withdrawal"}
                data={newWithdrawal && newWithdrawal.transactions}
              />
            </TabPane>
            <TabPane
              tab={
                <div>
                  <span>All Withdrawals</span>
                </div>
              }
              key="2"
            >
              <DataTable
                columns={columns}
                transaction={withdrawals}
                fetchTrans={getAllWithdrawals}
                title={"Withdrawals"}
                data={withdrawals && withdrawals.transactions}
              />
            </TabPane>
          </Tabs>
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (state) => ({
  withdrawals: state.withdrawals.withdrawals,
  newWithdrawal: state.withdrawals.newWithdrawal,
  withdrawalDetails: state.withdrawals.withdrawalDetails,
  selectedUser: state.users.userById,
  declineWithdrawalTransaction: state.withdrawals.declineWithdrawalTransaction,
  approveWithdrawalTransaction: state.withdrawals.approveWithdrawalTransaction,
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
});

export default connect(mapStateToProps, mapDispatchToProps)(Withdrawal);
