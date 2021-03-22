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
  getAllBTCTrans,
  getBTCTransById,
  BTCTransaction,
  BTCDetails,
  getUserDetailsById,
  selectedUser,
  updateBTCSettings,
  getBTCTransSettings,
  loading,
  BTCTransactionSettings,
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
    getAllBTCTrans({ skip: 0, limit: 10 });
    getBTCTransSettings({ cardCode: "all" });
  }, [getAllBTCTrans, getBTCTransSettings]);

  const handleAction = (id) => {
    setIsModalVisible(true);
    getBTCTransById({ transactionId: id });
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
    updateBTCSettings({...data})
  };

  return (
    <div>
      <UserModal />
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
        }}
      >
        <Title level={2}>BTC</Title>
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
        <Form
          form={form}
          layout="vertical"
          name="login-form"
          onFinish={onFinish}
          initialValues={{
            availabilityBuyMaxVolume:
              BTCTransactionSettings &&
              BTCTransactionSettings.availability.buy.maxVolume,
            availabilityBuyMinVolume:
              BTCTransactionSettings &&
              BTCTransactionSettings.availability.buy.minVolume,
            availabilityBuyValue:
              BTCTransactionSettings &&
              BTCTransactionSettings.availability.buy.value,
            availabilitySellMaxVolume:
              BTCTransactionSettings &&
              BTCTransactionSettings.availability.sell.maxVolume,
            availabilitySellMinVolume:
              BTCTransactionSettings &&
              BTCTransactionSettings.availability.sell.minVolume,
            availabilitySellValue:
              BTCTransactionSettings &&
              BTCTransactionSettings.availability.sell.value,
            conversionRatesBuyHighMaxVolume:
              BTCTransactionSettings &&
              BTCTransactionSettings.conversionRates.buy[0].maxVolume,
            conversionRatesBuyHighMinVolume:
              BTCTransactionSettings &&
              BTCTransactionSettings.conversionRates.buy[0].minVolume,
            conversionRatesBuyHighValueGHS:
              BTCTransactionSettings &&
              BTCTransactionSettings.conversionRates.buy[0].value.GHS,
            conversionRatesBuyHighValueNGN:
              BTCTransactionSettings &&
              BTCTransactionSettings.conversionRates.buy[0].value.NGN,
            conversionRatesBuyLowMaxVolume:
              BTCTransactionSettings &&
              BTCTransactionSettings.conversionRates.buy[1].maxVolume,
            conversionRatesBuyLowMinVolume:
              BTCTransactionSettings &&
              BTCTransactionSettings.conversionRates.buy[1].minVolume,
            conversionRatesBuyLowValueGHS:
              BTCTransactionSettings &&
              BTCTransactionSettings.conversionRates.buy[1].value.GHS,
            conversionRatesBuyLowValueNGN:
              BTCTransactionSettings &&
              BTCTransactionSettings.conversionRates.buy[1].value.NGN,
            conversionRatesSellMaxVolume:
              BTCTransactionSettings &&
              BTCTransactionSettings.conversionRates.sell[0].maxVolume,
            conversionRatesSellMinVolume:
              BTCTransactionSettings &&
              BTCTransactionSettings.conversionRates.sell[0].minVolume,
            conversionRatesSellValueGHS:
              BTCTransactionSettings &&
              BTCTransactionSettings.conversionRates.sell[0].value.GHS,
            conversionRatesSellValueNGN:
              BTCTransactionSettings &&
              BTCTransactionSettings.conversionRates.sell[0].value.NGN,
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
                  <span>All BTC</span>
                </div>
              }
              key="1"
            >
              <DataTable
                columns={columns}
                transaction={BTCTransaction}
                fetchTrans={getAllBTCTrans}
                title={"BTC"}
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
  getAllBTCTrans: (data) => {
    dispatch(getAllBTCTransactions(data));
  },
  getBTCTransById: (data) => {
    dispatch(getBTCTransactionsById(data));
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
