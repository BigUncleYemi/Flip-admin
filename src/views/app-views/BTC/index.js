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
  Input,
  // Image,
  Drawer,
  Divider,
  Form,
  Switch,
  Select,
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
  getBTCSettings,
  updateBTCSettings,
  getBuyCoinTransactions,
  getSellCoinTransactions,
  getSendCoinTransactions,
  getBuyCoinTransactionsById,
  getSellCoinTransactionsById,
  getSendCoinTransactionsById,
  getP2PCoinTransactions,
  getP2PCoinTransactionsById,
} from "redux/actions/btc";
import { MailOutlined, PayCircleOutlined } from "@ant-design/icons";

const { Option } = Select;

const ActionType = ["SUBMITTED", "ALL"];

const convertToProperName = (name) => {
  return name
    .split("_")
    .map((word) => `${word[0].toUpperCase()}${word.slice(1)}`)
    .join(" ");
};

const BTC = ({
  getAllBuyTrans,
  getAllSellTrans,
  getAllSendTrans,
  getAllP2PTrans,
  getBuyTransById,
  getSellTransById,
  getSendTransById,
  getP2PTransById,
  // getBTCTransById,
  buyTransactions,
  sellTransactions,
  sendTransactions,
  p2pTransactions,
  buyDetails,
  sellDetails,
  sendDetails,
  p2pDetails,
  BTCDetails,
  getUserDetailsById,
  selectedUser,
  updateBTCSettings,
  getBTCTransSettings,
  loading,
  buyTransactionsSettings,
}) => {
  const { TabPane } = Tabs;
  const { Title } = Typography;
  const [isUserModalVisible, setUserIsModalVisible] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isAddNewModalVisible, setIsAddNewModalVisible] = useState(false);
  const [visible, setVisible] = useState(false);
  const [actionTypeSel, setActionTypeSel] = useState("");
  const [buypagination, setBuyPagination] = useState({
    current: 1,
    pageSize:
      buyTransactions && buyTransactions.meta && buyTransactions.meta.limit,
    total:
      buyTransactions && buyTransactions.meta && buyTransactions.meta.count,
  });
  const [sellactionTypeSel, setSellActionTypeSel] = useState("");
  const [sellpagination, setSellPagination] = useState({
    current: 1,
    pageSize:
      sellTransactions && sellTransactions.meta && sellTransactions.meta.limit,
    total:
      sellTransactions && sellTransactions.meta && sellTransactions.meta.count,
  });
  const [sendactionTypeSel, setSendActionTypeSel] = useState("");
  const [sendpagination, setSendPagination] = useState({
    current: 1,
    pageSize:
      sendTransactions && sendTransactions.meta && sendTransactions.meta.limit,
    total:
      sendTransactions && sendTransactions.meta && sendTransactions.meta.count,
  });
  const [p2pactionTypeSel, setP2PActionTypeSel] = useState("");
  const [p2ppagination, setP2PPagination] = useState({
    current: 1,
    pageSize:
      p2pTransactions && p2pTransactions.meta && p2pTransactions.meta.limit,
    total:
      p2pTransactions && p2pTransactions.meta && p2pTransactions.meta.count,
  });
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
    getAllBuyTrans({ skip: 0, limit: 10 });
    getBTCTransSettings({ cardCode: "all" });
  }, [getAllBuyTrans, getBTCTransSettings]);

  const handleAction = (id) => {
    setIsModalVisible(true);
    getBuyTransById({ transactionId: id });
  };

  const onSubmit = ({ email }) => {
    console.log(email)
  };

  // buy coin sorting
  function handleTypeChange(value) {
    console.log(`selected ${value}`);
    setActionTypeSel(value);
  }
  useEffect(() => {
    getAllBuyTrans({
      skip: 0,
      limit: buypagination.pageSize,
      status: actionTypeSel,
    });
    // eslint-disable-next-line
  }, [actionTypeSel, buypagination]);

  // Sell crypto sorting
  function handleSellTypeChange(value) {
    console.log(`selected ${value}`);
    setSellActionTypeSel(value);
  }
  useEffect(() => {
    getAllSellTrans({
      skip: 0,
      limit: sellpagination.pageSize,
      status: sellactionTypeSel,
    });
    // eslint-disable-next-line
  }, [sellactionTypeSel, sellpagination]);

  // Send crypto sorting
  function handleSendTypeChange(value) {
    console.log(`selected ${value}`);
    setSendActionTypeSel(value);
  }
  useEffect(() => {
    getAllSendTrans({
      skip: 0,
      limit: sendpagination.pageSize,
      status: sendactionTypeSel,
    });
    // eslint-disable-next-line
  }, [sendactionTypeSel, sendpagination]);

  // P2P crypto sorting
  function handleP2PTypeChange(value) {
    console.log(`selected ${value}`);
    setP2PActionTypeSel(value);
  }
  useEffect(() => {
    getAllP2PTrans({
      skip: 0,
      limit: p2ppagination.pageSize,
      status: p2pactionTypeSel,
    });
    // eslint-disable-next-line
  }, [p2pactionTypeSel, p2ppagination]);

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

  const [form] = Form.useForm();

  const onFinish = (value) => {
    const data = {
      updateBody: {
        availability: {
          buy: {
            value: value.availabilityBuyValue,
            minVolume: value.availabilityBuyMinVolume,
            maxVolume: value.availabilityBuyMaxVolume,
          },
          sell: {
            value: value.availabilitySellValue,
            minVolume: value.availabilitySellMinVolume,
            maxVolume: value.availabilitySellMaxVolume,
          },
        },
        conversionRates: {
          buy: [
            {
              value: {
                NGN: value.conversionRatesBuyLowValueNGN,
                GHS: value.conversionRatesBuyLowValueGHS,
              },
              minVolume: value.conversionRatesBuyLowMinVolume,
              maxVolume: value.conversionRatesBuyLowMaxVolume,
            },
            {
              value: {
                NGN: value.conversionRatesBuyHighValueNGN,
                GHS: value.conversionRatesBuyHighValueGHS,
              },
              minVolume: value.conversionRatesBuyHighMinVolume,
              maxVolume: value.conversionRatesBuyHighMaxVolume,
            },
          ],
          sell: [
            {
              value: {
                NGN: value.conversionRatesSellValueNGN,
                GHS: value.conversionRatesSellValueGHS,
              },
              minVolume: value.conversionRatesSellMinVolume,
              maxVolume: value.conversionRatesSellMaxVolume,
            },
          ],
        },
      },
    };
    updateBTCSettings({ ...data });
  };

  return (
    <div>
      {/* <UserModal /> */}
      <ModalWrapper
        isModalVisible={isAddNewModalVisible}
        setIsModalVisible={setIsAddNewModalVisible}
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
          <p>Please enter the name of the coin to add</p>
          <Form.Item
            name="email"
            label="Crypto"
            hasFeedback
            required
            rules={[
              {
                required: true,
                message: "Please input your email",
              },
            ]}
          >
            <Input prefix={<PayCircleOutlined className="text-primary" />} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={loading}>
              Add Crypto
            </Button>
          </Form.Item>
        </Form>
      </ModalWrapper>
      {isModalVisible && (
        <ModalWrapper
          isModalVisible={
            BTCDetails && BTCDetails.transaction ? isModalVisible : false
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
                    BTCDetails.transaction.amount
                  }
                />
              </List.Item>
              <List.Item>
                <List.Item.Meta
                  title={"Rate"}
                  description={
                    BTCDetails &&
                    BTCDetails.transaction &&
                    BTCDetails.transaction.rate.amount
                  }
                />
              </List.Item>
              <List.Item>
                <List.Item.Meta
                  title={"Transaction Fee"}
                  description={
                    BTCDetails &&
                    BTCDetails.transaction &&
                    BTCDetails.transaction.transactionFee
                  }
                />
              </List.Item>
              <List.Item>
                <List.Item.Meta
                  title={"Transaction Type"}
                  description={
                    BTCDetails &&
                    BTCDetails.transaction &&
                    BTCDetails.transaction.transactionType
                  }
                />
              </List.Item>
              <List.Item>
                <List.Item.Meta
                  title={"Type"}
                  description={
                    BTCDetails &&
                    BTCDetails.transaction &&
                    BTCDetails.transaction.type
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
          marginBottom:20
        }}
      >
        <Title level={2}>Crypto</Title>
        <div style={{}}>
        <Button type="primary" onClick={()=> setIsAddNewModalVisible(true)} style={{marginRight:20}}>
          Add New Crypto
        </Button>

        <Button type="primary" onClick={showDrawer}>
          Crypto Transaction Settings
        </Button>
        </div>
      </div>
      <Drawer
        title="Edit BTC Transaction Settings"
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
          initialValues={{
            availabilityBuyMaxVolume:
              buyTransactionsSettings &&
              buyTransactionsSettings.availability.buy.maxVolume,
            availabilityBuyMinVolume:
              buyTransactionsSettings &&
              buyTransactionsSettings.availability.buy.minVolume,
            availabilityBuyValue:
              buyTransactionsSettings &&
              buyTransactionsSettings.availability.buy.value,
            availabilitySellMaxVolume:
              buyTransactionsSettings &&
              buyTransactionsSettings.availability.sell.maxVolume,
            availabilitySellMinVolume:
              buyTransactionsSettings &&
              buyTransactionsSettings.availability.sell.minVolume,
            availabilitySellValue:
              buyTransactionsSettings &&
              buyTransactionsSettings.availability.sell.value,
            conversionRatesBuyHighMaxVolume:
              buyTransactionsSettings &&
              buyTransactionsSettings.conversionRates.buy[0].maxVolume,
            conversionRatesBuyHighMinVolume:
              buyTransactionsSettings &&
              buyTransactionsSettings.conversionRates.buy[0].minVolume,
            conversionRatesBuyHighValueGHS:
              buyTransactionsSettings &&
              buyTransactionsSettings.conversionRates.buy[0].value.GHS,
            conversionRatesBuyHighValueNGN:
              buyTransactionsSettings &&
              buyTransactionsSettings.conversionRates.buy[0].value.NGN,
            conversionRatesBuyLowMaxVolume:
              buyTransactionsSettings &&
              buyTransactionsSettings.conversionRates.buy[1].maxVolume,
            conversionRatesBuyLowMinVolume:
              buyTransactionsSettings &&
              buyTransactionsSettings.conversionRates.buy[1].minVolume,
            conversionRatesBuyLowValueGHS:
              buyTransactionsSettings &&
              buyTransactionsSettings.conversionRates.buy[1].value.GHS,
            conversionRatesBuyLowValueNGN:
              buyTransactionsSettings &&
              buyTransactionsSettings.conversionRates.buy[1].value.NGN,
            conversionRatesSellMaxVolume:
              buyTransactionsSettings &&
              buyTransactionsSettings.conversionRates.sell[0].maxVolume,
            conversionRatesSellMinVolume:
              buyTransactionsSettings &&
              buyTransactionsSettings.conversionRates.sell[0].minVolume,
            conversionRatesSellValueGHS:
              buyTransactionsSettings &&
              buyTransactionsSettings.conversionRates.sell[0].value.GHS,
            conversionRatesSellValueNGN:
              buyTransactionsSettings &&
              buyTransactionsSettings.conversionRates.sell[0].value.NGN,
          }}
        >
          <Title level={3}>Availability</Title>
          <Form.Item
            name="availabilityBuyMaxVolume"
            label="Availability Buy Max Volume"
            rules={[
              {
                required: true,
                message: "Please input your Availability Buy Max Volume",
              },
            ]}
            hasFeedback
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            name="availabilityBuyMinVolume"
            label="Availability Buy Min Volume"
            rules={[
              {
                required: true,
                message: "Please input your Availability Buy Max Volume",
              },
            ]}
            hasFeedback
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            name="availabilityBuyValue"
            label="Availability Buy Value"
            rules={[
              {
                required: true,
                message: "Please input your Availability Buy Value",
              },
            ]}
            valuePropName="checked"
            hasFeedback
          >
            <Switch />
          </Form.Item>
          <Form.Item
            name="availabilitySellMaxVolume"
            label="Availability Sell Max Volume"
            rules={[
              {
                required: true,
                message: "Please input your Availability Sell Max Volume",
              },
            ]}
            hasFeedback
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            name="availabilitySellMinVolume"
            label="Availability Sell Min Volume"
            rules={[
              {
                required: true,
                message: "Please input your Availability Sell Min Volume",
              },
            ]}
            hasFeedback
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            name="availabilitySellValue"
            label="Availability Sell Value"
            rules={[
              {
                required: true,
                message: "Please input your Availability Sell Value",
              },
            ]}
            valuePropName="checked"
            hasFeedback
          >
            <Switch />
          </Form.Item>
          <Divider />
          <Title level={3}>Conversion Rate</Title>
          <Title level={5}>Buy low</Title>
          <Form.Item
            name="conversionRatesBuyLowMaxVolume"
            label="Conversion Rates Buy Low Max Volume"
            rules={[
              {
                required: true,
                message:
                  "Please input your Conversion Rates Buy Low Max Volume",
              },
            ]}
            hasFeedback
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            name="conversionRatesBuyLowMinVolume"
            label="Conversion Rates Buy Low Min Volume"
            rules={[
              {
                required: true,
                message:
                  "Please input your Conversion Rates Buy Low Min Volume",
              },
            ]}
            hasFeedback
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            name="conversionRatesBuyLowValueGHS"
            label="Conversion Rates Buy Low Value GHS"
            rules={[
              {
                required: true,
                message: "Please input your Conversion Rates Buy Low Value GHS",
              },
            ]}
            hasFeedback
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            name="conversionRatesBuyLowValueNGN"
            label="Conversion Rates Buy Low Value NGN"
            rules={[
              {
                required: true,
                message: "Please input your Conversion Rates Buy Low Value NGN",
              },
            ]}
            hasFeedback
          >
            <Input type="number" />
          </Form.Item>
          <Title level={5}>Buy High</Title>
          <Form.Item
            name="conversionRatesBuyHighMaxVolume"
            label="Conversion Rates Buy High Max Volume"
            rules={[
              {
                required: true,
                message:
                  "Please input your Conversion Rates Buy High Max Volume",
              },
            ]}
            hasFeedback
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            name="conversionRatesBuyHighMinVolume"
            label="Conversion Rates Buy High Min Volume"
            rules={[
              {
                required: true,
                message:
                  "Please input your Conversion Rates Buy High Min Volume",
              },
            ]}
            hasFeedback
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            name="conversionRatesBuyHighValueGHS"
            label="Conversion Rates Buy High Value GHS"
            rules={[
              {
                required: true,
                message:
                  "Please input your Conversion Rates Buy High Value GHS",
              },
            ]}
            hasFeedback
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            name="conversionRatesBuyHighValueNGN"
            label="Conversion Rates Buy High Value NGN"
            rules={[
              {
                required: true,
                message:
                  "Please input your Conversion Rates Buy High Value NGN",
              },
            ]}
            hasFeedback
          >
            <Input type="number" />
          </Form.Item>
          <Title level={5}>Sell</Title>
          <Form.Item
            name="conversionRatesSellMaxVolume"
            label="Conversion Rates Sell Max Volume"
            rules={[
              {
                required: true,
                message: "Please input your Conversion Rates Sell Max Volume",
              },
            ]}
            hasFeedback
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            name="conversionRatesSellMinVolume"
            label="Conversion Rates Sell Min Volume"
            rules={[
              {
                required: true,
                message: "Please input your Conversion Rates Sell Min Volume",
              },
            ]}
            hasFeedback
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            name="conversionRatesSellValueGHS"
            label="Conversion Rates Sell Value GHS"
            rules={[
              {
                required: true,
                message: "Please input your password",
              },
            ]}
            hasFeedback
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            name="conversionRatesSellValueNGN"
            label="Conversion Rates Sell Value NGN"
            rules={[
              {
                required: true,
                message: "Please input your password",
              },
            ]}
            hasFeedback
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={loading}>
              Update Settings
            </Button>
          </Form.Item>
        </Form>
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
                  <span>Buy Crypto</span>
                </div>
              }
              key="1"
            >
              <Row align="start">
                <Col span={6} style={{marginLeft:20}}>
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
                {/* <Col span={6}>
              <p>Filter By Admin Email</p>
              <Search
                placeholder="Search by admin email"
                allowClear
                enterButton="Search"
                style={{minWidth: 280}}
                onSearch={onSearch}
              />
            </Col> */}
              </Row>
              <DataTable
                columns={columns}
                transaction={buyTransactions}
                fetchTrans={getAllBuyTrans}
                title={"Buy Crypto"}
                data={buyTransactions && buyTransactions.transactions}
              />
            </TabPane>
            <TabPane
              tab={
                <div>
                  <span>Sell Crypto</span>
                </div>
              }
              key="2"
            >
              <Row align="start">
                <Col span={6} style={{marginLeft:20}}>
                  <p>Filter By Status</p>
                  <Select
                    style={{ minWidth: 200 }}
                    allowClear
                    onChange={handleSellTypeChange}
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
              <DataTable
                columns={columns}
                transaction={sellTransactions}
                fetchTrans={getAllSellTrans}
                title={"Sell Crypto"}
                data={sellTransactions && sellTransactions.transactions}
              />
            </TabPane>
            <TabPane
              tab={
                <div>
                  <span>Send Crypto</span>
                </div>
              }
              key="3"
            >
              <Row align="start">
                <Col span={6} style={{marginLeft:20}}>
                  <p>Filter By Status</p>
                  <Select
                    style={{ minWidth: 200 }}
                    allowClear
                    onChange={handleSendTypeChange}
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
              <DataTable
                columns={columns}
                transaction={sendTransactions}
                fetchTrans={getAllSendTrans}
                title={"Send Crypto"}
                data={sendTransactions && sendTransactions.transactions}
              />
            </TabPane>
            <TabPane
              tab={
                <div>
                  <span>P2P Crypto Transfer</span>
                </div>
              }
              key="4"
            >
              <Row align="start">
                <Col span={6} style={{marginLeft:20}}>
                  <p>Filter By Status</p>
                  <Select
                    style={{ minWidth: 200 }}
                    allowClear
                    onChange={handleP2PTypeChange}
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
              <DataTable
                columns={columns}
                transaction={p2pTransactions}
                fetchTrans={getAllP2PTrans}
                title={"P2P Crypto TRansfer"}
                data={p2pTransactions && p2pTransactions.transactions}
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
  buyTransactions: state.btc.buyTransactions,
  sellTransactions: state.btc.sellTransactions,
  sendTransactions: state.btc.sendTransactions,
  p2pTransactions: state.btc.p2pTransactions,
  buyDetails: state.btc.buyDetails,
  sellDetails: state.btc.sellDetails,
  sendDetails: state.btc.sendDetails,
  p2pDetails: state.btc.p2pDetails,
  BTCDetails: state.btc.BTCDetails,
  selectedUser: state.users.userById,
  buyTransactionsSettings: state.btc.buyTransactionsSettings,
});

