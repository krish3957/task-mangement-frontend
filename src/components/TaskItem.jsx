import React from 'react';
import { useDrag } from 'react-dnd'
const TaskItem = ({ task, onDrop }) => {
    const [, drag] = useDrag({
      type: 'TASK',
      item: { task },
    });
  
    return (
      <div ref={drag} className="task-item">
        {task}
      </div>
    );
  };

export default TaskItem;
