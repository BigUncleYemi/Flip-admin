import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Row, Col, Statistic } from "antd";
import StatisticWidget from "components/shared-components/StatisticWidget";
import { getDashboardData, getWalletBalances } from "redux/actions/all";
import { Money } from "utils/helper";
import { AUTH_TOKEN } from "redux/constants";
import { LoadingOutlined } from "@ant-design/icons";
import ModalWrapper from "components/layout-components/Modal";

const Home = ({
  getDashboard,
  dashboardData,
  getBalances,
  walletData,
  loading,
}) => {
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
      {loading && (
        <ModalWrapper
        isModalVisible={loading}
        >
          <LoadingOutlined style={{ fontSize: 18 }} />
        </ModalWrapper>
      )}

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
                  <Col
                    onClick={(rt) => console.log("new", rt)}
                    xs={24}
                    sm={24}
                    md={24}
                    lg={24}
                    xl={8}
                  >
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
                      value={Money(
                        dashboardData.fwBalances[item].ledger_balance,
                        item
                      )}
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
          dashboardData &&
          dashboardData?.quidaxBalances &&
          Object.keys(dashboardData.quidaxBalances).map((item) => (
            <Col xs={24} sm={24} md={24} lg={24} xl={12}>
              <StatisticWidget
                title={`${item} Master Wallet Stat`}
                value={
                  <div>
                    <Statistic
                      title={"Available Balance"}
                      value={`${item} ${
                        dashboardData.quidaxBalances[item].available_balance ||
                        0
                      }`}
                    />
                    <Statistic
                      title={"Ledger Balance"}
                      value={`${item} ${
                        dashboardData.quidaxBalances[item].ledger_balance || 0
                      }`}
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
  loading: state.all.loading,
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
