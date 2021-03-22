import React, { useContext } from "react";
import { Modal, Input, message } from 'antd';
import { ScrumboardProvider, ScrumboardContext } from "./ScrumboardContext";
import Board from "./Board";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import reorder from "./reoreder";
import { Scrollbars } from "react-custom-scrollbars";
import { ExclamationCircleOutlined } from '@ant-design/icons';

const { confirm } = Modal;

function objws(params) {
	const a = params;
	let b = {
		SUBMITTED: [],
		PROCESSING: [],
		COMPLETED: [],
		DECLINED: [],
	};
	for (let i = 0; i < a.length; i++) {
		b[a[i].status.toString()] = b[a[i].status.toString()]
			? [...b[a[i].status.toString()], a[i]]
			: [a[i]];
		// console.log(b[a[i].status.toString()]);
	}
	return b;
}

const ScrumboardWrapper = (props) => {
  const [comment, setComment] = React.useState("");
  const [Trigger, setTrigger] = React.useState(false);
  const { updateOrdered, updateColumns } = useContext(
    ScrumboardContext
  );
  React.useEffect(() => {
    if(Trigger) {
      props.updateBuyGiftCardStatus({
        transactionId: Trigger.draggableId,
        status: Trigger.destination.droppableId,
        comment
      })
      setTrigger(false)
    }
    // eslint-disable-next-line
  }, [Trigger, ])

  const onDragEnd = (result) => {
		let columns = objws(props.contents.transactions);
		let ordered = Object.keys(columns);
    if (result.combine) {
      if (result.type === "COLUMN") {
        const shallow = [...ordered];
        shallow.splice(result.source.index, 1);
        updateOrdered(shallow);
        return;
      }

      const column = columns[result.source.droppableId];
      const withQuoteRemoved = [...column];
      withQuoteRemoved.splice(result.source.index, 1);
      const newColumns = {
        ...columns,
        [result.source.droppableId]: withQuoteRemoved,
      };
      updateColumns(newColumns);
      return;
    }

    if (!result.destination) {
      return;
    }

    if (result.destination.droppableId === "SUBMITTED") {
      message.error('Card can not go back to ' + result.destination.droppableId)
      return;
    }

    if (
      result.destination.droppableId === "PROCESSING" &&
      result.source.droppableId !== "SUBMITTED"
    ) {
      message.error('Card can not go back to ' + result.destination.droppableId)
      return;
    }

    const source = result.source;
    const destination = result.destination;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    if (result.type === "COLUMN") {
      const newOrdered = reorder(ordered, source.index, destination.index);
      updateOrdered(newOrdered);
      return;
    }

    if(result.destination.droppableId === "DECLINED") {
      confirm({
        title: `Do you Want to Move this card to ${ result.destination.droppableId}?`,
        icon: <ExclamationCircleOutlined />,
        content: (
          <div>
            <p>Please state reason for this action</p>
            <Input.TextArea size="large" placeholder="Comment must be morethan 10 characters" minLength={10} onChange={(e) => setComment(e.target.value)} />
            <span className="text-muted">Comment must be more than 10 characters.</span>
          </div>
        ),
        onOk() {
          setTrigger(result)
        },
        onCancel() {
          console.log('Cancel');
        },
      });

    } else {
      confirm({
        title: `Do you Want to Move this card to ${ result.destination.droppableId}?`,
        icon: <ExclamationCircleOutlined />,
        content: 'Note: This action is irreversible',
        onOk() {
          return props.updateBuyGiftCardStatus({
            transactionId: result.draggableId,
            status: result.destination.droppableId
          })
        },
        onCancel() {
          console.log('Cancel');
        },
      });
    }
  };

  return (
    <>
      <DragDropContext onDragEnd={(result) => onDragEnd(result)}>
        {props.containerHeight ? (
          <div className="scrumboard">
            <BoardWrapper {...props} />
          </div>
        ) : (
          <BoardWrapper {...props} />
        )}
      </DragDropContext>
    </>
  );
};

const BoardWrapper = ({
  containerHeight,
  useClone,
  isCombineEnabled,
  withScrollableColumns,
  contents,
  openTrans,
}) => {

  return (
    <Droppable
      droppableId="board"
      type="COLUMN"
      direction="horizontal"
      ignoreContainerClipping={containerHeight}
      isCombineEnabled={isCombineEnabled}
    >
      {(provided) => (
        <div
          className="scrumboard"
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          <div className="scrumboard-header">
            <div>
              <h3>All Buy Gift Card Transaction</h3>
            </div>
          </div>
          <Scrollbars className="scrumboard-body">
            {["SUBMITTED", "PROCESSING", "COMPLETED", "DECLINED"].map(
              (key, index) => (
                <Board
                  key={key}
                  index={index}
                  title={key}
                  contents={contents?.transactions && objws(contents?.transactions)[key]}
                  isScrollable={withScrollableColumns}
                  isCombineEnabled={isCombineEnabled}
                  useClone={useClone}
                  openTrans={openTrans}
                />
              )
            )}
          </Scrollbars>
        </div>
      )}
    </Droppable>
  );
};

const Scrumboard = (props) => {
  return (
    <ScrumboardProvider>
      <ScrumboardWrapper {...props} />
    </ScrumboardProvider>
  );
};

export default Scrumboard;
