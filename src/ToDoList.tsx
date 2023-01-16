import React from "react";
import {FiltredValuesType} from "./App";

type ToDoListPropsType = {
    shapka1?: string
    shapka2?: string
    tasks: TaskType[] //  tasks: Array<TaskType>
    removeTask: (taskId: number) => void
    changeFilter: (filter: FiltredValuesType) => void
}

export type TaskType = {
    id: number,
    title: string,
    isDone: boolean
}


export const ToDoList = (props: ToDoListPropsType) => {
    return (
        <div>
            <h3>{props.shapka1}</h3>
            <h3>{props.shapka2}</h3>

            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {props.tasks.map((el, index) => {
                    return (
                        <li key={index}>
                            <input type="checkbox" checked={el.isDone}/>
                            <span> {el.title} </span>
                            <button onClick={() => props.removeTask(el.id)}>done</button>
                        </li>

                    )

                })}

            </ul>
            <div>
                <button onClick={() => props.changeFilter("All")}>All</button>
                <button onClick={() => props.changeFilter("Active")}>Active</button>
                <button onClick={() => props.changeFilter("Completed")}>Completed</button>
            </div>
        </div>
    )
}