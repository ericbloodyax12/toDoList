import React, {useState} from 'react';
import './App.css';
import {Todolist, TaskType} from './Module/Todolist';
import {v1} from 'uuid';

export type FilterValuesType = "all" | "active" | "completed";
export type TodolistType = {
    id: string
    title: string
    filter:FilterValuesType
}

function App() {
    let todolistID1 = v1()
    let todolistID2 = v1()

    let [todoLists, setTodoLists] = useState<Array<TodolistType>>([
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
    const changeStatus = (todolistID:string, taskId:string , isDone:boolean) => {
        setTasks({...tasks,[todolistID]:[...tasks[todolistID].map((t) => t.id===taskId ? {...t,isDone}:t)]})
    } // here isDone:isDone

    function removeTask(todolistID:string,id: string) {
        setTasks({...tasks,[todolistID]:tasks[todolistID].filter(t =>t.id!==id )});
    }

    function addTask(todolistID:string, title: string) {
        let newTask = {id: v1(), title: title, isDone: false};
        setTasks({...tasks, [todolistID]: [newTask,...tasks[todolistID]]
        } )
    }

    function changeFilter(todolistID:string,value: FilterValuesType) {
        setTodoLists(todoLists.map(el=>el.id===todolistID?{...el,filter:value}:el))
    }
    function deleteTodoList (todolistID:string) {
        setTodoLists(todoLists.filter((td)=> td.id!==todolistID))
        delete tasks[todolistID]
        console.log(tasks)
    }


    function addToDoListHandler(e:React.MouseEvent<HTMLElement>) {
        let newTodoListID = v1()
        let newTodoList:TodolistType = {id: newTodoListID, title: "new", filter: 'all'}
        setTodoLists([...todoLists,newTodoList])
        setTasks({...tasks,[newTodoListID]:[{id: v1(), title: "title", isDone: false}]})
    }

    return (
        <div className="todoLists-container">
            { todoLists.map(el => {
                let tasksForTodolist = tasks[el.id];

                if (el.filter === "active") {
                    tasksForTodolist = tasks[el.id].filter(t => !t.isDone);
                }
                if (el.filter === "completed") {
                    tasksForTodolist = tasks[el.id].filter(t => t.isDone);
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
                                 todoLists={todoLists}
                                 setTodoLists={setTodoLists}
                                 deleteTodoList={deleteTodoList}
                />)
                })
            }
            <button className="todoLists-container__add-button" onClick={addToDoListHandler}>+</button>
        </div>
    );
}



export default App;
