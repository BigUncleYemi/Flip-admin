import React from 'react'
import { connect } from 'react-redux'
import ModalWrapper from "components/layout-components/Modal";
import styles from "../../styles.module.scss";

function GiftCardEntry(props) {
    return (
        <ModalWrapper
        isModalVisible={props.isModalVisible}
        setIsModalVisible={props.setIsModalVisible}
        className={styles.withdrawInitial}
        showClose="no"
        showCancel
        >
            <div>
                something sha
            </div>
        </ModalWrapper>
    )
}



export default connect()(GiftCardEntry)