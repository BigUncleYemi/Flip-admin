import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Row, Col, Typography, Avatar, List } from "antd";
import { getAllUser, getUserDetailsById } from "redux/actions/user";
import DataTable from "components/layout-components/DataTable";
import { date } from "utils/helper";
import styles from "../../styles.module.scss";
import ModalWrapper from "components/layout-components/Modal";

const User = ({ getAllUsers, getUserDetailsById, users, selectedUser }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { Title } = Typography;
  useEffect(() => {
    getAllUsers({ skip: 0, limit: 10 });
    // getUserDetailsById({id: "ac65bd59-a8b9-4f6c-98d8-ac32da3107a1"})
  }, [getAllUsers]);

  const handleAction = (id) => {
    setIsModalVisible(true);
    getUserDetailsById({ id });
  };

  const columns = [
    {
      title: "Date Created",
      dataIndex: "createdAt",
      render: (createdAt) => `${date(createdAt)}`,
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "First Name",
      dataIndex: "firstName",
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
    },
    {
      title: "User Type",
      dataIndex: "type",
    },
    {
      title: "Verification",
      dataIndex: "verification",
      render: (verification) => (
        <p
          className={
            verification.email.isVerified
              ? "ant-tag ant-tag-green"
              : "ant-tag ant-tag-warning"
          }
        >
          {verification.email.isVerified ? "Verified" : "Unverified"}
        </p>
      ),
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

  return (
    <>
      <ModalWrapper
        isModalVisible={
          selectedUser && selectedUser.user ? isModalVisible : false
        }
        setIsModalVisible={setIsModalVisible}
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
                title={"User Name"}
                description={
                  selectedUser && selectedUser.user && selectedUser.user.username
                }
              />
            </List.Item>
            <List.Item>
              <List.Item.Meta
                title={"User Referral Code"}
                description={
                  selectedUser && selectedUser.user && selectedUser.user.referralCode
                }
              />
            </List.Item>
            <List.Item>
              <List.Item.Meta
                title={"NGN Wallet Balance"}
                description={
                  <div>
                    <span>
                      Available Balance:{" "}
                      {selectedUser &&
                        selectedUser.user &&
                        selectedUser.user.wallets &&
                        selectedUser.user.wallets.NGN &&
                        selectedUser.user.wallets.NGN.balance.toLocaleString()}
                    </span>
                    <span style={{ paddingLeft: 10 }}>
                      Locked Balance:{" "}
                      {selectedUser &&
                        selectedUser.user &&
                        selectedUser.user.wallets &&
                        selectedUser.user.wallets.NGN &&
                        selectedUser.user.wallets.NGN.locked.toLocaleString()}
                    </span>
                  </div>
                }
              />
            </List.Item>
            <List.Item>
              <List.Item.Meta
                title={"GHS Wallet Balance"}
                description={
                  <div>
                    <span>
                      Available Balance:{" "}
                      {selectedUser &&
                        selectedUser.user &&
                        selectedUser.user.wallets &&
                        selectedUser.user.wallets.GHS &&
                        selectedUser.user.wallets.GHS.balance.toLocaleString()}
                    </span>
                    <span style={{ paddingLeft: 10 }}>
                      Locked Balance:{" "}
                      {selectedUser &&
                        selectedUser.user &&
                        selectedUser.user.wallets &&
                        selectedUser.user.wallets.GHS &&
                        selectedUser.user.wallets.GHS.locked.toLocaleString()}
                    </span>
                  </div>
                }
              />
            </List.Item>
            <List.Item>
              <List.Item.Meta
                title={"BTC Wallet Balance"}
                description={
                  <div>
                    <span>
                      Available Balance:{" "}
                      {selectedUser &&
                        selectedUser.user &&
                        selectedUser.user.wallets &&
                        selectedUser.user.wallets.BTC &&
                        selectedUser.user.wallets.BTC.balance.toLocaleString()}
                    </span>
                    <span style={{ paddingLeft: 10 }}>
                      Locked Balance:{" "}
                      {selectedUser &&
                        selectedUser.user &&
                        selectedUser.user.wallets &&
                        selectedUser.user.wallets.BTC &&
                        selectedUser.user.wallets.BTC.locked.toLocaleString()}
                    </span>
                  </div>
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
      <Title level={2}>Users</Title>
      <Row gutter={16}>
        <Col
          style={{ flex: 1, maxWidth: "100%" }}
          xs={24}
          sm={24}
          md={24}
          lg={18}
        >
          <Row gutter={16}>
            <DataTable
              columns={columns}
              transaction={users}
              fetchTrans={getAllUsers}
              title={"User"}
              data={users && users.users}
            />
          </Row>
        </Col>
      </Row>
    </>
  );
};

const mapStateToProps = (state) => ({
  users: state.users.users,
  selectedUser: state.users.userById,
});

const mapDispatchToProps = (dispatch) => ({
  getAllUsers: (data) => {
    dispatch(getAllUser(data));
  },
  getUserDetailsById: (userId) => {
    dispatch(getUserDetailsById(userId));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(User);
