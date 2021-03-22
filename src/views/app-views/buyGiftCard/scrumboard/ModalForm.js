import React, {  } from 'react'
import { 
	Modal} from 'antd';
import { modalModeTypes } from './utils';

const getModalTitle = type => {
	switch (type) {
		case modalModeTypes(0):
			return 'New card';
		case modalModeTypes(2):
			return 'New board';
		default:
			return;
	}
} 

const ModalForm = ({ visible, modalMode, cardData, listId, onClose, onModalSubmit }) => {

	const showClosable = modalMode === modalModeTypes(1) ? false : true
	const modalWidth = modalMode === modalModeTypes(1) ? 800 : 425;

	return (
		<Modal
			title={getModalTitle(modalMode)}
			visible={visible}
			closable={showClosable}
			footer={null}
			width={modalWidth}
			style={modalMode === modalModeTypes(1)? {top: 20} : null}
			destroyOnClose
			onCancel={() => onClose()}
		>
			<div style={modalMode === modalModeTypes(1)? {maxHeight: '85vh', overflowY: 'auto', overflowX: 'hidden'} : null}>
				<div className={modalMode === modalModeTypes(1)? 'mr-2 ml-2' : null}>

				</div>
			</div>
		</Modal>
	)
}

export default ModalForm
