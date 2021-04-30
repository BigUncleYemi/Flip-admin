import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import DataTable from "components/layout-components/DataTable";
import {
  Row,
  Col,
  notification,
  Button,
  Form,
  InputNumber,
  Input,
  Space,
  Select,
} from "antd";
import AppFetch from "auth/FetchInterceptor";
import { date, Money } from "utils/helper";
import {
  ExclamationCircleOutlined,
  ArrowLeftOutlined,
  MinusCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import ModalWrapper from "components/layout-components/Modal";
import { getCardsCurrency } from "redux/actions/all";

const { Option } = Select;

function GiftCardEntryDetails(props) {
  const [details, setDetails] = useState([]);
  const [updateModal, setUpdateModal] = useState(false);
  const [createModal, setCreateModal] = useState(false);
  const [dataIndex, setDataIndex] = useState("");

  useEffect(() => {
    console.log("success", "wonderful", props.uid.toString());
    getWalletEntries(props.uid);
    props.getCardCurr()
  }, []);

  const getWalletEntries = async (uid) => {
    await AppFetch({
      url: `/cards/${uid}`,
      method: "get",
    })
      .then((response) => {
        notification.success({
          message: "Successful",
        });
        setDetails(response.data);
        console.log("response", response);
      })
      .catch((err) => {
        // notification.error({
        //   message: "Card details Failed",
        // });
        console.log("error", err);
      });
  };

  const handleUpdate = (a, b) => {
    console.log("updated", b);
    setDataIndex(b);
    setUpdateModal(true);
  };
  const columns = [
    {
      title: "Date Created",
      dataIndex: "created_at",
      render: (createdAt) => `${date(createdAt)}`,
    },
    {
      title: "GiftCard Currency",
      dataIndex: "GiftCardCurrency",
      render: (GiftCardCurrency) => `${GiftCardCurrency.name}`,
    },
    {
      title: "Physical Cards available",
      dataIndex: "physical",
      render: (ment, now) =>
        Object.keys(ment).map((item) => (
          <p>{Money(item, now.GiftCardCurrency.code)}</p>
        )),
    },
    {
      title: "Ecode Cards available",
      dataIndex: "ecode",
      render: (ment, now) =>
        Object.keys(ment).map((item) => (
          <p>{Money(item, now.GiftCardCurrency.code)}</p>
        )),
    },
    {
      title: "Edit",
      dataIndex: "uid",
      key: "x",
      render: (uid, a, b) => (
        <p style={{ cursor: "pointer" }} onClick={() => handleUpdate(uid, b)}>
          Edit Entry
        </p>
      ),
    },
    {
        title: "Delete",
        dataIndex: "uid",
        key: "x",
        render: (uid, a, b) => (
          <p style={{ cursor: "pointer" }} onClick={() => alert('not available')}>
            Delete Entry
          </p>
        ),
      },
    // {
    //   title: "Edit Card Entry",
    //   dataIndex: "uid",
    //   key: "x",
    //   render: (uid) => (
    //     <p style={{ cursor: "pointer" }} onClick={() => {
    //       // handleAction(uid)
    //       setEntryModal(true)
    //     }
    //       }>
    //       Edit Details
    //     </p>
    //   ),
    // },
  ];
  const onUpdateFinish = (values) => {
    console.log("Received values of form:", values);
    let data = {};
    for (const key in values.physical) {
      if (Object.hasOwnProperty.call(values.physical, key)) {
        const element = values.physical[key];
        data[element.cardValue] = element.value;
      }
    }
    console.log(data);

    let datae = {};
    for (const key in values.ecode) {
      if (Object.hasOwnProperty.call(values.ecode, key)) {
        const element = values.ecode[key];
        datae[element.cardValue] = element.value;
      }
    }
    console.log(datae);
  };

  const onCreateFinish = (values) => {
    console.log("Received values of form:", values);
    let data = {};
    for (let index = 0; index < values.physical.length; index++) {
      const element = values.physical[index];
      data[element.cardValue] = element.value;
    }
    console.log(data);

    let datae = {};
    for (let index = 0; index < values.ecode.length; index++) {
      const element = values.ecode[index];
      datae[element.cardValue] = element.value;
    }
    console.log(datae);
  };

  return (
    <div>
      {console.log("cards", props.cardCurrencies)}
      {createModal && (
        <ModalWrapper
          isModalVisible={createModal}
          setIsModalVisible={setCreateModal}
        >
          {/* {console.log('cards',props.cardCurrencies)} */}
          <Form
            name="dynamic_form_nest_item"
            onFinish={onCreateFinish}
            autoComplete="off"
          >
            <Form.Item>
              <Select
                // options={
                //   props.cardCurrency &&
                //   props.cardCurrency.currencies &&
                //   props.cardCurrency.currencies.map((item) => ({
                //     render: `${item.name}`,
                //     value: item,
                //   }))
                // }
              >
                {props.cardCurrency &&
                  props.cardCurrency.currencies &&
                  props.cardCurrency.currencies.map((item) => (
                    <Option>{item.name}</Option>
                  ))}
              </Select>
            </Form.Item>
            <Form.List name="physical">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, fieldKey, ...restField }) => (
                    <Space
                      key={key}
                      style={{ display: "flex", marginBottom: 8 }}
                      align="baseline"
                    >
                      <Form.Item
                        {...restField}
                        name={[name, "cardValue"]}
                        fieldKey={[fieldKey, "cardValue"]}
                        rules={[
                          { required: true, message: "Missing card value" },
                        ]}
                      >
                        <Input placeholder="Card Value" />
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        name={[name, "value"]}
                        fieldKey={[fieldKey, "value"]}
                        rules={[{ required: true, message: "Missing value" }]}
                      >
                        <Input placeholder="Our conversion" />
                      </Form.Item>
                      <MinusCircleOutlined onClick={() => remove(name)} />
                    </Space>
                  ))}
                  <Form.Item>
                    <Button
                      type="dashed"
                      onClick={() => add()}
                      block
                      icon={<PlusOutlined />}
                    >
                      Add Physical Card fields
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>
            <Form.List name="ecode">
              {(fields, { add, remove }) => (
                <>
                  {/* { key, name, fieldKey, ...restField } */}

                  {fields.map(({ key, name, fieldKey, ...restField }) => (
                    <Space
                      key={key}
                      style={{ display: "flex", marginBottom: 8 }}
                      align="baseline"
                    >
                      <Form.Item
                        {...restField}
                        name={[name, "cardValue"]}
                        fieldKey={[fieldKey, "cardValue"]}
                        rules={[
                          { required: true, message: "Missing card value" },
                        ]}
                      >
                        <Input placeholder="Card Value" />
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        name={[name, "value"]}
                        fieldKey={[fieldKey, "value"]}
                        rules={[{ required: true, message: "Missing value" }]}
                      >
                        <Input placeholder="Our conversion" />
                      </Form.Item>
                      <MinusCircleOutlined onClick={() => remove(name)} />
                    </Space>
                  ))}
                  <Form.Item>
                    <Button
                      type="dashed"
                      onClick={() => add()}
                      block
                      icon={<PlusOutlined />}
                    >
                      Add Ecode Card fields
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </ModalWrapper>
      )}
      {updateModal && (
        <ModalWrapper
          isModalVisible={updateModal}
          setIsModalVisible={setUpdateModal}
        >
          <Form
            name="dynamic_form_nest_item"
            onFinish={onUpdateFinish}
            autoComplete="off"
          >
            <Form.List name="physical">
              {(fields, { add, remove }) => (
                <>
                  {/* { key, name, fieldKey, ...restField } */}

                  {[
                    ...Object.keys(details.cardRateDetails[dataIndex].physical),
                  ].map((name, index) => (
                    <Space
                      key={name}
                      style={{ display: "flex", marginBottom: 8 }}
                      align="baseline"
                    >
                      <Form.Item
                        //   {...restField}
                        name={[name, "cardValue"]}
                        fieldKey={[name, "cardValue"]}
                        initialValue={name}
                        rules={[
                          { required: true, message: "Missing card value" },
                        ]}
                      >
                        <Input
                          placeholder="Card Value"
                          //   defaultValue={name}
                        />
                      </Form.Item>
                      <Form.Item
                        //   {...restField}
                        name={[name, "value"]}
                        fieldKey={[name, "value"]}
                        initialValue={
                          details.cardRateDetails[dataIndex].physical[name]
                        }
                        rules={[{ required: true, message: "Missing value" }]}
                      >
                        <Input placeholder="Our conversion" />
                      </Form.Item>
                      {/* <MinusCircleOutlined onClick={() => remove(index)} /> */}
                    </Space>
                  ))}
                  {/* <Form.Item>
                    <Button
                      type="dashed"
                      onClick={() => add()}
                      block
                      icon={<PlusOutlined />}
                    >
                      Add field
                    </Button>
                  </Form.Item> */}
                </>
              )}
            </Form.List>
            <div>Ecode</div>
            <Form.List name="ecode">
              {(fields, { add, remove }) => (
                <>
                  {[
                    ...Object.keys(details.cardRateDetails[dataIndex].ecode),
                  ].map((name, index) => (
                    <Space
                      key={name}
                      style={{ display: "flex", marginBottom: 8 }}
                      align="baseline"
                    >
                      <Form.Item
                        //   {...restField}
                        name={[name, "cardValue"]}
                        fieldKey={[name, "cardValue"]}
                        initialValue={name}
                        rules={[
                          { required: true, message: "Missing card value" },
                        ]}
                      >
                        <Input
                          placeholder="Card Value"
                          //   defaultValue={name}
                        />
                      </Form.Item>
                      <Form.Item
                        //   {...restField}
                        name={[name, "value"]}
                        fieldKey={[name, "value"]}
                        initialValue={
                          details.cardRateDetails[dataIndex].ecode[name]
                        }
                        rules={[{ required: true, message: "Missing value" }]}
                      >
                        <Input placeholder="Our conversion" />
                      </Form.Item>
                    </Space>
                  ))}
                </>
              )}
            </Form.List>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </ModalWrapper>
      )}
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
            cursor: "pointer",
          }}
          onClick={() =>
            props.setActive((state) => ({
              ...props.active,
              main: false,
              giftCards: true,
              entry: false,
            }))
          }
        >
          <ArrowLeftOutlined style={{ fontSize: 20, marginRight: 15 }} />
          <div style={{ fontSize: 20 }}>{props.active.name} Gift Entry</div>
        </div>
        <div>
          <Button
            type="primary"
            onClick={() => {
              setCreateModal(true);
              console.log("wow");
            }}
            style={{ marginRight: 20 }}
          >
            Add Entry
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
              transaction={details}
              fetchTrans={getWalletEntries}
              title={"GiftCards Entry"}
              data={details && details.cardRateDetails}
            />
          </Row>
        </Col>
      </Row>
    </div>
  );
}

const mapStateToProps = (state) => ({
  cardCurrency: state.all.cardCurrencies,
  loading: state.super.loading,
});

const mapDispatchToProps = (dispatch) => ({
  getCardCurr: () => {
    dispatch(getCardsCurrency());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GiftCardEntryDetails);
