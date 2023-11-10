import "./App.css";
import React, { useEffect, useState } from "react";
import Todo from "./components/Todo";
import Form from "./components/Form";
import FilterButton from "./components/FilterButton";
import { nanoid } from "nanoid";
import axios from 'axios';

function App() {
  
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("All");


  useEffect(() => {
    axios.get('http://localhost:4000/app/get').then((response) => {
      setTasks(response.data);
    })
  });

  const filterMap = {
    All: () => true,
    Active: (task) => !task.completed,
    Completed: (task) => task.completed,
  };
  
  const taskList = tasks
  .filter(filterMap[filter])
  .map((task) => (
  <Todo 
    id={task.id}
    name={task.name}
    completed={task.completed}
    key={task.id}
    toggleTaskCompleted = {toggleTaskCompleted}
    deleteTask = {deleteTask}
    editTask = {editTask}
  />)
  );


  const filterNames = Object.keys(filterMap);

  const headingText = `${taskList.length} tasks remaining`;

  const filterList = filterNames.map((name) => (
    <FilterButton 
      key = {name} 
      name = {name} 
      isPressed = {name === filter} 
      setFilter = {setFilter}
    />
  ));

  function addTask(newName) {
    axios.post("http://localhost:4000/app/post", {
      id: `todo-${nanoid()}`,
      name: newName,
      completed: false,
    });
  }

  function toggleTaskCompleted(id, completed){

    axios.put(`http://localhost:4000/app/putToggle/${id}`, {completed: !completed})
    .then(response =>{
      setTasks(response.data.tasks);
    })
    .catch(error => {
      console.error("Error fetching data:", error);
    });
  }

  function deleteTask(id){

    axios.delete(`http://localhost:4000/app/delete/${id}`)
    .then(responce => {
      setTasks(responce.data.tasks);
    })
    .catch(error => {
      console.error("Error fetching data:", error);
    });
  }

  function editTask(id, newName){

    axios.put(`http://localhost:4000/app/putName/${id}`, {name: newName})
    .then(response =>{
      const updatedTasks = response.data.tasks;
      setTasks(updatedTasks);
    })
    .catch(error => {
      console.error("Error fetching data:", error);
    });

    
  }

  return (
    <div className="todoapp stack-large">
      <h1>TodoMatic</h1>
      <Form addTask = {addTask}/>
      <div className="filters btn-group stack-exception">
        {filterList}
      </div>
      <h2 id="list-heading">{headingText}</h2>
      <ul
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading">
        {taskList}
      </ul>
    </div>
  )
  
}

export default App;
