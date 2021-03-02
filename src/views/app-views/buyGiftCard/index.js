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
  Drawer,
  // Switch,
  // Form,
} from "antd";
import { date, Money } from "utils/helper";
import styles from "../../styles.module.scss";
import DataTable from "components/layout-components/DataTable";
import ModalWrapper from "components/layout-components/Modal";
import { getUserDetailsById } from "redux/actions/user";
import {
  // approveGiftCardTransaction,
  // declineGiftCardTransaction,
  getAllBuyGiftCardTransactions,
  getBuyGiftCardTransactionsById,
  getNewBuyGiftCardTransactions,
  getBuyGiftCardSettings,
  updateBuyGiftCardSettings,
} from "redux/actions/buyGiftCard";
// import Select from "components/select";

// const rules = {
//   min: [
//     {
//       required: true,
//       message: "Please enter an input",
//     },
//   ],
//   max: [
//     {
//       required: true,
//       message: "Please enter an input",
//     },
//   ],
//   NGN: [
//     {
//       required: true,
//       message: "Please enter an input",
//     },
//   ],
//   GHS: [
//     {
//       required: true,
//       message: "Please enter an input",
//     },
//   ],
//   isAvailable: [
//     {
//       required: true,
//       message: "Please enter an input",
//     },
//   ],
// };

