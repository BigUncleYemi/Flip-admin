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
  Image,
  Drawer,
  Switch,
  Form,
  Modal,
  Select as AntSelect
} from "antd";
import { ExclamationCircleOutlined } from '@ant-design/icons';
import {
  date,
  Money,
  sortData,
  countryOptions,
  DigitalAsset,
  cardOptions,
} from "utils/helper";
import styles from "../../styles.module.scss";
import DataTable from "components/layout-components/DataTable";
import ModalWrapper from "components/layout-components/Modal";
import { getUserDetailsById } from "redux/actions/user";
import {
  approveGiftCardTransaction,
  declineGiftCardTransaction,
  getAllGiftCardsTransactions,
  getGiftCardTransactionsById,
  getNewGiftCardsTransactions,
  getGiftCardCodes,
  updateGiftCardsSettings,
} from "redux/actions/giftCard";
import Select from "components/select";

const { confirm } = Modal;
const { Option } = AntSelect;

const rules = {
  min: [
    {
      required: true,
      message: "Please enter an input",
    },
  ],
  max: [
    {
      required: true,
      message: "Please enter an input",
    },
  ],
  NGN: [
    {
      required: true,
      message: "Please enter an input",
    },
  ],
  GHS: [
    {
      required: true,
      message: "Please enter an input",
    },
  ],
  isAvailable: [
    {
      required: true,
      message: "Please enter an input",
    },
  ],
};

