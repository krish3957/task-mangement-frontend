import React from 'react';
import {  useDrop } from 'react-dnd'
import TaskItem from './TaskItem';

const TaskList = ({ title, tasks, onDrop }) => {
    const [, drop] = useDrop({
      accept: 'TASK',
      drop: (item) => onDrop(item.task),
    });
  
    return (
      <div ref={drop} className="task-list">
        <h2>{title}</h2>
        {tasks.map((task, index) => (
          <TaskItem key={index} task={task} />
        ))}
      </div>
    );
  };

export default TaskList;
