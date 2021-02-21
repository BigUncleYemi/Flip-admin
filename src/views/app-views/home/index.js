import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Row, Col } from "antd";
import StatisticWidget from "components/shared-components/StatisticWidget";
import { getDashboardData } from "redux/actions/all";

const Home = ({ getDashboardData, dashboardData }) => {
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
                value={dashboardData && dashboardData.NoOfAllUsers}
              />
            </Col>
            <Col xs={24} sm={24} md={24} lg={24} xl={8}>
              <StatisticWidget
                title={"No of New User count"}
                value={dashboardData && dashboardData.NoOfNewUsersToday}
              />
            </Col>
            <Col xs={24} sm={24} md={24} lg={24} xl={8}>
              <StatisticWidget
                title={"No of New Withdrawal Request"}
                value={dashboardData && dashboardData.NoOfNewWithdrawalRequests}
              />
            </Col>
          </Row>
          <Row gutter={16} style={{ marginBottom: 20 }}>
            <Col xs={24} sm={24} md={24} lg={24} xl={8}>
              <StatisticWidget
                title={"Today's BTC Transaction count"}
                value={dashboardData && dashboardData.NoOfBTCTransactionsToday}
              />
            </Col>
            <Col xs={24} sm={24} md={24} lg={24} xl={8}>
              <StatisticWidget
                title={"Today's Gift Card Transaction count"}
                value={
                  dashboardData && dashboardData.NoOfCardsTransactionsToday
                }
              />
            </Col>
            <Col xs={24} sm={24} md={24} lg={24} xl={8}>
              <StatisticWidget
                title={"No of New Gift card Transaction"}
                value={dashboardData && dashboardData.NoOfNewCardTransactions}
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
                  dashboardData.VolumeOfBTCTransactionsToday &&
                  dashboardData.VolumeOfBTCTransactionsToday.map((elm, i) => (
                    <Col xs={24} sm={24} md={24} lg={24} xl={8} key={i}>
                      <StatisticWidget
                        title={`Today's Volume of ${elm._id && elm._id.type} BTC Transactions`}
                        value={elm.totalVolume}
                        subtitle={`Total count: ${elm.totalCount}`}
                      />
                    </Col>
                  ))}
                {dashboardData &&
                  dashboardData.VolumeOfCardsTransactionsToday &&
                  dashboardData.VolumeOfCardsTransactionsToday.map((elm, i) => (
                    <Col xs={24} sm={24} md={24} lg={24} xl={8} key={i}>
                      <StatisticWidget
                        title={`Today's Volume of ${elm._id} Giftcard Transactions`}
                        value={elm.totalVolume}
                        subtitle={`Total count: ${elm.totalCount}`}
                      />
                    </Col>
                  ))}
              </Row>
            </Col>
          </Row>
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
