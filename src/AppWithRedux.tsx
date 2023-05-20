import React, {Reducer, useCallback, useReducer, useState} from 'react';
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
import {AppRooStateType} from "./state/store";

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
    console.log("AppWithRedux form called")

    const dispatch = useDispatch();
    const todolists = useSelector<AppRooStateType,TodolistType[]>((state) => state.todolists)
    const tasks = useSelector<AppRooStateType,TasksStateType>((state) => state.tasks)


    const removeTask = useCallback((todolistID: string, id: string) => {
        dispatch(removeTaskAC(todolistID, id))
    },[dispatch])

    const addTask = useCallback((todolistID: string, title: string) => {
        dispatch(addTaskAC(todolistID, title))
    },[dispatch])

    const changeFilter = useCallback((filter: FilterValuesType, id: string,) => {
        const action = changeTodolistStatusAC(id, filter)
       dispatch(action)
    },[dispatch])

    const changeStatus = useCallback((id: string, isDone: boolean, todolistId: string) => {
        const action = ChangeStatusTaskAC({id,isDone,todolistId})
        dispatch(action)
    },[dispatch])

    const changeTaskTitle = useCallback(
        (todolistID: string,
         id: string,
         newTitle: string) => {
        const action = ChangeTitleTaskAC(todolistID, id, newTitle)
        dispatch(action)
    },[dispatch])

    const removeTodolist = useCallback((todolistID: string) => {
        const action = removeTodolistAC(todolistID)
        dispatch(action)
    },[dispatch])

    const changeTodolistTitle = useCallback((id: string, title: string) => {
        const action = changeTodolistTitleAC(id, title)
        dispatch(action)
    },[dispatch])



    const addTodolist = useCallback((title: string) => {
        const action = addTodolistAC(title)
        dispatch(action)
    },[dispatch])

    return (
        <div className="App">
            <AddItemForm addItem={addTodolist}/>
            {
                todolists.map(tl => {
                    let allTodolistTasks = tasks[tl.id];
                    let tasksForTodolist = allTodolistTasks;

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

