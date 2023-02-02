import React, {useState} from 'react';
import './App.css';
import {Todolist, TaskType} from './Module/Todolist';
import {v1} from 'uuid';

export type FilterValuesType = "all" | "active" | "completed";
export type TodolistsType = {
    id: string
    title: string
    filter:FilterValuesType
}

function App() {
    let todolistID1 = v1()
    let todolistID2 = v1()

    let [todolists, setTodolists] = useState<Array<TodolistsType>>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, setTasks] = useState({
        [todolistID1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},

        ],
        [todolistID2]: [
            {id: v1(), title: 'Rest API', isDone: true},
            {id: v1(), title: 'GraphQL', isDone: false},
        ]
    })
    const changeStatus = (taskId:string , eventStatus:boolean) => {
        //setTasks
    }
    console.log()
    function removeTask(todolistID:string,id: string) {
        setTasks({...tasks,[todolistID]:tasks[todolistID].filter(t =>t.id!==id )});
    }

    function addTask(title: string) {
        let newTask = {id: v1(), title: title, isDone: false};

    }

   // let [filter, setFilter] = useState<FilterValuesType>("all");
    function changeFilter(todolistID:string,value: FilterValuesType) {
       // setFilter(value);
        setTodolists(todolists.map(el=>el.id===todolistID?{...el,filter:value}:el))
    }



    return (
        <div className="App">
            { todolists.map(el => {
                let tasksForTodolist = tasks[el.id];

                if (el.filter === "active") {
                    tasksForTodolist = tasks.filter(t => !t.isDone);
                }
                if (el.filter === "completed") {
                    tasksForTodolist = tasks.filter(t => t.isDone);
                }
                return(<Todolist
                                 key={el.id}
                                 todolistID={el.id}
                                 title={el.title}
                                 tasks={tasksForTodolist}
                                 removeTask={removeTask}
                                 changeFilter={changeFilter}
                                 addTask={addTask}
                                 changeStatus={changeStatus}
                                 filter={el.filter}
                />)
                })
            }
        </div>
    );
}

export default App;
