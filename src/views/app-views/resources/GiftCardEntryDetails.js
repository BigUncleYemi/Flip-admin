import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import DataTable from "components/layout-components/DataTable";
import {
    Row,
    Col,
    notification,
  } from "antd";
import AppFetch from "auth/FetchInterceptor";

function GiftCardEntryDetails(props) {
    const [details, setDetails] = useState([])

    useEffect(() => {
        getWalletEntries(props.uid)
    }, [])


    const getWalletEntries = (uid) => {
        AppFetch({
      url: `/cards/${uid}`,
      method: "get",
    })
      .then((response) => {
        notification.success({
          message: "Successful",
        });
        console.log('response',response)
      })
      .catch((err) => {
        notification.error({
          message: "Card details Failed",
        });
        console.log('error',err)
      });
    }
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
          title: "GiftCardCurrency",
          dataIndex: "GiftCardCurrency",
          render:(GiftCardCurrency) => `${GiftCardCurrency.name}`
        },
        // {
        //   title: "View Details",
        //   dataIndex: "uid",
        //   key: "x",
        //   render: (uid) => (
        //     <p style={{ cursor: "pointer" }} onClick={() => handleAction(uid)}>
        //       View Details
        //     </p>
        //   ),
        // },
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
          <Row gutter={16}>
            <DataTable
              columns={columns}
              transaction={details}
              fetchTrans={getGiftCard}
              title={"GiftCards"}
              data={details && giftCards.cards}
            />
          </Row>
        </Col>
      </Row>
        </div>
    )
}
export default connect()(GiftCardEntryDetails)