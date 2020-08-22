import React from 'react';

const Task = ({ task, toggleFinished, deleteTask }) => {
    const label = task.status
    ? 'finished' : 'not finished'


    return (
        <div class = "tasks">
            {/*<button onClick={toggleFinished}>{label}</button>*/}
            <input type="checkbox" id="myCheck" onClick="myFunction()"></input>
            {task.content}
            <button onClick={deleteTask}>x</button>
        </div>
    );
};


export default Task;