const mapDispatchToProps = (dispatch) => ({
  // getAllBTCTrans: (data) => {
  //   dispatch(getAllbuyTransactionss(data));
  // },
  getAllBuyTrans: (data) => {
    dispatch(getBuyCoinTransactions(data));
  },
  getAllSellTrans: (data) => {
    dispatch(getSellCoinTransactions(data));
  },
  getAllSendTrans: (data) => {
    dispatch(getSendCoinTransactions(data));
  },
  getAllP2PTrans: (data) => {
    dispatch(getP2PCoinTransactions(data));
  },
  // getBTCTransById: (data) => {
  //   dispatch(getbuyTransactionssById(data));
  // },
  getBuyTransById: (data) => {
    dispatch(getBuyCoinTransactionsById(data));
  },
  getSellTransById: (data) => {
    dispatch(getSellCoinTransactionsById(data));
  },
  getSendTransById: (data) => {
    dispatch(getSendCoinTransactionsById(data));
  },
  getP2PTransById: (data) => {
    dispatch(getP2PCoinTransactionsById(data));
  },
  getUserDetailsById: (userId) => {
    dispatch(getUserDetailsById(userId));
  },
  getBTCTransSettings: (data) => {
    dispatch(getBTCSettings(data));
  },
  updateBTCSettings: (data) => {
    dispatch(updateBTCSettings(data));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(BTC);
