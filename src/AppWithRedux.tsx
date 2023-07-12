import React, {useCallback, useEffect} from 'react';
import './app.css';
import {Todolist} from './Todolist';
import {AddItemForm} from './components/AddItemForm/AddItemForm';
import {
    addTodolistAC,
    changeTodolistStatusAC,
    changeTodolistTitleAC,
    FilterValuesType,
    getTodosTC,
    removeTodolistAC, TodolistDomainType,
    TodolistType
} from "./state/todolists-reducer";
import {ChangeStatusTaskAC, ChangeTitleTaskAC, deleteTasksTC, postTasksTC} from "./state/tasks-reducer";
import {useSelector} from "react-redux";
import {AppRooStateType, useAppDispatch, useAppSelector} from "./state/store";
import {TaskStatuses, TaskType} from "./api/todolist-api";

export type AppWithReduxPropsType =  FilterValuesType | TodolistType | TasksStateType

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

export function AppWithRedux(props: AppWithReduxPropsType) {
    console.log("AppWithRedux form called")

    const dispatch = useAppDispatch();
    const todolists = useSelector<AppRooStateType,TodolistDomainType[]>((state) => state.todolists)
    const tasks = useAppSelector<TasksStateType>((state) => state.tasks)


    const removeTask = useCallback((todolistID: string, id: string) => {
        dispatch(deleteTasksTC(todolistID, id))
    },[dispatch])

    const addTask = useCallback((todolistID: string, title: string) => {
        dispatch(postTasksTC(todolistID, title))
    },[dispatch])

    const changeFilter = useCallback((filter: FilterValuesType, id: string,) => {
        const action = changeTodolistStatusAC(id, filter)
       dispatch(action)
    },[dispatch])

    const changeStatus = useCallback((id: string, completed: TaskStatuses, todolistId: string) => {
        const action = ChangeStatusTaskAC({id,completed,todolistId})
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

    useEffect(() =>  {
       dispatch(getTodosTC())

    },[])

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

