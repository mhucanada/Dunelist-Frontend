import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Task from './components/Task'

const App = () => {
  const [tasks, setTasks] = useState([])
  const [newTask, setNewTask] = useState('')

  useEffect(() => {
    console.log('effect')
    axios
    .get('http://localhost:3001/tasks')
    .then(response => {
      console.log('promise fulfilled')
      setTasks(response.data)
      console.log(response.data)
    })
  }, [])

  const addTask = (event) => {
    event.preventDefault()

    
  }

  return (
    <div>
      <h2>Task List</h2>
      <ul>
        {tasks.map((task, i) => 
          <Task key={i} task={task} />
          )}
      </ul>
    </div>
  );
};

export default App;