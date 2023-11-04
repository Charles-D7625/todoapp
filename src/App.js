import "./App.css";
import React, { useState } from "react";
import Todo from "./components/Todo";
import Form from "./components/Form";
import FindTask from "./components/FindTask";
import FilterButton from "./components/FilterButton";
import { nanoid } from "nanoid";

function App(props) {
  
  const [tasks, setTasks] = useState(props.tasks);
  const [filter, setFilter] = useState("All");
  const [foundTask, setFoundTask] = useState("");

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

  function addTask(name) {
    const newTask = {id: `todo-${nanoid()}`, name, completed: false};
    setTasks([...tasks, newTask]);
  }

  function findTask(name) {
    setFoundTask(name);
  }

  function toggleTaskCompleted(id){

    const updatedTasks = tasks.map((task) => {
      if (id === task.id) {
        return {...task, completed: !task.completed};
      }
      
      return task;
    });

    setTasks(updatedTasks);
  }

  function deleteTask(id){
    const remainingTasks = tasks.filter((task) => id !== task.id);
    setTasks(remainingTasks);
  }

  function editTask(id, newName){
    const editedTaskList = tasks.map((task) => {
      
      if (id === task.id){
        return {...task, name: newName};
      }

      return task;
    });

    setTasks(editedTaskList);
  }
  return (
    <div className="todoapp stack-large">
      <h1>TodoMatic</h1>
      <Form addTask = {addTask}/>
      <FindTask findTask = {findTask}/>
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
