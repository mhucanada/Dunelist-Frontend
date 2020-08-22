import React from 'react';

const Task = ({ task, toggleFinished, deleteTask }) => {
/*     const label = task.status
    ? 'finished' : 'not finished'
 */
    return (
        <div>
            {/*<button onClick={toggleFinished}>{label}</button>*/}
            <input type="checkbox" id="myCheck" onClick={toggleFinished}></input>
            {task.content}
            <button onClick={deleteTask}>x</button>
        </div>
    );
};

export default Task;