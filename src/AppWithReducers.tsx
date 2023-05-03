import React, {Reducer, useReducer, useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from './AddItemForm';
import {
    ActionType,
    addTodolistAC, changeTodolistStatusAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistsReducer
} from "./state/todolists-reducer";
import {
    addTaskAC,
    ChangeStatusTaskAC,
    ChangeTitleTaskAC,
    removeTaskAC,
    tasksReducer
} from "./state/tasks-reducer";

export type FilterValuesType = "all" | "active" | "completed";
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}


export function AppWithReducers() {
    function removeTask(todolistID: string, id:string) {
        const action = removeTaskAC( todolistID,id  )
        dispatchTasks(action)
    }

    function addTask(todolistID: string, title: string) {
        const action = addTaskAC( todolistID, title )
        dispatchTasks(action)
    }

    function changeFilter( filter: FilterValuesType,id: string,) {
        const action = changeTodolistStatusAC( id, filter)
        dispatchTodolists(action)
    }

    function changeStatus(id: string, isDone: boolean, todolistId: string) {
        const action = ChangeStatusTaskAC(id, isDone, todolistId)
        dispatchTasks(action)
    }
    function changeTaskTitle(todolistID:string, id:string, newTitle:string) {
        const action = ChangeTitleTaskAC( todolistID, id, newTitle )
        dispatchTasks(action)
    }

    function removeTodolist(todolistID: string) {
        const action = removeTodolistAC( todolistID)
        dispatchTodolists(action)
        dispatchTasks(action)
    }
    function changeTodolistTitle(id: string, title: string) {
        const action = changeTodolistTitleAC( id, title)
        dispatchTodolists(action)
    }

    let todolistID1 = v1();
    let todolistID2 = v1();


    let [todolists, dispatchTodolists] = useReducer<Reducer<Array<TodolistType>,ActionType>>(todolistsReducer, [
        {id: todolistID1, title: "What to learn", filter: "all"},
        {id: todolistID2, title: "What to buy", filter: "all"}
    ])

    let [tasks, dispatchTasks] = useReducer(tasksReducer,{
        [todolistID1]: [
            {id: "1", title: "HTML&CSS", isDone: true},
            {id: "2", title: "JS", isDone: true}
        ],
        [todolistID2]: [
            {id: "1", title: "Milk", isDone: true},
            {id: "2", title: "React Book", isDone: true},
            {id:"3", title: "New Book", isDone: true}
        ]
    });

    function addTodolist(title: string) {
        const action = addTodolistAC( title)
        dispatchTodolists(action)
        dispatchTasks(action)
    }

    return (
        <div className="App">
            <AddItemForm addItem={addTodolist} />
            {
                todolists.map(tl => {
                    let allTodolistTasks = tasks[tl.id];
                    let tasksForTodolist = allTodolistTasks;

                    if (tl.filter === "active") {
                        tasksForTodolist = allTodolistTasks.filter(t => t.isDone === false);
                    }
                    if (tl.filter === "completed") {
                        tasksForTodolist = allTodolistTasks.filter(t => t.isDone === true);
                    }

                    return <Todolist
                        key={tl.id}
                        id={tl.id}
                        title={tl.title}
                        tasks={tasksForTodolist}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeTaskStatus={changeStatus}
                        filter={tl.filter}
                        removeTodolist={removeTodolist}
                        changeTaskTitle={changeTaskTitle}
                        changeTodolistTitle={changeTodolistTitle}
                    />
                })
            }

        </div>
    );
}

