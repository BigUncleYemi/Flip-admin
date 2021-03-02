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
  // Input,
  // Image,
  Drawer,
  // Form,
} from "antd";
import {
  date,
  // Money,
} from "utils/helper";
import styles from "../../styles.module.scss";
import DataTable from "components/layout-components/DataTable";
import ModalWrapper from "components/layout-components/Modal";
import { getUserDetailsById } from "redux/actions/user";
import {
  getAllBTCTransactions,
  getBTCTransactionsById,
  getBTCSettings,
  updateBTCSettings,
} from "redux/actions/btc";


const BTC = ({
  getAllGiftCard,
  getGiftCardById,
  BTCTransaction,
  BTCDetails,
  getUserDetailsById,
  declineGiftCardTransaction,
  approveGiftCardTransaction,
  selectedUser,
  getGiftCardList,
}) => {
  const { TabPane } = Tabs;
  const { Title } = Typography;
  const [isUserModalVisible, setUserIsModalVisible] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [visible, setVisible] = useState(false);
  // const [state, setState] = useState({
  //   btc: 0,
  //   usd: 0,
  //   ngn: 0,
  //   ghs: 0,
  //   country: "",
  //   cardType: "",
  //   asset: "",
  //   assetValue: "",
  //   amount: 0,
  //   total: 0,
  // });
  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };
  function callback(key) {
    console.log(key);
  }
  useEffect(() => {
    getAllGiftCard({ skip: 0, limit: 10 });
    getGiftCardList({ cardCode: "all" });
  }, [getAllGiftCard, getGiftCardList]);
  useEffect(() => {
    if (declineGiftCardTransaction && isModalVisible) {
      setIsModalVisible(false);
    }
    // eslint-disable-next-line
  }, [declineGiftCardTransaction]);
  useEffect(() => {
    if (approveGiftCardTransaction && isModalVisible) {
      setIsModalVisible(false);
    }
    // eslint-disable-next-line
  }, [approveGiftCardTransaction]);

  const handleAction = (id) => {
    setIsModalVisible(true);
    getGiftCardById({ transactionId: id });
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
      title: "Amount in BTC",
      dataIndex: "amount",
    },
    {
      title: "Transaction Type",
      dataIndex: "transactionType",
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Rate",
      dataIndex: "rate",
      render: (rate) => <span>{rate.amount}</span>,
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

  // const [for m] = Form.useForm();

  return (
    <div>
      <UserModal />
      {isModalVisible && (
        <ModalWrapper
          isModalVisible={
            BTCDetails && BTCDetails.transaction
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
                  {BTCDetails &&
                    BTCDetails.transaction &&
                    BTCDetails.transaction.status}
                </span>
              </p>
              <strong>Reference:</strong>{" "}
              <span>
                {BTCDetails &&
                  BTCDetails.transaction &&
                  BTCDetails.transaction.reference}
              </span>
            </div>
            <div style={{ margin: 10 }}>
              <List.Item>
                <List.Item.Meta
                  title={"Date Created"}
                  description={date(
                    BTCDetails &&
                      BTCDetails.transaction &&
                      BTCDetails.transaction.createdAt
                  )}
                />
              </List.Item>
              <List.Item>
                <List.Item.Meta
                  title={"ID"}
                  description={
                    BTCDetails &&
                    BTCDetails.transaction &&
                    BTCDetails.transaction.id
                  }
                />
              </List.Item>
              <List.Item>
                <List.Item.Meta
                  title={"Quidax Withdrawal Id"}
                  description={
                    BTCDetails &&
                    BTCDetails.transaction &&
                    BTCDetails.transaction.quidaxWithdrawalId
                  }
                />
              </List.Item>
              <List.Item>
                <List.Item.Meta
                  title={"Amount in BTC"}
                  description={
                    BTCDetails &&
                      BTCDetails.transaction &&
                      BTCDetails.transaction.amount}
                />
              </List.Item>
              <List.Item>
                <List.Item.Meta
                  title={"Rate"}
                  description={
                    BTCDetails &&
                      BTCDetails.transaction &&
                      BTCDetails.transaction.rate.amount}
                />
              </List.Item>
              <List.Item>
                <List.Item.Meta
                  title={"Transaction Fee"}
                  description={
                    BTCDetails &&
                      BTCDetails.transaction &&
                      BTCDetails.transaction.transactionFee}
                />
              </List.Item>
              <List.Item>
                <List.Item.Meta
                  title={"Transaction Type"}
                  description={
                    BTCDetails &&
                      BTCDetails.transaction &&
                      BTCDetails.transaction.transactionType}
                />
              </List.Item>
              <List.Item>
                <List.Item.Meta
                  title={"Type"}
                  description={
                    BTCDetails &&
                      BTCDetails.transaction &&
                      BTCDetails.transaction.type}
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
                          BTCDetails &&
                            BTCDetails.transaction &&
                            BTCDetails.transaction.userId
                        )
                      }
                    >
                      {BTCDetails &&
                        BTCDetails.transaction &&
                        BTCDetails.transaction.userId}
                    </p>
                  }
                />
              </List.Item>
            </div>
          </div>
        </ModalWrapper>
      )}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <Title level={2}>Gift Card</Title>
        <Button type="primary" onClick={showDrawer}>
          Edit BTC Transaction Settings
        </Button>
      </div>
      <Drawer
        title="Edit BTC Transaction Settings"
        placement="right"
        closable={false}
        onClose={onClose}
        width={350}
        visible={visible}
      >
        <div>
        nbhjkl
        </div>
      </Drawer>
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
                  <span>All Gift Card</span>
                </div>
              }
              key="2"
            >
              <DataTable
                columns={columns}
                transaction={BTCTransaction}
                fetchTrans={getAllGiftCard}
                title={"Gift Card"}
                data={BTCTransaction && BTCTransaction.transactions}
              />
            </TabPane>
          </Tabs>
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (state) => ({
  loading: state.btc.loading,
  BTCTransaction: state.btc.BTCTransaction,
  BTCDetails: state.btc.BTCDetails,
  selectedUser: state.users.userById,
  BTCTransactionSettings: state.btc.BTCTransactionSettings,
});

const mapDispatchToProps = (dispatch) => ({
  getAllGiftCard: (data) => {
    dispatch(getAllBTCTransactions(data));
  },
  getGiftCardById: (data) => {
    dispatch(getBTCTransactionsById(data));
  },
  getUserDetailsById: (userId) => {
    dispatch(getUserDetailsById(userId));
  },
  getGiftCardList: (data) => {
    dispatch(getBTCSettings(data));
  },
  updateBTCSettings: (data) => {
    dispatch(updateBTCSettings(data));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(BTC);