const BuyGiftCard = ({
  getAllGiftCard,
  getNewGiftCard,
  getGiftCardById,
  approveGiftCard,
  declineGiftCard,
  giftCard,
  newGiftCard,
  giftCardDetails,
  getUserDetailsById,
  declineGiftCardTransaction,
  approveGiftCardTransaction,
  selectedUser,
  getGiftCardList,
  giftCardList,
  loading,
  updateBuyGiftCardSettings,
}) => {
  const { TabPane } = Tabs;
  const { Title } = Typography;
  const { TextArea } = Input;
  const [isUserModalVisible, setUserIsModalVisible] = useState(false);
  const [comment, setComment] = useState("");
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
    getNewGiftCard({ skip: 0, limit: 10 });
    getGiftCardList({ cardCode: "all" });
  }, [getAllGiftCard, getNewGiftCard, getGiftCardList]);

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
      title: "Card Ordered",
      dataIndex: "cardSlug",
      render: (cardSlug, rec) => (
        <span>
          Ordered: {cardSlug.replace("-", " ").replace("_", " ")}
          <br />
          Quantity: {rec.cardDetails && rec.cardDetails.quantity}
        </span>
      ),
    },
    {
      title: "Card Amount | USD Amount",
      dataIndex: "cardDetails",
      render: (cardDetails) => (
        <span>
          {cardDetails && cardDetails.cardCurrency}
          {cardDetails && cardDetails.cardValue} | USD
          {cardDetails && cardDetails.estimatedUSDValue.amount}
        </span>
      ),
    },
    {
      title: "Wallet",
      dataIndex: "referenceCurrency",
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
        <span style={{ cursor: "pointer" }} onClick={() => handleAction(id)}>
          View Details
        </span>
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
    approveGiftCard({
      transactionId:
        giftCardDetails &&
        giftCardDetails.transaction &&
        giftCardDetails.transaction.id,
    });
    getAllGiftCard({ skip: 0, limit: 10 });
    getNewGiftCard({ skip: 0, limit: 10 });
  };

  const handleDecline = () => {
    setIsModalVisible(true);
    declineGiftCard({
      transactionId:
        giftCardDetails &&
        giftCardDetails.transaction &&
        giftCardDetails.transaction.id,
      comment,
    });
    getAllGiftCard({ skip: 0, limit: 10 });
    getNewGiftCard({ skip: 0, limit: 10 });
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
  // const [form] = Form.useForm();

  // const onSignUp = () => {
  //   form
  //     .validateFields()
  //     .then((values) => {
  //       let data = {
  //         cardCode: `${state.assetValue}.${state.country.toLowerCase()}.${
  //           state.cardType
  //         }`,
  //         rates: [
  //           {
  //             min: values.min,
  //             max: values.max,
  //             rate: {
  //               NGN: values.NGN,
  //               GHS: values.GHS,
  //             },
  //             isAvailable: values.isAvailable,
  //           },
  //         ],
  //       };
  //       updateBuyGiftCardSettings(data);
  //     })
  //     .catch((info) => {
  //       console.log("Validate Failed:", info);
  //     });
  // };

  return (
    <div>
      <UserModal />
      {isModalVisible && (
        <ModalWrapper
          isModalVisible={
            giftCardDetails && giftCardDetails.transaction
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
                  {giftCardDetails &&
                    giftCardDetails.transaction &&
                    giftCardDetails.transaction.status}
                </span>
              </p>
              <strong>Reference:</strong>{" "}
              <span>
                {giftCardDetails &&
                  giftCardDetails.transaction &&
                  giftCardDetails.transaction.reference}
              </span>
            </div>
            <div style={{ margin: 10 }}>
              <List.Item>
                <List.Item.Meta
                  title={"Date Created"}
                  description={date(
                    giftCardDetails &&
                      giftCardDetails.transaction &&
                      giftCardDetails.transaction.createdAt
                  )}
                />
              </List.Item>
              <List.Item>
                <List.Item.Meta
                  title={"ID"}
                  description={
                    giftCardDetails &&
                    giftCardDetails.transaction &&
                    giftCardDetails.transaction.id
                  }
                />
              </List.Item>
              <List.Item>
                <List.Item.Meta
                  title={"Card Slug"}
                  description={
                    giftCardDetails &&
                    giftCardDetails.transaction &&
                    giftCardDetails.transaction.cardSlug
                  }
                />
              </List.Item>
              <List.Item>
                <List.Item.Meta
                  title={"Quantity"}
                  description={
                    giftCardDetails &&
                    giftCardDetails.transaction &&
                    giftCardDetails.transaction.cardDetails.quantity
                  }
                />
              </List.Item>
              <List.Item>
                <List.Item.Meta
                  title={"Total Estimated Amount"}
                  description={Money(
                    giftCardDetails &&
                      giftCardDetails.transaction &&
                      giftCardDetails.transaction.totalEstimatedAmount,
                    (giftCardDetails &&
                      giftCardDetails.transaction &&
                      giftCardDetails.transaction.referenceCurrency) ||
                      "usd"
                  )}
                />
              </List.Item>
              <List.Item>
                <List.Item.Meta
                  title={"Estimated USD Amount"}
                  description={Money(
                    giftCardDetails &&
                      giftCardDetails.transaction &&
                      giftCardDetails.transaction.cardDetails
                        .estimatedUSDValue &&
                      giftCardDetails.transaction.cardDetails.estimatedUSDValue
                        .amount,
                    "usd"
                  )}
                />
              </List.Item>
              <List.Item>
                <List.Item.Meta
                  title={"Card Currency"}
                  description={
                    giftCardDetails &&
                    giftCardDetails.transaction &&
                    giftCardDetails.transaction.cardDetails.cardCurrency
                  }
                />
              </List.Item>
              <List.Item>
                <List.Item.Meta
                  title={"Card Value"}
                  description={
                    giftCardDetails &&
                    giftCardDetails.transaction &&
                    giftCardDetails.transaction.cardDetails.cardValue
                  }
                />
              </List.Item>
              <List.Item>
                <List.Item.Meta
                  title={"Card Amount"}
                  description={
                    giftCardDetails &&
                    giftCardDetails.transaction &&
                    giftCardDetails.transaction.cardDetails.cardAmount &&
                    giftCardDetails.transaction.cardDetails.cardAmount.toString()
                  }
                />
              </List.Item>
              <List.Item>
                <List.Item.Meta
                  title={"is Custom ?"}
                  description={
                    giftCardDetails &&
                    giftCardDetails.transaction &&
                    giftCardDetails.transaction.cardDetails.isCustom
                      ? "Yes"
                      : "No"
                  }
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
                          giftCardDetails &&
                            giftCardDetails.transaction &&
                            giftCardDetails.transaction.userId
                        )
                      }
                    >
                      {giftCardDetails &&
                        giftCardDetails.transaction &&
                        giftCardDetails.transaction.userId}
                    </p>
                  }
                />
              </List.Item>
            </div>
            {giftCardDetails &&
              giftCardDetails.transaction &&
              giftCardDetails.transaction.status === "SUBMITTED" && (
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
      )}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <Title level={2}>Buy Gift Card</Title>
        <Button type="primary" onClick={showDrawer}>
          Edit Gift Card Rate
        </Button>
      </div>
      <Drawer
        title="Buy Gift Cards Settings"
        placement="right"
        closable={false}
        onClose={onClose}
        width={350}
        visible={visible}
      >
        <div>settings</div>
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
                  <span>New Submitted Gift Card</span>
                </div>
              }
              key="1"
            >
              <DataTable
                columns={columns}
                transaction={newGiftCard}
                fetchTrans={getNewGiftCard}
                title={"New Submitted Withdrawal"}
                data={newGiftCard && newGiftCard.transactions}
              />
            </TabPane>
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
                transaction={giftCard}
                fetchTrans={getAllGiftCard}
                title={"Gift Card"}
                data={giftCard && giftCard.transactions}
              />
            </TabPane>
          </Tabs>
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (state) => ({
  loading: state.buyGiftCard.loading,
  giftCard: state.buyGiftCard.BuyGiftCards,
  newGiftCard: state.buyGiftCard.newBuyGiftCard,
  giftCardDetails: state.buyGiftCard.BuyGiftCardDetails,
  BuyGiftCardTransactionSettings:
    state.buyGiftCard.BuyGiftCardTransactionSettings,
  selectedUser: state.users.userById,
  declineGiftCardTransaction: state.giftCard.declineGiftCardTransaction, //
  approveGiftCardTransaction: state.giftCard.approveGiftCardTransaction, //
  giftCardList: state.giftCard.giftCardList, //
});

const mapDispatchToProps = (dispatch) => ({
  getAllGiftCard: (data) => {
    dispatch(getAllBuyGiftCardTransactions(data));
  },
  getNewGiftCard: (data) => {
    dispatch(getNewBuyGiftCardTransactions(data));
  },
  getGiftCardById: (data) => {
    dispatch(getBuyGiftCardTransactionsById(data));
  },
  approveGiftCard: (data) => {
    // dispatch(approveGiftCardTransaction(data));
  },
  declineGiftCard: (data) => {
    // dispatch(declineGiftCardTransaction(data));
  },
  getUserDetailsById: (userId) => {
    dispatch(getUserDetailsById(userId));
  },
  getGiftCardList: (data) => {
    dispatch(getBuyGiftCardSettings(data));
  },
  updateBuyGiftCardSettings: (data) => {
    dispatch(updateBuyGiftCardSettings(data));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(BuyGiftCard);
