import React from 'react'
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { Card } from 'antd';
import { Scrollbars } from 'react-custom-scrollbars';

const InnerCardList = React.memo(function InnerCardList(props) {
  return props.contents?.map((item, index) => (
    <Draggable key={item.id.toString()} draggableId={item.id.toString()} index={parseInt(index)}>
      {( dragProvided, dragSnapshot) => (
        <div
          className='mb-3'
          key={item.id}
					ref={dragProvided.innerRef}
					{...dragProvided.draggableProps}
					{...dragProvided.dragHandleProps}
        >
          <Card
            hoverable
            className='board-card d-flex flex-column'
            cover={null}
            onClick={() => props.cardData(item.id)}
          >
            <div style={{display: "flex", flexDirection: "column"}}>
              <h4 className="mb-2">{item.card_slug}</h4>
              <span><strong>Date:</strong> {new Date(item.created_at).toLocaleString()}</span>
              <span style={{wordWrap: "break-word"}}><strong>Status:</strong> {item?.status}</span>
              <span style={{wordWrap: "break-word"}}><strong>Ref:</strong> {item?.reference}</span>
              <span style={{wordWrap: "break-word"}}><strong>Ref Currency:</strong> {item?.description}</span>
              <span style={{wordWrap: "break-word"}}><strong>Total Estimated Amount:</strong> {item && item.card_detail && parseFloat(item?.card_detail.value) * parseFloat(item.rate) *item.card_detail.quantity}</span>
            </div>
          </Card>
				</div>
      )}
    </Draggable>
  ));
});

function InnerList(props) {
  const { contents, dropProvided, cardData, listId } = props;

  return (
    <div className="board-dropzone" ref={dropProvided.innerRef}>
      <InnerCardList cardData={cardData} contents={contents} listId={listId}/>
      {dropProvided.placeholder}
    </div>
  );
}

// function SubIndicator(props) {
//   if(props.counts) {
//     return (
//       <p className="mb-0 mr-2">
//         {props.icon}
//         <span className="ml-1">{props.counts}</span>
//       </p>
//     )
//   }
//   return null
// }

export default function BoardCard(props) {
	const {
    ignoreContainerClipping,
    internalScroll,
    scrollContainerStyle,
    isDropDisabled,
    isCombineEnabled,
    listId = 'LIST',
    listType,
    style,
    contents,
    useClone,
    cardData
  } = props;
	return (
    <>
      <Droppable
        droppableId={listId}
        type={listType}
        ignoreContainerClipping={ignoreContainerClipping}
        isDropDisabled={isDropDisabled}
        isCombineEnabled={isCombineEnabled}
        renderClone={useClone}
      >
        {(
          dropProvided,
          dropSnapshot,
        ) => (
          <Scrollbars style={style} className="board-wrapper" autoHide {...dropProvided.droppableProps}>
            {internalScroll ? (
              <div className="board-scrollContainer" style={scrollContainerStyle}>
                <InnerList
                  contents={contents}
                  listId={listId}
                  cardData={cardData}
                  dropProvided={dropProvided}
                />
              </div>
            ) : (
              <InnerList
                contents={contents}
                listId={listId}
                cardData={cardData}
                dropProvided={dropProvided}
              />
            )}
          </Scrollbars>
        )}
      </Droppable>
    </>
  );
}