import React from 'react';
import {DragSource, DropTarget} from 'react-dnd';
import ItemTypes from '../constants/itemTypes';

// beginDrag handler
// we can set the initial state for dragging here.
const noteSource = {
    beginDrag(props) {
        return {
            id: props.id
        };
    },
    isDragging(props, monitor) {
        return props.id === monitor.getItem().id;
    }
}



// Both decorators give us access to the Note props. In this case , we are using
// monitor.getItem() to access them at noteTarget. This is the key to making this
// to work properly.
const noteTarget = {
    hover(targetProps, monitor) {
      const targetId = targetProps.id;
      const sourceProps = monitor.getItem();
      const sourceId = sourceProps.id;

      if (sourceId !== targetId) {
        targetProps.onMove({sourceId, targetId});
      }
    }
};

@DragSource(ItemTypes.NOTE, noteSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging() // map isDragging() state to isDragging prop
}))

@DropTarget(ItemTypes.NOTE, noteTarget, (connect) => ({
  connectDropTarget: connect.dropTarget()
}))


export default class Note extends React.Component {

    render(){
       const {connectDragSource, connectDropTarget, isDragging,
              id, onMove, editing, ...props} = this.props;
       // Pass through if we are editing
       const dragSource = editing ? a => a : connectDragSource;
       return dragSource(connectDropTarget(
          <li style={{
            opacity: isDragging ? 0 : 1
          }} {...props}>{props.children}</li>
       ));
    }
}
