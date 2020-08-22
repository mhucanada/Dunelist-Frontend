import React from 'react';

const Task = ({ task }) => {
    return (
        <li>{task.content}</li>
    );
};

export default Task;