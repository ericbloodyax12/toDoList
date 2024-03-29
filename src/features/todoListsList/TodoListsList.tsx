import React, {useCallback, useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../state/store";
import {changeStatusTaskTC, ChangeTitleTaskAC, deleteTasksTC, getTasksTC, postTasksTC} from "../../state/tasks-reducer";
import {
    changeTodolistStatusAC,
    deleteTodosTC,
    FilterValuesType,
    getTodosTC,
    postTodosTC,
    putTitleTodosTC, TodolistDomainType
} from "../../state/todolists-reducer";
import {TaskStatuses} from "../../api/todolist-api";
import {AddItemForm} from "../../components/AddItemForm/AddItemForm";
import "./todolist/todolist.css"
import {TasksStateType} from "../../app/App";
import {Todolist} from "./todolist/Todolist";
import {RequestStatusType} from "../../app/app-reducer";
import {Navigate} from "react-router-dom";

type TodoListsListType = {
    todolists: TodolistDomainType[]
    entityStatus: RequestStatusType
}
export const TodoListsList: React.FC<TodoListsListType> = (props) => {

    const dispatch = useAppDispatch();
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const tasks = useAppSelector<TasksStateType>((state) => state.tasks)

    useEffect(() => {
        if (!isLoggedIn) return;
        dispatch(getTodosTC())
    }, [])
    const removeTask = useCallback((todolistID: string, id: string) => {
        dispatch(deleteTasksTC(todolistID, id))
    }, [dispatch])
    const addTask = useCallback((todolistID: string, title: string) => {
        dispatch(postTasksTC(todolistID, title))
    }, [dispatch])
    const changeFilter = useCallback((filter: FilterValuesType, id: string,) => {
        const action = changeTodolistStatusAC(id, filter)
        dispatch(action)
    }, [dispatch])
    const changeStatus = useCallback((id: string, status: TaskStatuses, todolistId: string) => {
        dispatch(changeStatusTaskTC(todolistId, id, status))
    }, [dispatch])
    const changeTaskTitle = useCallback(
        (todolistID: string,
         id: string,
         newTitle: string) => {
            const action = ChangeTitleTaskAC(todolistID, id, newTitle)
            dispatch(action)
        }, [dispatch])
    const removeTodolist = useCallback((todolistID: string) => {
        const action = deleteTodosTC(todolistID)
        dispatch(action)
    }, [dispatch])
    const changeTodolistTitle = useCallback((id: string, title: string) => {
        const action = putTitleTodosTC(id, title)
        dispatch(action)
    }, [dispatch])
    const addTodolist = useCallback((title: string) => {
        const action = postTodosTC(title)
        dispatch(action)
    }, [dispatch])


     if (!isLoggedIn) return <Navigate to={"/login"}/>

    return <div className="Todolist_div">
        <AddItemForm addItem={addTodolist} disabled={props.entityStatus === "loading"}/>
        {props.todolists.map(tl => {
            let allTodolistTasks = tasks[tl.id];
            return <>

                <div>
                    <Todolist
                        key={tl.id}
                        id={tl.id}
                        title={tl.title}
                        tasks={allTodolistTasks}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeTaskStatus={changeStatus}
                        filter={tl.filter}
                        removeTodolist={removeTodolist}
                        changeTaskTitle={changeTaskTitle}
                        changeTodolistTitle={changeTodolistTitle}
                        entityStatus = {props.entityStatus}
                    />
                </div>
            </>
        })}
    </div>
}