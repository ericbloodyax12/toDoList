import React, {useCallback} from 'react';
import './app.css';
import {useSelector} from "react-redux";
import {AppRootStateType, useAppDispatch, useAppSelector} from "../state/store";
import {FilterValuesType, postTodosTC, TodolistDomainType, TodolistType} from "../state/todolists-reducer";

import {TaskType} from "../api/todolist-api";
import {TodoListsList} from "../features/todoListsList/TodoListsList";
import {AddItemForm} from "../components/AddItemForm/AddItemForm";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import LinearProgress from '@mui/material/LinearProgress'
import {RequestStatusType} from "./app-reducer";


export type AppWithReduxPropsType = FilterValuesType | TodolistType | TasksStateType | TodoListsListType

type TodoListsListType = {
    todolists: TodolistDomainType[]
}
export type TasksStateType = {
    [key: string]: Array<TaskType>
}

export function App(props: AppWithReduxPropsType) {
    const status = useAppSelector<RequestStatusType>((state) => state.app.status )
    const dispatch = useAppDispatch();
    const todolists = useSelector<AppRootStateType, TodolistDomainType[]>((state) => state.todolists)
    const addTodolist = useCallback((title: string) => {
        const action = postTodosTC(title)
        dispatch(action)
    }, [dispatch])
    return (
        <div className="App">

            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
                {status === "loading" &&  <LinearProgress color="secondary" />}
            </AppBar>

            <AddItemForm addItem={addTodolist}/>
            <TodoListsList todolists={todolists}/>

        </div>
    );
}


