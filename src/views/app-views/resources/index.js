import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  Statistic,
  Card,
  notification,
  Form,
  Select,
  Input,
  Button,
} from "antd";
import StatisticWidget from "components/shared-components/StatisticWidget";
import { connect } from "react-redux";
import {
  getCardsCurrency,
  getGiftCards,
  getUserCoins,
  getUserFiats,
  getValidCoins,
  getValidFiats,
} from "redux/actions/all";
import GiftCards from "./giftCards";
import { MailOutlined, PayCircleOutlined } from "@ant-design/icons";
import AppFetch from "auth/FetchInterceptor";
import ModalWrapper from "components/layout-components/Modal";
import styles from "../../styles.module.scss";

function Resources(props) {
  useEffect(() => {
    props.getFiats();
    props.getUserCoin();
    props.getCoins();
    props.getCardCurr();
    props.getUserFiat();
    props.getGiftCard({ skip: 0, limit: 20 });
  }, []);
  let initialState = {
    giftCards: false,
    main: true,
  };
  const [active, setActive] = useState(initialState);
  const [isAddCurrencyModalVisible, setIsAddCurrencyModalVisible] = useState(
    false
  );
  const [isAddCoinModalVisible, setIsAddCoinModalVisible] = useState(false);
  const [newCurrency, setNewCurrency] = useState("");
  const [currencyName, setCurrencyName] = useState("");
  const [newCoin, setNewCoin] = useState("");
  const [coinName, setCoinName] = useState("");
  const [buyAmount, setBuyAmount] = useState(0);
  const [sellAmount, setSellAmount] = useState(0);
  {
    /* <Button
    type="primary"
    onClick={() => setIsAddCurrencyModalVisible(true)}
    style={{ marginRight: 0 }}
>
    Add New Coin
</Button> */
  }
  const onAddCurrencySubmit = () => {
    AppFetch({
      url: `/admin/fiats`,
      method: "POST",
      data: {
        code: newCurrency,
        name: currencyName,
        we_buy: buyAmount,
        we_sell: sellAmount,
      },
    })
      .then((response) => {
        notification.success({
          message: "Successful",
        });
      })
      .catch((err) => {
        notification.error({
          message: "Currency Add Failed",
        });
      });
    setIsAddCurrencyModalVisible(false);
  };

  const onAddCoinSubmit = () => {
    AppFetch({
      url: `/admin/coins`,
      method: "POST",
      data: {
        code: newCoin,
        name: coinName,
      },
    })
      .then((response) => {
        notification.success({
          message: "Successful",
        });
      })
      .catch((err) => {
        notification.error({
          message: "Currency Add Failed",
        });
      });
    setIsAddCurrencyModalVisible(false);
  };
  return (
    <div>
      <ModalWrapper
        isModalVisible={isAddCurrencyModalVisible}
        setIsModalVisible={setIsAddCurrencyModalVisible}
        className={styles.withdrawInitial}
        showClose="no"
        showCancel
      >
        <Form
          layout="vertical"
          name="admin-form"
          style={{ padding: "20px 10px" }}
          onFinish={onAddCurrencySubmit}
        >
          <p>Please enter the name of currency to be added.</p>
          <Form.Item
            name="currency"
            label="Currency"
            hasFeedback
            required
            rules={[
              {
                required: true,
                message: "Please pick a currency",
              },
              {
                type: "string",
                message: "Please enter a validate email!",
              },
            ]}
          >
            <Select
              value={newCurrency}
              onChange={(input) => setNewCurrency(input)}
              options={
                props.validFiats &&
                props.validFiats.fiats &&
                props.validFiats.fiats.map((item) => ({
                  render: item,
                  value: item,
                }))
              }
            />
          </Form.Item>
          <Form.Item
            name="currency name"
            label="Currency Name"
            hasFeedback
            required
            rules={[
              {
                required: true,
                message: "Please input a currency name",
              },
            ]}
          >
            <Input
              type="text"
              prefix={<PayCircleOutlined className="text-primary" />}
              value={currencyName}
              onChange={(e) => {
                setCurrencyName(e.target.value);
                // console.log('text', e.target.value)
              }}
            />
          </Form.Item>
          <Form.Item
            name="buyAmount"
            label="Buy Amount"
            hasFeedback
            required
            rules={[
              {
                required: true,
                message: "Please input a Buy Amount",
              },
            ]}
          >
            <Input
              type="number"
              prefix={<PayCircleOutlined className="text-primary" />}
              value={buyAmount}
              onChange={(e) => {
                setBuyAmount(e.target.value);
                // console.log('text', e.target.value)
              }}
            />
          </Form.Item>
          <Form.Item
            name="sellAmount"
            label="Sell Amount"
            hasFeedback
            required
            rules={[
              {
                required: true,
                message: "Please input a Sell Amount",
              },
            ]}
          >
            <Input
              type="number"
              prefix={<PayCircleOutlined className="text-primary" />}
              value={sellAmount}
              onChange={(e) => {
                setSellAmount(e.target.value);
                // console.log('text', e.target.value)
              }}
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              loading={props.loading}
            >
              Add Currency
            </Button>
          </Form.Item>
        </Form>
      </ModalWrapper>

      <ModalWrapper
        isModalVisible={isAddCoinModalVisible}
        setIsModalVisible={setIsAddCoinModalVisible}
        className={styles.withdrawInitial}
        showClose="no"
        showCancel
      >
        <Form
          layout="vertical"
          name="admin-form"
          style={{ padding: "20px 10px" }}
          onFinish={onAddCurrencySubmit}
        >
          <p>Please enter the name of coin to be added.</p>
          <Form.Item
            name="coin"
            label="Coin"
            hasFeedback
            required
            rules={[
              {
                required: true,
                message: "Please pick a currency",
              },
              {
                type: "string",
                message: "Please enter a validate email!",
              },
            ]}
          >
            <Select
              value={newCoin}
              onChange={(input) => setNewCoin(input)}
              options={
                props.validCoins &&
                props.validCoins.coins &&
                props.validCoins.coins.map((item) => ({
                  render: item,
                  value: item,
                }))
              }
            />
          </Form.Item>
          <Form.Item
            name="coin name"
            label="Coin Name"
            hasFeedback
            required
            rules={[
              {
                required: true,
                message: "Please input a currency name",
              },
            ]}
          >
            <Input
              type="text"
              prefix={<PayCircleOutlined className="text-primary" />}
              value={coinName}
              onChange={(e) => {
                setCoinName(e.target.value);
                // console.log('text', e.target.value)
              }}
            />
          </Form.Item>
          
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              loading={props.loading}
            >
              Add Coin
            </Button>
          </Form.Item>
        </Form>
      </ModalWrapper>

      {active.giftCards && (
        <GiftCards data={props.giftCards} setActive={setActive} />
      )}
      {active.main && (
        <>
          <Row gutter={16}>
            <Col
              style={{ flex: 1, maxWidth: "100%" }}
              xs={24}
              sm={24}
              md={24}
              lg={18}
            >
              <Row gutter={16} style={{ marginBottom: 20 }}>
                <Col
                  onClick={(rt) =>
                    setActive((state) => ({
                      ...active,
                      giftCards: true,
                      main: false,
                    }))
                  }
                  xs={24}
                  sm={24}
                  md={24}
                  lg={24}
                  xl={8}
                >
                  {/* <StatisticWidget title={"Giftcards available"} value={15} /> */}
                  <Card value={15}>
                    <h4 className="mb-0">{"Giftcards available"}</h4>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        flexWrap: "wrap",
                      }}
                    >
                      {props.giftCards &&
                        props.giftCards.cards &&
                        props.giftCards.cards.map((item) => (
                          <div style={{ marginRight: 10 }}>{item.name}</div>
                        ))}
                    </div>
                  </Card>
                </Col>
                <Col
                  onClick={(rt) => setIsAddCurrencyModalVisible(true)}
                  xs={24}
                  sm={24}
                  md={24}
                  lg={24}
                  xl={8}
                >
                  {/* <StatisticWidget title={"Wallets available to User"} value={15} /> */}
                  <Card value={15}>
                    <h4 className="mb-0">{"Wallets available to User"}</h4>
                    <h5>Click to make more currencies available to users</h5>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        flexWrap: "wrap",
                      }}
                    >
                      {props.userFiats &&
                        props.userFiats.fiat &&
                        props.userFiats.fiat.map((item) => (
                          <div style={{ marginRight: 10 }}>{item.code}</div>
                        ))}
                    </div>
                  </Card>
                </Col>
                <Col
                  onClick={(rt) => console.log("new", rt)}
                  xs={24}
                  sm={24}
                  md={24}
                  lg={24}
                  xl={8}
                >
                  <Card value={15}>
                    <h4 className="mb-0">{"Wallets available"}</h4>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        flexWrap: "wrap",
                      }}
                    >
                      {props.validFiats &&
                        props.validFiats.fiats &&
                        props.validFiats.fiats.map((item) => (
                          <div style={{ marginRight: 10 }}>{item}</div>
                        ))}
                    </div>
                  </Card>
                </Col>
              </Row>
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
              <Row gutter={[16, 16]} style={{ marginBottom: 20 }}>
                <Col
                  onClick={(rt) => console.log("new", rt)}
                  xs={24}
                  sm={24}
                  md={24}
                  lg={24}
                  xl={8}
                >
                  {/* <StatisticWidget title={"Gift card currencies"} value={15} /> */}
                  <Card value={15}>
                    <h4 className="mb-0">{"Gift card currencies"}</h4>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        flexWrap: "wrap",
                      }}
                    >
                      {props.cardCurrencies &&
                        props.cardCurrencies.currencies &&
                        props.cardCurrencies.currencies.map((item) => (
                          <div style={{ marginRight: 10 }}>{item.code}</div>
                        ))}
                    </div>
                  </Card>
                </Col>
                <Col
                  onClick={(rt) => setIsAddCoinModalVisible(true)}
                  xs={24}
                  sm={24}
                  md={24}
                  lg={24}
                  xl={8}
                >
                  <Card value={15}>
                    <h4 className="mb-0">{"Coins available to User"}</h4>
                    <h5>Click to make more coins available to users</h5>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        flexWrap: "wrap",
                      }}
                    >
                      {props.userCoins &&
                        props.userCoins.crypto &&
                        props.userCoins.crypto.map((item) => (
                          <div style={{ marginRight: 10 }}>{item.code}</div>
                        ))}
                    </div>
                  </Card>
                </Col>
                <Col
                  onClick={(rt) => console.log("new", rt)}
                  xs={24}
                  sm={24}
                  md={24}
                  lg={24}
                  xl={8}
                >
                  <Card value={15}>
                    <h4 className="mb-0">{"Coins available"}</h4>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        flexWrap: "wrap",
                      }}
                    >
                      {props.validCoins &&
                        props.validCoins.coins &&
                        props.validCoins.coins.map((item) => (
                          <div style={{ marginRight: 10 }}>{item}</div>
                        ))}
                    </div>
                  </Card>
                </Col>
              </Row>
            </Col>
          </Row>
        </>
      )}
    </div>
  );
}

const mapStateToProps = (state) => ({
  validFiats: state.all.validFiats,
  validCoins: state.all.validCoins,
  userCoins: state.all.userCoins,
  userFiats: state.all.userFiats,
  giftCards: state.all.giftCards,
  cardCurrencies: state.all.cardCurrencies,
  loading: state.super.loading,
});

const mapDispatchToProps = (dispatch) => ({
  getCoins: (data) => {
    dispatch(getValidCoins(data));
  },
  getFiats: (data) => {
    dispatch(getValidFiats(data));
  },
  getUserFiat: (data) => {
    dispatch(getUserFiats());
  },
  getUserCoin: () => {
    dispatch(getUserCoins());
  },
  getCardCurr: () => {
    dispatch(getCardsCurrency());
  },
  getGiftCard: (data) => {
    dispatch(getGiftCards(data));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Resources);
