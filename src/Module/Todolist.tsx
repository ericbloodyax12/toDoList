import React, {ChangeEvent, ChangeEventHandler, KeyboardEvent, MouseEventHandler, useState} from 'react';
import {FilterValuesType, TodolistType} from '../App';
import './ToDolistModule.css'

//  React.MouseEvent<HTMLElement>
export type TaskType = {
    id: string
    title: string
    isDone: boolean

}

type PropsType = {
    todoLists:Array<TodolistType>
    setTodoLists:(todoLists:Array<TodolistType>) => void
    title: string
    todolistID:string
    tasks: Array<TaskType>
    removeTask: (todolistID:string,taskId: string) => void
    changeFilter: (todolistID:string,value: FilterValuesType) => void
    addTask: (todolistID:string,title: string) => void
    changeStatus: (todolistID:string,taskId:string,eventStatus:boolean)=> void
    filter: FilterValuesType
    deleteTodoList: (todolistID:string) => void

}

export function Todolist(props: PropsType) {

    let [title, setTitle] = useState("")
    const [error,setError] = useState<string|null>(null)

    const addTask = () => {
        if (title.trim()!==""){
        props.addTask(props.todolistID,title.trim());
        setTitle("");
        } else {
            setError('Title is required!')
        }
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError(null)
    }
    const onClickInputHandler = (e: React.MouseEvent<HTMLElement>) => {
        setError(null)
    }



    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
            addTask();
        }
    }



    const deleteTodoListHandler = (e:React.MouseEvent<HTMLElement>) => props.deleteTodoList(props.todolistID)
    const onAllClickHandler = () => props.changeFilter(props.todolistID,"all");
    const onActiveClickHandler = () => props.changeFilter(props.todolistID,"active");
    const onCompletedClickHandler = () => props.changeFilter(props.todolistID,"completed");

    return <div className="ToDoListContainer">
        <h3>{props.title}<button className='ToDoListContainer__delete-button' onClick={deleteTodoListHandler}>X</button></h3>
        <div>
            <input value={title}
                   onChange={ onChangeHandler }
                   onKeyPress={ onKeyPressHandler }
                  onClick={onClickInputHandler}
            />
            <button onClick={addTask}>+</button>
        </div>

        {error && <div className="errorMessage">{error}</div>}
        <div className="todos">
        <ul>
            {
                props.tasks.map(t => {

                    const onClickHandler = () => props.removeTask(props.todolistID,t.id)
                    const changeStatusHandler = (event: ChangeEvent<HTMLInputElement>) => {
                        props.changeStatus(props.todolistID,t.id,event.currentTarget.checked)
                    }

                    return <li key={t.id}>
                        <input type="checkbox" checked={t.isDone} onChange={changeStatusHandler} />
                        <span>{t.title}</span>
                        <button onClick={ onClickHandler }>x</button>
                    </li>
                })
            }
        </ul>
        </div>
        <div className="buttons-container">
            <button onClick={ onAllClickHandler }>All</button>
            <button onClick={ onActiveClickHandler }>Active</button>
            <button onClick={ onCompletedClickHandler }>Completed</button>
        </div>
    </div>
}
