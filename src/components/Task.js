import React from 'react';

const Task = ({ task, toggleFinished, deleteTask }) => {
    const label = task.status
    ? 'finished' : 'not finished'

    return (
        <div>
            {task.content}
            <button onClick={toggleFinished}>{label}</button>
            <button onClick={deleteTask}>x</button>
        </div>
    );
};

export default Task;