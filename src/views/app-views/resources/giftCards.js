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
  Form,
  notification,
  Progress
} from "antd";
import Upload from "../../../components/upload";
import {
  ExclamationCircleOutlined,
  ArrowLeftOutlined,
  CreditCardOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import {
  getAllUser,
  getUserDetailsById,
  makeUserAdmin,
  removeUserAdmin,
} from "redux/actions/user";
import AppFetch from "auth/FetchInterceptor";
import DataTable from "components/layout-components/DataTable";
import { date, processImageToCloudinary } from "utils/helper";
import styles from "../../styles.module.scss";
import ModalWrapper from "components/layout-components/Modal";
import { getGiftCards, getGiftCardsById } from "redux/actions/all";
import GiftCardEntry from "./giftCardEntry";

const { Option } = Select;
const { confirm } = Modal;

const GiftCards = ({
  data,
  getGiftCard,
  giftCards,
  cardDetails,
  getCardsDetails,
  loading,
  setActive
}) => {

    const onHandleFile = (file) => {
        setDetails((details) => ({ ...details, file: [...details.file, file] }));
      };
      const handleDelete = (index) => {
        let file = details.file;
        file = file.filter((f, i) => i !== index);
        setDetails((details) => ({ ...details, file }));
      };


  const INITIAL_STATE = {
    country: "",
    cardCurrencyId: "",
    giftCardId: "",
    cardType: "",
    fiatCurrencyId: "",
    value: null,
    amount: 0,
    number: 1,
    total: 0,
    file: [],
    wallet: "",
    remark: "",
  };
  // const INITIAL_STATE2 = {};

  const [details, setDetails] = useState(INITIAL_STATE);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isAddNewModalVisible, setIsAddNewModalVisible] = useState(false);
  const [entryModal, setEntryModal] = useState(false)
  const [Trigger, setTrigger] = useState(false);
  const [progress, setProgress] = useState();
  const [giftcardName, setGiftcardName] = useState("")
  const [giftcardUid, setGiftcardUid] = useState("")
  const [uploadLoading, setUploadLoading] = useState(false);
  const [comment, setComment] = useState("");
  const { Title } = Typography;
  const { TextArea } = Input;
  useEffect(() => {
    getGiftCard({ skip: 0, limit: 10 });
    // getUserDetailsById({id: "ac65bd59-a8b9-4f6c-98d8-ac32da3107a1"})
  }, [getGiftCard]);

  const handleAction = (id) => {
    setIsModalVisible(true);
    getCardsDetails({ id });
  };
  const onGiftCardSubmit = async () => {
    setUploadLoading(true);
    if (details.file.length === 0) {
      return;
    } else if (details.file.length > 1) {
      notification.warn({
        message: "You can only upload one file",
      });
      return;
    }
    const resFile = await Promise.all(
      details.file.map((i) =>
        processImageToCloudinary(i, console.log, setProgress)
      )
    );

    AppFetch({
      url: `/admin/cards`,
      method: "POST",
      data: {
        uid: giftcardUid,
        name: giftcardName,
        image: resFile[0],
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
    setUploadLoading(false);
    setIsAddNewModalVisible(false);
  };

  const columns = [
    {
      title: "Date Created",
      dataIndex: "created_at",
      render: (createdAt) => `${date(createdAt)}`,
    },
    {
      title: "Image",
      dataIndex: "image",
      render: (theImageURL) => (
        <img
          alt={theImageURL}
          src={theImageURL}
          style={{ width: 160, height: 90, borderWidth: 1 }}
        />
      ),
    },
    {
      title: "name",
      dataIndex: "name",
    },
    {
      title: "uid",
      dataIndex: "uid",
    },
    {
      title: "View Details",
      dataIndex: "uid",
      key: "x",
      render: (uid) => (
        <p style={{ cursor: "pointer" }} onClick={() => handleAction(uid)}>
          View Details
        </p>
      ),
    },
    {
      title: "Edit Card Entry",
      dataIndex: "uid",
      key: "x",
      render: (uid) => (
        <p style={{ cursor: "pointer" }} onClick={() => {
          // handleAction(uid)
          setEntryModal(true)
        }
          }>
          Edit Details
        </p>
      ),
    },
  ];

  return (
    <div>
      <GiftCardEntry
      isModalVisible={entryModal}
      setIsModalVisible={setEntryModal}
      // className={styles.withdrawInitial}
      showClose="no"
      showCancel
      />
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
          onFinish={onGiftCardSubmit}
        >
          <p>Please enter the name of Giftcard to be added.</p>
          <Form.Item
            name="giftcard"
            label="Giftcard"
            hasFeedback
            required
            rules={[
              {
                required: true,
                message: "Please input name of the Giftcard",
              },
            ]}
          >
            <Input
              type="text"
              value={giftcardName}
              onChange={(e) => setGiftcardName(e.target.value)}
              prefix={<CreditCardOutlined className="text-primary" />}
            />
          </Form.Item>
          <Form.Item
            name="giftcarduid"
            label="Giftcard Unique ID"
            hasFeedback
            required
            rules={[
              {
                required: true,
                message: "Please input an id for the Giftcard",
              },
            ]}
          >
            <Input
              type="text"
              value={giftcardUid}
              onChange={(e) => setGiftcardUid(e.target.value)}
              prefix={<CreditCardOutlined className="text-primary" />}
            />
          </Form.Item>
          <Form.Item>
            <div className={styles.uploads__form__upload}>
              {progress && (
                <span>{progress ? `uploading ${progress}%` : ""}</span>
              )}
              {progress && <Progress percent={progress} status="active" />}
              <Upload handleFile={onHandleFile} />
              {details.file.length > 0 && (
                <div>
                  <p>Uploaded files</p>
                  <ul>
                    {details.file.map((file, index) => (
                      <li key={index}>
                        <span style={{ marginRight: 7 }}>{file.name}</span>
                        <CloseCircleOutlined
                          onClick={() => handleDelete(index)}
                          style={{ cursor: "pointer" }}
                        />
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={loading}>
              Add GiftCard
            </Button>
          </Form.Item>
        </Form>
      </ModalWrapper>

      <ModalWrapper
        isModalVisible={
          cardDetails && cardDetails.cardRateDetails ? isModalVisible : false
        }
        setIsModalVisible={setIsModalVisible}
        className={styles.withdrawInitial}
        showClose="no"
        showCancel
      >
        <div className={styles.transactionBig}>
          <div className={styles.transactionBig__tag}>
            {/* <Avatar size="large" style={{ margin: 10 }} src={cardDetails.image}>
              
            </Avatar> */}
          </div>
          <List.Item>
            <List.Item.Meta
              title={"Name"}
              description={cardDetails?.cardRateDetails[0].GiftCard.name}
            />
            <img
              src={cardDetails?.cardRateDetails[0].GiftCard.image}
              style={{ width: 160, height: 90, borderWidth: 1 }}
            />
          </List.Item>

          <List.Item>
            <List.Item.Meta title={"Physical Cards Rates"} description={""} />
          </List.Item>

          {cardDetails?.cardRateDetails.map((item) => (
            <div style={{ margin: 10 }}>
              <div style={{ fontSize: 16 }}>{item.GiftCardCurrency.name}</div>
              {/* <List.Item>
                <List.Item.Meta
                  title={"Name"}
                  description={item.GiftCard.name}
                />
              </List.Item> */}
              <List.Item>
                {Object.keys(item.physical).map((items) => (
                  <div>
                    <div>{items}</div>
                    <div>{item.physical[items]}</div>
                  </div>
                ))}
              </List.Item>
            </div>
          ))}
          <List.Item>
            <List.Item.Meta title={"Ecode Cards Rates"} description={""} />
          </List.Item>

          {cardDetails?.cardRateDetails.map((item) => (
            <div style={{ margin: 10 }}>
              <div style={{ fontSize: 16 }}>{item.GiftCardCurrency.name}</div>
              {/* <List.Item>
                <List.Item.Meta
                  title={"Name"}
                  description={item.GiftCard.name}
                />
              </List.Item> */}
              <List.Item>
                {Object.keys(item.ecode).map((items) => (
                  <div>
                    <div>{items}</div>
                    <div>{item.ecode[items]}</div>
                  </div>
                ))}
              </List.Item>
            </div>
          ))}
        </div>
      </ModalWrapper>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          lineHeight: 5,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
          onClick={()=>setActive((state)=> ({
              main:true,
              giftCards:false
          }))}
        >
          <ArrowLeftOutlined style={{ fontSize: 20, marginRight: 15 }} />
          <div style={{ fontSize: 20 }}>Gift Cards</div>
        </div>
        <div>
          <Button
            type="primary"
            onClick={() => setIsAddNewModalVisible(true)}
            style={{ marginRight: 20 }}
          >
            Add New Giftcard
          </Button>
        </div>
      </div>

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
              transaction={giftCards}
              fetchTrans={getGiftCard}
              title={"GiftCards"}
              data={giftCards && giftCards.cards}
            />
          </Row>
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (state) => ({
    loading: state.giftCard.loading,
  giftCards: state.all.giftCards,
  selectedUser: state.users.userById,
  cardDetails: state.all.cardDetails,
});

const mapDispatchToProps = (dispatch) => ({
  getGiftCard: (data) => {
    dispatch(getGiftCards(data));
  },
  getCardsDetails: (data) => {
    dispatch(getGiftCardsById(data));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(GiftCards);
