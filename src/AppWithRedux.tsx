import React, {Reducer, useReducer, useState} from 'react';
import './app.css';
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
import {useDispatch, useSelector} from "react-redux";
import {AppRooState} from "./state/store";

type AppWithReduxPropsType = TodolistType | FilterValuesType | TodolistType | TasksStateType
export type FilterValuesType = "all" | "active" | "completed";
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

export function AppWithRedux(props: AppWithReduxPropsType) {
    

    const dispatch = useDispatch();
    const todolists = useSelector<AppRooState,TodolistType[]>((state) => state.todolists)
    const tasks = useSelector<AppRooState,TasksStateType>((state) => state.tasks)


    function removeTask(todolistID: string, id: string) {
        dispatch(removeTaskAC(todolistID, id))
    }

    function addTask(todolistID: string, title: string) {
        dispatch(addTaskAC(todolistID, title))
    }

    function changeFilter(filter: FilterValuesType, id: string,) {
        const action = changeTodolistStatusAC(id, filter)
       dispatch(action)
    }

    function changeStatus(id: string, isDone: boolean, todolistId: string) {
        const action = ChangeStatusTaskAC({id,isDone,todolistId})
        dispatch(action)
    }

    function changeTaskTitle(todolistID: string, id: string, newTitle: string) {
        const action = ChangeTitleTaskAC(todolistID, id, newTitle)
        dispatch(action)
    }

    function removeTodolist(todolistID: string) {
        const action = removeTodolistAC(todolistID)
        dispatch(action)
    }

    function changeTodolistTitle(id: string, title: string) {
        const action = changeTodolistTitleAC(id, title)
        dispatch(action)
    }



    function addTodolist(title: string) {
        const action = addTodolistAC(title)
        dispatch(action)
    }

    return (
        <div className="App">
            <AddItemForm addItem={addTodolist}/>
            {
                todolists.map(tl => {
                    let allTodolistTasks = tasks[tl.id];
                    let tasksForTodolist = allTodolistTasks;
                    console.log(tasks,[tl.id])

                    if (tl.filter === "active") {
                        tasksForTodolist = allTodolistTasks.filter((t: TaskType) => t.isDone === false);
                    }
                    if (tl.filter === "completed") {
                        tasksForTodolist = allTodolistTasks.filter((t: TaskType) => t.isDone === true);
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

