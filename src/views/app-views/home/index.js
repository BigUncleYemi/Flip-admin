import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Row, Col, Statistic } from "antd";
import StatisticWidget from "components/shared-components/StatisticWidget";
import { getDashboardData } from "redux/actions/all";
import { Money } from "utils/helper";

const Home = ({ getDashboardData, dashboardData }) => {
  const typeUser = localStorage.getItem("type");
  useEffect(() => {
    getDashboardData();
  }, [getDashboardData]);
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
                  dashboardData &&
                  dashboardData.dbMetrics &&
                  dashboardData.dbMetrics.NoOfAllUsers
                }
              />
            </Col>
            <Col xs={24} sm={24} md={24} lg={24} xl={8}>
              <StatisticWidget
                title={"No of New User count"}
                value={
                  dashboardData &&
                  dashboardData.dbMetrics &&
                  dashboardData.dbMetrics.NoOfNewUsersToday
                }
              />
            </Col>
            <Col xs={24} sm={24} md={24} lg={24} xl={8}>
              <StatisticWidget
                title={"No of New Withdrawal Request"}
                value={
                  dashboardData &&
                  dashboardData.dbMetrics &&
                  dashboardData.dbMetrics.NoOfNewWithdrawalRequests
                }
              />
            </Col>
          </Row>
          <Row gutter={16} style={{ marginBottom: 20 }}>
            <Col xs={24} sm={24} md={24} lg={24} xl={8}>
              <StatisticWidget
                title={"Today's BTC Transaction count"}
                value={
                  dashboardData &&
                  dashboardData.dbMetrics &&
                  dashboardData.dbMetrics.NoOfBTCTransactionsToday
                }
              />
            </Col>
            <Col xs={24} sm={24} md={24} lg={24} xl={8}>
              <StatisticWidget
                title={"Today's Gift Card Transaction count"}
                value={
                  dashboardData &&
                  dashboardData.dbMetrics &&
                  dashboardData.dbMetrics.NoOfCardsTransactionsToday
                }
              />
            </Col>
            <Col xs={24} sm={24} md={24} lg={24} xl={8}>
              <StatisticWidget
                title={"No of New Gift card Transaction"}
                value={
                  dashboardData &&
                  dashboardData.dbMetrics &&
                  dashboardData.dbMetrics.NoOfNewCardTransactions
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
                          dashboardData &&
                            dashboardData.fwBalances &&
                            dashboardData.fwBalances[0]?.available_balance,
                          (dashboardData &&
                            dashboardData.fwBalances &&
                            dashboardData.fwBalances[0]?.currency) ||
                            "NGN"
                        )}
                      />
                      <Statistic
                        title={"Ledger Balance"}
                        value={Money(
                          dashboardData &&
                            dashboardData.fwBalances &&
                            dashboardData.fwBalances[0]?.ledger_balance,
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
                          dashboardData &&
                            dashboardData.fwBalances &&
                            dashboardData.fwBalances[1].available_balance,
                          (dashboardData &&
                            dashboardData.fwBalances &&
                            dashboardData.fwBalances[1].currency) ||
                            "GHS"
                        )}
                      />
                      <Statistic
                        title={"Ledger Balance"}
                        value={Money(
                          dashboardData &&
                            dashboardData.fwBalances &&
                            dashboardData.fwBalances[1].ledger_balance,
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
