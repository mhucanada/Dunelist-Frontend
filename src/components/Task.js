import React from 'react';

const Task = ({ task, toggleFinished }) => {
    const label = task.status
    ? 'finished' : 'not finished'

    return (
        <li>
            {task.content}
            <button onClick={toggleFinished}>{label}</button>
        </li>
    );
};

export default Task;