import React, {useCallback, useEffect} from 'react';
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
import {CustomizedSnackbars} from "../components/ErrorSnackBar/ErrorSnackBar";
import {Login} from "../features/login/login";
import {Navigate, Route, Routes} from "react-router-dom";
import {logOutTC, meTC} from "../features/login/auth-reducer";
import {CircularProgress} from "@mui/material";



export type AppWithReduxPropsType = FilterValuesType | TodolistType | TasksStateType | TodoListsListType | TodolistDomainType


type TodoListsListType = {
    todolists: TodolistDomainType[]
}
export type TasksStateType = {
    [key: string]: Array<TaskType>
}

export function App(props: AppWithReduxPropsType) {
    const status = useAppSelector<RequestStatusType>((state) => state.app.status )
    const isInitialized = useAppSelector<boolean>((state) => state.app.isInitialized )
    const isLoggedIn = useAppSelector<boolean>((state) => state.auth.isLoggedIn )
    const dispatch = useAppDispatch();
    const todolists = useSelector<AppRootStateType, TodolistDomainType[]>((state) => state.todolists)


    const logOutHandler = () => {
        dispatch(logOutTC())

    }

    useEffect(() => {
        dispatch(meTC());
    },[])

    if (!isInitialized) {
        return <div
        style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
        <CircularProgress/>
        </div>
    }


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
                    {isLoggedIn && <Button color="inherit" onClick={logOutHandler}>Logout</Button>}



                </Toolbar>
                {status === "loading" &&  <LinearProgress color="secondary" />}
            </AppBar>
            <Routes>
                <Route path = {"/"} element = {<TodoListsList todolists={todolists} entityStatus={status}/>}/>
                <Route path = {"/login"} element = {<Login/>}/>
                <Route path = {"/404"} element = {<h1>Sorry 404 page is not found</h1>}/>
                <Route path = {"*"} element = {<Navigate to= "/login"/>}/>
            </Routes>
            <CustomizedSnackbars />
        </div>
    );
}


