import React, { useState, useEffect } from 'react'
import Task from './components/Task'
import taskService from './services/tasks'

const App = () => {
	const [tasks, setTasks] = useState([])
	const [newTask, setNewTask] = useState('')

	useEffect(() => {
		console.log('effect')
		taskService.getAll().then((initialTasks) => {
			setTasks(initialTasks)
		})
	}, [])

	const addTask = (event) => {
		event.preventDefault()

		const taskObject = {
			content: newTask,
      id: Math.random(10000000),
      status: false
		}

		if (!newTask.replace(/\s/g, '').length) {
      alert("bruh this is empty or just whitespace")
      setNewTask('')
		} else {
			taskService.create(taskObject).then((returnedTask) => {
				setTasks(tasks.concat(returnedTask))
				setNewTask('')
			})
		}
	}

	const handleTaskChange = (event) => {
		console.log(event.target.value)
		setNewTask(event.target.value)
  }
  
  const toggleFinished = (id) => {
    const task = tasks.find(n => n.id === id)

    const changedTask = { ...task, status: !task.status }

    taskService
    .update(id, changedTask)
    .then(returnedTask => {
      setTasks(tasks.map(task => task.id !==id ? task : returnedTask))
    })
  }

	return (
		<div>
			<h2>Task List</h2>
			<ul>
				{tasks.map((task, i) => (
					<Task key={i} task={task} toggleFinished={() => toggleFinished(task.id)}/>
				))}
			</ul>
			<form onSubmit={addTask}>
				<input value={newTask} onChange={handleTaskChange} />
			</form>
		</div>
	)
}

export default App