const GiftCard = ({
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
  updateGiftCardsSettings,
}) => {
  const { TabPane } = Tabs;
  const { Title } = Typography;
  const { TextArea } = Input;
  const [isUserModalVisible, setUserIsModalVisible] = useState(false);
  const [comment, setComment] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [visible, setVisible] = useState(false);
  const [meta, setMeta] = useState(null);
  const [avaCurr, setAvaCurr] = useState([]);
  const [avaCard, setAvaCard] = useState([]);
  const [debitWallet, setDebitWallet] = useState("");
  const [Trigger, setTrigger] = useState(false);
  const [state, setState] = useState({
    btc: 0,
    usd: 0,
    ngn: 0,
    ghs: 0,
    country: "",
    cardType: "",
    asset: "",
    assetValue: "",
    amount: 0,
    total: 0,
  });
  let b = giftCardList;
  let list = sortData(b).map((i) => i[0]);
  const onAssetChange = (value) => {
    if (value !== "BTC") {
      let a = DigitalAsset.find((item) => item.value === value)?.name;
      setAvaCurr(Object.keys(b[a]).map((key) => key));
    }
    setState((state) => ({
      ...state,
      asset: value,
      assetValue: DigitalAsset.find((item) => item.value === value)?.name,
      country: "",
      cardType: "",
      amount: 0,
      total: 0,
    }));
    setMeta(null);
  };
  const onCountryChange = (value) => {
    if (value) {
      let a = DigitalAsset.find((item) => item.value === state.asset)?.name;
      setAvaCard(Object.keys(b[a][value.toLowerCase()]).map((key) => key));
    }
    setState((state) => ({
      ...state,
      country: value,
      cardType: "",
      amount: 0,
      total: 0,
    }));
    setMeta(null);
  };
  const onCardTypeChange = (value) => {
    let a = DigitalAsset.find((item) => item.value === state.asset)?.name;
    setMeta(b[a][state.country.toLowerCase()][value][0]);
    setState((state) => ({ ...state, cardType: value, amount: 0, total: 0 }));
  };
  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
    onCountryChange("");
  };
  function callback(key) {
    console.log(key);
  }
  useEffect(() => {
    if(Trigger) {
      setIsModalVisible(true);
      approveGiftCard({
        transactionId:
          giftCardDetails &&
          giftCardDetails.transaction &&
          giftCardDetails.transaction.id,
          debitWallet,
      });
      getAllGiftCard({ skip: 0, limit: 10 });
      getNewGiftCard({ skip: 0, limit: 10 });
      setTrigger(false)
    }
    // eslint-disable-next-line
  }, [Trigger, ])
  useEffect(() => {
    getAllGiftCard({ skip: 0, limit: 10 });
    getNewGiftCard({ skip: 0, limit: 10 });
    getGiftCardList({ cardCode: "all" });
  }, [getAllGiftCard, getNewGiftCard, getGiftCardList]);
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
      title: "Amount",
      dataIndex: "amount",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
    },
    {
      title: "Card Code",
      dataIndex: "cardCode",
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

  const handleApproval = () => {
    confirm({
      title: `Please select wallet to complete the action with.`,
      icon: <ExclamationCircleOutlined />,
      content: (
        <div>
          <AntSelect onChange={(value) => setDebitWallet(value)} style={{ width: "100%" }} >
            <Option value="NGN">NGN Wallet</Option>
            <Option value="GHS">GHS Wallet</Option>
          </AntSelect>
        </div>
      ),
      onOk() {
        setTrigger(true)
      },
      onCancel() {
        console.log('Cancel');
      },
    });
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
  const [form] = Form.useForm();

  const onSignUp = () => {
    form
      .validateFields()
      .then((values) => {
        let data = {
          cardCode: `${state.assetValue}.${state.country.toLowerCase()}.${
            state.cardType
          }`,
          rates: [
            {
              min: values.min,
              max: values.max,
              rate: {
                NGN: values.NGN,
                GHS: values.GHS,
              },
              isAvailable: values.isAvailable,
            },
          ],
        };
        updateGiftCardsSettings(data);
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

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
                  title={"Card Code"}
                  description={
                    giftCardDetails &&
                    giftCardDetails.transaction &&
                    giftCardDetails.transaction.cardCode
                  }
                />
              </List.Item>
              <List.Item>
                <List.Item.Meta
                  title={"Amount"}
                  description={Money(
                    giftCardDetails &&
                      giftCardDetails.transaction &&
                      giftCardDetails.transaction.amount,
                    (giftCardDetails &&
                      giftCardDetails.transaction &&
                      giftCardDetails.transaction.cardCode.split(".")[1]) ||
                      "ngn"
                  )}
                />
              </List.Item>
              <List.Item>
                <List.Item.Meta
                  title={"Quantity"}
                  description={
                    giftCardDetails &&
                    giftCardDetails.transaction &&
                    giftCardDetails.transaction.quantity
                  }
                />
              </List.Item>
              <List.Item>
                <List.Item.Meta
                  title={"Rate"}
                  description={Money(
                    giftCardDetails &&
                      giftCardDetails.transaction &&
                      giftCardDetails.transaction.rate.amount,
                    "NGN"
                  )}
                />
              </List.Item>
              <List.Item>
                <List.Item.Meta
                  title={"Image"}
                  description={
                    <div
                      style={{
                        width: "100%",
                        overflowX: "auto",
                        display: "flex",
                        maxHeight: 300,
                      }}
                    >
                      {giftCardDetails &&
                        giftCardDetails.transaction &&
                        giftCardDetails.transaction.images.map((i, index) => (
                          <Image
                            style={{ width: 150, height: "100%", margin: 15 }}
                            key={index}
                            src={i}
                            alt={`card-${index}`}
                          />
                        ))}
                    </div>
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
        <Title level={2}>Sell Gift Card</Title>
        <Button type="primary" onClick={showDrawer}>
          Edit Gift Card Rate
        </Button>
      </div>
      <Drawer
        title="View Gift Cards"
        placement="right"
        closable={false}
        onClose={onClose}
        width={350}
        visible={visible}
      >
        <div>
          <Select
            options={DigitalAsset.filter(
              (it) => list.filter((i) => i === it.name).length > 0
            )}
            value={state.asset}
            onSelect={onAssetChange}
            label="Select Card"
            labelClass={styles.label}
            className={`${styles.rate__selector__content__input} ${styles.countryInput}`}
          />
          <Select
            options={countryOptions.filter(
              (it) =>
                avaCurr &&
                avaCurr.filter((i) => it.value.toLowerCase().includes(i))
                  .length > 0
            )}
            value={state.country}
            onSelect={onCountryChange}
            label="Select Country Currency"
            labelClass={styles.label}
            className={`${styles.rate__selector__content__input} ${styles.countryInput}`}
          />
          <Select
            options={cardOptions.filter(
              (it) =>
                avaCard &&
                avaCard.filter((i) => it.value.includes(i)).length > 0
            )}
            value={state.cardType}
            onSelect={onCardTypeChange}
            label="Select Card Type"
            labelClass={styles.label}
            className={`${styles.rate__selector__content__input} ${styles.countryInput}`}
          />
          {meta && meta.max && (
            <Form
              form={form}
              layout="vertical"
              name="register-form"
              onFinish={onSignUp}
              initialValues={{
                min: meta.min,
                max: meta.max,
                NGN: meta.rate.NGN,
                GHS: meta.rate.GHS,
                isAvailable: meta.isAvailable,
              }}
            >
              <Form.Item
                name="min"
                label="Minium Tradable value"
                rules={rules.min}
                hasFeedback
              >
                <Input type="number" />
              </Form.Item>
              <Form.Item
                name="max"
                label="Maximum Tradable value"
                rules={rules.max}
                hasFeedback
              >
                <Input type="number" />
              </Form.Item>
              <Form.Item
                name="NGN"
                label="Rate in GHS"
                rules={rules.GHS}
                hasFeedback
              >
                <Input type="number" />
              </Form.Item>
              <Form.Item
                name="NGN"
                label="Rate in Naira"
                rules={rules.NGN}
                hasFeedback
              >
                <Input type="number" />
              </Form.Item>
              <Form.Item
                name="isAvailable"
                label="Available"
                rules={rules.isAvailable}
                valuePropName="checked"
                hasFeedback
              >
                <Switch />
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  block
                  loading={loading}
                >
                  Update Gift Card
                </Button>
              </Form.Item>
            </Form>
          )}
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
  loading: state.giftCard.loading,
  giftCard: state.giftCard.giftCard,
  newGiftCard: state.giftCard.newGiftCard,
  giftCardDetails: state.giftCard.giftCardDetails,
  selectedUser: state.users.userById,
  declineGiftCardTransaction: state.giftCard.declineGiftCardTransaction,
  approveGiftCardTransaction: state.giftCard.approveGiftCardTransaction,
  giftCardList: state.giftCard.giftCardList,
});

const mapDispatchToProps = (dispatch) => ({
  getAllGiftCard: (data) => {
    dispatch(getAllGiftCardsTransactions(data));
  },
  getNewGiftCard: (data) => {
    dispatch(getNewGiftCardsTransactions(data));
  },
  getGiftCardById: (data) => {
    dispatch(getGiftCardTransactionsById(data));
  },
  approveGiftCard: (data) => {
    dispatch(approveGiftCardTransaction(data));
  },
  declineGiftCard: (data) => {
    dispatch(declineGiftCardTransaction(data));
  },
  getUserDetailsById: (userId) => {
    dispatch(getUserDetailsById(userId));
  },
  getGiftCardList: (data) => {
    dispatch(getGiftCardCodes(data));
  },
  updateGiftCardsSettings: (data) => {
    dispatch(updateGiftCardsSettings(data));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(GiftCard);
