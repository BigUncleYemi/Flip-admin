import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Row, Col, Statistic } from "antd";
import StatisticWidget from "components/shared-components/StatisticWidget";
import { getDashboardData, getWalletBalances } from "redux/actions/all";
import { Money } from "utils/helper";
import { AUTH_TOKEN } from "redux/constants";

const Home = ({ getDashboard, dashboardData, getBalances, walletData }) => {
  const typeUser = localStorage.getItem("type");

  // {
  //   "message": "Fetched dashboard metrics successfully",
  //   "data": {
  //     "metrics": {
  //       "NoOfNewCardTransactions": 0,
  //       "NoOfNewWithdrawalRequests": 2,
  //       "NoOfAllUsers": 3,
  //       "NoOfNewUsersToday": 1,
  //       "NoOfBTCTransactionsToday": 0,
  //       "NoOfCardsTransactionsToday": 0
  //     }
  //   }
  // }

  useEffect(() => {
    getDashboard();
    // getBalances();
  }, []);

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
            {dashboardData &&
              dashboardData?.metrics &&
              dashboardData.metrics.map((item) => (
                <>
                  <Col onClick={(rt)=> console.log('new',rt)} 
                  xs={24} sm={24} md={24} lg={24} xl={8}>
                    <StatisticWidget
                      title={item.description}
                      value={item.value}
                    />
                  </Col>
                </>
              ))}
          </Row>
        </Col>
      </Row>
      <Row gutter={16} style={{ marginBottom: 20 }}>
        {console.log("wallet", dashboardData)}
        {typeUser === "SUPER_USER" &&
          dashboardData?.fwBalances &&
          Object.keys(dashboardData.fwBalances).map((item) => (
            <Col xs={24} sm={24} md={24} lg={24} xl={12}>
              <StatisticWidget
                title={`${item} Master Wallet Stat`}
                value={
                  <div>
                    <Statistic
                      title={"Available Balance"}
                      value={Money(
                        dashboardData.fwBalances[item].available_balance | 0,
                        item
                      )}
                    />
                    <Statistic
                      title={"Ledger Balance"}
                      value={Money(dashboardData.fwBalances[item].ledger_balance, item)}
                    />
                  </div>
                }
              />
            </Col>
          ))}

      </Row>

      <Row gutter={16} style={{ marginBottom: 20 }}>
        {console.log("wallet", dashboardData)}
        {typeUser === "SUPER_USER" &&
          dashboardData?.quidaxBalances &&
          Object.keys(dashboardData.quidaxBalances).map((item) => (
            <Col xs={24} sm={24} md={24} lg={24} xl={12}>
              <StatisticWidget
                title={`${item} Master Wallet Stat`}
                value={
                  <div>
                    <Statistic
                      title={"Available Balance"}
                      value={Money(
                        dashboardData.quidaxBalances[item].available_balance | 0,
                        item
                      )}
                    />
                    <Statistic
                      title={"Ledger Balance"}
                      value={Money(dashboardData.quidaxBalances[item].ledger_balance, item)}
                    />
                  </div>
                }
              />
            </Col>
          ))}
          
      </Row>
    </div>
  );
};

const mapStateToProps = (state) => ({
  dashboardData: state.all.getDashboardData,
  walletData: state.all.getWalletData,
});

const mapDispatchToProps = (dispatch) => ({
  getDashboard: () => {
    dispatch(getDashboardData());
  },
  getBalances: () => {
    dispatch(getWalletBalances());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
