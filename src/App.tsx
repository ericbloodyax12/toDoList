import React, {useEffect, useState} from 'react';
import {TaskType} from "./ToDoList"
import './App.css';
import {ToDoList} from './ToDoList'


export type FiltredValuesType = "All" | "Active" | "Completed"

function App() {
    const shapka1 = "menu1"

    let [tasks, setTasks] = useState<Array<TaskType>>(
        [
            {id: 1, title: "HTML&CSS", isDone: true},
            {id: 2, title: "JS", isDone: true},
            {id: 3, title: "ReactJS", isDone: false}
        ])
    const removeTask = (taskId: number) => {

        //  tasks = tasks.filter(task=>task.id !== taskId)
        setTasks(tasks.filter(el => el.id !== taskId))
       // console.log([tasks, setTasks])
    }
    useEffect(() => {
        console.log([tasks, setTasks])
    }, [tasks])
    const [filter, setFilter] = useState<FiltredValuesType>("All")
    const changeFilter = (filter:FiltredValuesType)=>{
        setFilter(filter)
    }
    const getFiltredTasks = (tasks: TaskType[], filter: FiltredValuesType): TaskType[] => {
        switch (filter) {
            case "Active":
                return tasks.filter(task => task.isDone === false)
            case "Completed":
                return tasks.filter(task => task.isDone === true)
            default:
                return tasks
        }
        }
        /*  if (filter === "Active") {
            return tasks.filter((task) => task.isDone === false)
        } else if (filter === "Completed") {
            return tasks.filter((task) => task.isDone === true)
        } else {
            return tasks
        }*/

    const filtredTasksValue = getFiltredTasks(tasks, filter);

    return (
        <div className="App">
            <ToDoList
                shapka1={shapka1}
                tasks={filtredTasksValue}
                removeTask={removeTask}
                changeFilter={changeFilter}
            />

        </div>
    );
}

export default App;
