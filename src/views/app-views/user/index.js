import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  Row,
  Col,
  Typography,
  Avatar,
  List,
  Button,
  Popconfirm,
  Select,
  Input,
  Popover,
  Modal,
} from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import {
  getAllUser,
  getUserDetailsById,
  makeUserAdmin,
  removeUserAdmin,
} from "redux/actions/user";
import DataTable from "components/layout-components/DataTable";
import { date } from "utils/helper";
import styles from "../../styles.module.scss";
import ModalWrapper from "components/layout-components/Modal";

const { Option } = Select;
const { confirm } = Modal;

const User = ({
  getAllUsers,
  getUserDetailsById,
  users,
  selectedUser,
  makeAdmin,
  removeAdmin,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [Trigger, setTrigger] = useState(false);
  const [comment, setComment] = useState("");
  const { Title } = Typography;
  const { TextArea } = Input;
  useEffect(() => {
    getAllUsers({ skip: 0, limit: 10 });
    // getUserDetailsById({id: "ac65bd59-a8b9-4f6c-98d8-ac32da3107a1"})
  }, [getAllUsers]);

  const handleAction = (id) => {
    setIsModalVisible(true);
    getUserDetailsById({ id });
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
          // onChange={(e) => setComment(e.target.value)}
        />
      </div>
      <Popconfirm
        placement="top"
        title={"Are you sure you want to Decline this request?"}
        onConfirm={() => console.log("declined")}
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
  // const handleApproval = () => {
  //   confirm({
  //     title: `Please select wallet to complete the action with.`,
  //     icon: <ExclamationCircleOutlined />,
  //     content: (
  //       <div>
  //         <Select
  //           // onChange={(value) => setDebitWallet(value)}
  //           style={{ width: "100%" }}
  //         >
  //           <Option value="NGN">NGN Wallet</Option>
  //           <Option value="GHS">GHS Wallet</Option>
  //         </Select>
  //       </div>
  //     ),
  //     onOk() {
  //       setTrigger(true);
  //     },
  //     onCancel() {
  //       console.log("Cancel");
  //     },
  //   });
  // };
  const handleDecline = () => {
    console.log("decline");
    // setIsModalVisible(true);
    // declineWithdrawal({
    //   transactionId:
    //     withdrawalDetails &&
    //     withdrawalDetails.transaction &&
    //     withdrawalDetails.transaction.id,
    //   comment,
    // });
    // getAllWithdrawals({ skip: 0, limit: 10 });
    // getNewWithdrawals({ skip: 0, limit: 10 });
  };

  const columns = [
    {
      title: "Date Created",
      dataIndex: "created_at",
      render: (createdAt) => `${date(createdAt)}`,
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "First Name",
      dataIndex: "Profile",
      render: (data) => `${data.first_name}`,
    },
    {
      title: "Last Name",
      dataIndex: "Profile",
      render: (data) => `${data.last_name}`,
    },
    {
      title: "User Type",
      dataIndex: "type",
    },
    {
      title: "User Name",
      dataIndex: "username",
    },
    {
      title: "Verification",
      dataIndex: "is_verified",
      render: (verification) => (
        <p
          className={
            verification ? "ant-tag ant-tag-green" : "ant-tag ant-tag-warning"
          }
        >
          {verification ? "Verified" : "Unverified"}
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
      {console.log("user", selectedUser)}
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
                selectedUser.user.Profile.first_name[0]
              } ${
                selectedUser &&
                selectedUser.user &&
                selectedUser.user.Profile.last_name[0]
              }`}
            </Avatar>
            <span>
              {selectedUser &&
                selectedUser.user &&
                selectedUser.user.Profile.first_name}
            </span>{" "}
            <span>
              {selectedUser &&
                selectedUser.user &&
                selectedUser.user.Profile.last_name}
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
                  selectedUser.user.Profile.first_name
                }
              />
            </List.Item>
            <List.Item>
              <List.Item.Meta
                title={"Last Name"}
                description={
                  selectedUser &&
                  selectedUser.user &&
                  selectedUser.user.Profile.last_name
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
                  selectedUser &&
                  selectedUser.user &&
                  selectedUser.user.username
                }
              />
            </List.Item>
            <List.Item>
              <List.Item.Meta
                title={"User Referral Code"}
                description={
                  selectedUser &&
                  selectedUser.user &&
                  selectedUser.user.referral_code
                }
              />
            </List.Item>

            {/* <List.Item>
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
            </List.Item> */}
            {/* <List.Item>
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
            </List.Item> */}
            {/* <List.Item>
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
            </List.Item> */}
            <List.Item>
              <List.Item.Meta
                title={"Date Created"}
                description={date(
                  selectedUser &&
                    selectedUser.user &&
                    selectedUser.user.created_at
                )}
              />
            </List.Item>
            <List.Item>
              <List.Item.Meta
                title={"Date last updated"}
                description={date(
                  selectedUser &&
                    selectedUser.user &&
                    selectedUser.user.updated_at
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
                      selectedUser.user.is_verified
                        ? "✅"
                        : "🚫"}
                    </span>
                    <span style={{ paddingLeft: 10 }}>
                      Phone Number:{" "}
                      {selectedUser &&
                      selectedUser.user &&
                      selectedUser.user.Profile.is_phone_verified
                        ? "✅"
                        : "🚫"}
                    </span>
                  </div>
                }
              />
              {selectedUser &&
                selectedUser.user &&
                selectedUser.user.type in {BASIC_USER:"1"} && (
                  <div style={{ display: "flex" }}>
                    <Popconfirm
                      placement="top"
                      title={"Are you sure you want to make this user admin?"}
                      onConfirm={() =>
                        makeAdmin({ userId: selectedUser.user.Profile.user_id })
                      }
                      okText="Approve"
                      cancelText="No"
                    >
                      <Button type="primary" style={{ marginRight: 10 }}>
                        Make Admin
                      </Button>
                    </Popconfirm>
                    {/* <Popover content={content} title="Title" trigger="click">
                    <Button type="primary" danger>
                      Decline
                    </Button>
                  </Popover> */}
                  </div>
                )}
              {selectedUser &&
                selectedUser.user &&
                selectedUser.user.type in {SUPER_USER:"1", ADMIN_USER:"2"} && (
                  <div style={{ display: "flex" }}>
                    {/* <Popconfirm
                    placement="top"
                    title={"Are you sure you want to Approve this request?"}
                    onConfirm={handleApproval}
                    okText="Approve"
                    cancelText="No"
                  >
                    <Button type="primary" style={{ marginRight: 10 }}>
                      Approve
                    </Button>
                  </Popconfirm> */}
                    <Popconfirm 
                    placement="top"
                    title={"Are you sure you want to remove this user's admin privilege?"}
                    onConfirm={()=>{
                      removeAdmin({userId:selectedUser.user.Profile.user_id })
                    }}
                    okText="Remove"
                    cancelText="No"
                    // content={content}
                    >
                      <Button type="primary" danger>
                        Remove Admin
                      </Button>
                    </Popconfirm>
                  </div>
                )}
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
  makeAdmin: (data) => {
    dispatch(makeUserAdmin(data));
  },
  removeAdmin: (data) => {
    dispatch(removeUserAdmin(data));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(User);
