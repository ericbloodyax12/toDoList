import React, {useCallback} from 'react';
import './app.css';
import {useSelector} from "react-redux";
import {AppRootStateType, useAppDispatch} from "../state/store";
import {FilterValuesType, postTodosTC, TodolistDomainType, TodolistType} from "../state/todolists-reducer";

import {TaskType} from "../api/todolist-api";
import {TodoListsList} from "../features/todoListsList/TodoListsList";
import {AddItemForm} from "../components/AddItemForm/AddItemForm";


export type AppWithReduxPropsType = FilterValuesType | TodolistType | TasksStateType | TodoListsListType

type TodoListsListType = {
    todolists: TodolistDomainType[]
}
export type TasksStateType = {
    [key: string]: Array<TaskType>
}

export function App(props: AppWithReduxPropsType) {
    const dispatch = useAppDispatch();
    const todolists = useSelector<AppRootStateType, TodolistDomainType[]>((state) => state.todolists)
    const addTodolist = useCallback((title: string) => {
        const action = postTodosTC(title)
        dispatch(action)
    }, [dispatch])
    return (
        <div className="App">
            <AddItemForm addItem={addTodolist}/>
            <TodoListsList todolists={todolists}/>
        </div>
    );
}


