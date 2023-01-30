import React, {ChangeEvent, ChangeEventHandler, KeyboardEvent, MouseEventHandler, useState} from 'react';
import {FilterValuesType} from '../App';
import './ToDolistModule.css'

//  React.MouseEvent<HTMLElement>
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (title: string) => void
    changeStatus: (taskId:string,eventStatus:boolean)=> void
}

export function Todolist(props: PropsType) {

    let [title, setTitle] = useState("")
    const [error,setError] = useState<string|null>(null)

    const addTask = () => {
        if (title.trim()!==""){
        props.addTask(title.trim());
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



    const onAllClickHandler = () => props.changeFilter("all");
    const onActiveClickHandler = () => props.changeFilter("active");
    const onCompletedClickHandler = () => props.changeFilter("completed");

    return <div className="ToDoListConteyner">
        <h3>{props.title}</h3>
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

                    const onClickHandler = () => props.removeTask(t.id)
                    const changeStatusHandler = (event: ChangeEvent<HTMLInputElement>) => {
                        props.changeStatus(t.id,event.currentTarget.checked)
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
        <div className="buttons-contener">
            <button onClick={ onAllClickHandler }>All</button>
            <button onClick={ onActiveClickHandler }>Active</button>
            <button onClick={ onCompletedClickHandler }>Completed</button>
        </div>
    </div>
}
