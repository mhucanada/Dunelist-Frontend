import React, { useState, useEffect } from 'react'
import Task from './components/Task'
import Dropdown from './components/Dropdown'
import taskService from './services/tasks'
import categoryService from './services/category'

const App = () => {
	const [tasks, setTasks] = useState([])
	const [newTask, setNewTask] = useState('')
	const [newCategory, setNewCategory] = useState('')
	const [currentCategories, setCurrentCategories] = useState([])

	useEffect(() => {
		console.log('effect')
		taskService.getAll().then((initialTasks) => {
			setTasks(initialTasks)
		})
	}, [])

	useEffect(() => {
		console.log('categories')
		categoryService.getAll().then((categories) => {
			setCurrentCategories(categories)
		})
	}, [])

	const addTask = (event) => {
		event.preventDefault()
		const category = !newCategory.replace(/\s/g, '').length === true ? 'uncategorized' : newCategory

		const taskObject = {
			content: newTask,
			id: Math.random(10000000),
			status: false,
			category: category,
			date: Date(),
		}

		const existingCategories = currentCategories.includes(category)
		console.log(existingCategories)

		if (!existingCategories) {
			categoryService.create({
        category: category,
        id: Math.random(1000000000)
      }).then((returnedCategory) => {
        console.log(returnedCategory)
        //setCurrentCategories(currentCategories.concat(returnedCategory))
			})
		} 

		if (!newTask.replace(/\s/g, '').length) {
			alert('bruh this is empty or just whitespace')
			setNewTask('')
		} else {
			taskService.create(taskObject).then((returnedTask) => {
				setTasks(tasks.concat(returnedTask))
				setNewTask('')
				setNewCategory('')
			})
		}
	}

	const handleTaskChange = (event) => {
		console.log(event.target.value)
		setNewTask(event.target.value)
	}

	const handleCategoryChange = (event) => {
		setNewCategory(event.target.value)
	}

	const toggleFinished = (id) => {
		const task = tasks.find((n) => n.id === id)

		const changedTask = { ...task, status: !task.status }

		taskService.update(id, changedTask).then((returnedTask) => {
			setTasks(tasks.map((task) => (task.id !== id ? task : returnedTask)))
		})
	}

	const deleteTask = (id) => {
		if (window.confirm('Do you really want to delete this note')) {
			taskService.deleteTask(id)
			setTasks(tasks.filter((task) => task.id !== id))
		}
	}

	return (
		<div>
			<h2>Task List</h2>
			<div>
				{tasks.map((task, i) => (
					<Task
						key={i}
						task={task}
						toggleFinished={() => toggleFinished(task.id)}
						deleteTask={() => deleteTask(task.id)}
					/>
				))}
			</div>
			<form onSubmit={addTask}>
				<input value={newTask} onChange={handleTaskChange} />
				<input type='text' value={newCategory} onChange={handleCategoryChange} list='cats' />
				<datalist id='cats'>
					{currentCategories.map((category, i) => (
						<Dropdown key={i} category={category.category} />
					))}
				</datalist>
				<button type='submit'>save</button>
			</form>
			<div></div>
		</div>
	)
}

export default App
