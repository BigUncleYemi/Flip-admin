import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Row, Col, Statistic } from "antd";
import StatisticWidget from "components/shared-components/StatisticWidget";
import { getDashboardData } from "redux/actions/all";
import { Money } from "utils/helper";

const Home = ({ getDashboardData, dashboardData }) => {
  const typeUser = localStorage.getItem("type");
  const [totalUserData, setTotalUserData] = useState(0);
  const [ngn_available_balance, setNgnavailable_balance] = useState(0);
  const [ngn_ledger_balance, setNgnLedger_balance] = useState(0);
  const [currency_ngn, setCurrency_ngn] = useState("");
  const [ghs_available_balance, setGhs_available_balance] = useState(0);
  const [ghs_ledger_balance, setGhs_ledger_balance] = useState(0);
  const [currency_ghs, setCurrency_ghs] = useState("");
  const [newUsersCount, setNewUsersCount] = useState(0);
  const [new_withdraw_req, setNew_withdraw_req] = useState(0);
  const [today_btc_count, setToday_btc_count] = useState(0);
  const [today_gift_card_count, setToday_gift_card_count] = useState(0);
  const [new_gift_card_transaction, setNew_gift_card_transaction] = useState(0);
  useEffect(() => {
    getDashboardData();
  }, [getDashboardData]);
  useEffect(() => {
    dashboardData &&
      dashboardData.dbMetrics &&
      dashboardData.dbMetrics.NoOfAllUsers &&
      setTotalUserData(dashboardData.dbMetrics.NoOfAllUsers);

    dashboardData &&
      dashboardData.fwBalances &&
      dashboardData.fwBalances[0]?.available_balance &&
      setNgnavailable_balance(dashboardData.fwBalances[0]?.available_balance);

    dashboardData &&
      dashboardData.fwBalances &&
      dashboardData.fwBalances[0]?.ledger_balance &&
      setNgnLedger_balance(dashboardData.fwBalances[0]?.ledger_balance);

    dashboardData &&
      dashboardData.fwBalances &&
      dashboardData.fwBalances[1].available_balance &&
      setGhs_available_balance(dashboardData.fwBalances[1].available_balance);

    dashboardData &&
      dashboardData.fwBalances &&
      dashboardData.fwBalances[1]?.ledger_balance &&
      setGhs_ledger_balance(dashboardData.fwBalances[1]?.ledger_balance);

    dashboardData &&
      dashboardData.dbMetrics &&
      dashboardData.dbMetrics.NoOfNewUsersToday &&
      setNewUsersCount(dashboardData.dbMetrics.NoOfNewUsersToday);

    dashboardData &&
      dashboardData.dbMetrics &&
      dashboardData.dbMetrics.NoOfNewWithdrawalRequests &&
      setNew_withdraw_req(dashboardData.dbMetrics.NoOfNewWithdrawalRequests);

    dashboardData &&
      dashboardData.dbMetrics &&
      dashboardData.dbMetrics.NoOfBTCTransactionsToday &&
      setToday_btc_count(dashboardData.dbMetrics.NoOfBTCTransactionsToday);

    dashboardData &&
      dashboardData.dbMetrics &&
      dashboardData.dbMetrics.NoOfCardsTransactionsToday &&
      setToday_gift_card_count(
        dashboardData.dbMetrics.NoOfCardsTransactionsToday
      );

    dashboardData &&
      dashboardData.dbMetrics &&
      dashboardData.dbMetrics.NoOfNewCardTransactions &&
      setNew_gift_card_transaction(
        dashboardData.dbMetrics.NoOfNewCardTransactions
      );
  }, [dashboardData]);
  return (
    <div>
      <Row gutter={16}>
        <Col
          style={{ flex: 1, maxWidth: "100%" }}
          xs={24}
          sm={24}
          md={24}
          lg={18}
        >
          <Row gutter={16} style={{ marginBottom: 20 }}>
            <Col xs={24} sm={24} md={24} lg={24} xl={8}>
              <StatisticWidget
                title={"Total User Base"}
                value={
                  totalUserData
                  // dashboardData &&
                  // dashboardData.dbMetrics &&
                  // dashboardData.dbMetrics.NoOfAllUsers
                }
              />
            </Col>
            <Col xs={24} sm={24} md={24} lg={24} xl={8}>
              <StatisticWidget
                title={"No of New User count"}
                value={newUsersCount}
              />
            </Col>
            <Col xs={24} sm={24} md={24} lg={24} xl={8}>
              <StatisticWidget
                title={"No of New Withdrawal Request"}
                value={new_withdraw_req}
              />
            </Col>
          </Row>
          <Row gutter={16} style={{ marginBottom: 20 }}>
            <Col xs={24} sm={24} md={24} lg={24} xl={8}>
              <StatisticWidget
                title={"Today's BTC Transaction count"}
                value={today_btc_count}
              />
            </Col>
            <Col xs={24} sm={24} md={24} lg={24} xl={8}>
              <StatisticWidget
                title={"Today's Gift Card Transaction count"}
                value={today_gift_card_count}
              />
            </Col>
            <Col xs={24} sm={24} md={24} lg={24} xl={8}>
              <StatisticWidget
                title={"No of New Gift card Transaction"}
                value={
                  new_gift_card_transaction
                }
              />
            </Col>
          </Row>
          <Row gutter={16} style={{ marginBottom: 20 }}>
            <Col
              style={{ flex: 1, maxWidth: "100%" }}
              xs={24}
              sm={24}
              md={24}
              lg={18}
            >
              <Row gutter={16}>
                {dashboardData &&
                  dashboardData.dbMetrics &&
                  dashboardData.dbMetrics.VolumeOfBTCTransactionsToday &&
                  dashboardData.dbMetrics.VolumeOfBTCTransactionsToday.map(
                    (elm, i) => (
                      <Col xs={24} sm={24} md={24} lg={24} xl={8} key={i}>
                        <StatisticWidget
                          title={`Today's Volume of ${
                            elm._id && elm._id.type
                          } BTC Transactions`}
                          value={elm.totalVolume}
                          subtitle={`Total count: ${elm.totalCount}`}
                        />
                      </Col>
                    )
                  )}
                {dashboardData &&
                  dashboardData.dbMetrics &&
                  dashboardData.dbMetrics.VolumeOfCardsTransactionsToday &&
                  dashboardData.dbMetrics.VolumeOfCardsTransactionsToday.map(
                    (elm, i) => (
                      <Col xs={24} sm={24} md={24} lg={24} xl={8} key={i}>
                        <StatisticWidget
                          title={`Today's Volume of ${elm._id} Giftcard Transactions`}
                          value={elm.totalVolume}
                          subtitle={`Total count: ${elm.totalCount}`}
                        />
                      </Col>
                    )
                  )}
              </Row>
            </Col>
          </Row>
          {typeUser !== "ADMIN_USER" && (
            <Row gutter={16} style={{ marginBottom: 20 }}>
              <Col xs={24} sm={24} md={24} lg={24} xl={12}>
                <StatisticWidget
                  title={"NGN Master Wallet Stat"}
                  value={
                    <>
                      <Statistic
                        title={"Available Balance"}
                        value={Money(
                          ngn_available_balance,
                          (dashboardData &&
                            dashboardData.fwBalances &&
                            dashboardData.fwBalances[0]?.currency) ||
                            "NGN"
                        )}
                      />
                      <Statistic
                        title={"Ledger Balance"}
                        value={Money(
                          ngn_ledger_balance,
                          (dashboardData &&
                            dashboardData.fwBalances &&
                            dashboardData.fwBalances[0]?.currency) ||
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
                          ghs_available_balance,
                          (dashboardData &&
                            dashboardData.fwBalances &&
                            dashboardData.fwBalances[1].currency) ||
                            "GHS"
                        )}
                      />
                      <Statistic
                        title={"Ledger Balance"}
                        value={Money(
                          ghs_ledger_balance,
                          (dashboardData &&
                            dashboardData.fwBalances &&
                            dashboardData.fwBalances[1].currency) ||
                            "GHS"
                        )}
                      />
                    </>
                  }
                />
              </Col>
            </Row>
          )}
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (state) => ({
  dashboardData: state.all.getDashboardData,
});

const mapDispatchToProps = (dispatch) => ({
  getDashboardData: () => {
    dispatch(getDashboardData());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
