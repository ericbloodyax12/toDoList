import React, {ChangeEvent, useCallback} from "react";
import {EditableSpan} from "../../EditableSpan";
import {TaskType} from "../../Todolist";

export type TaskPropsType = {
    todolistId: string
    task: TaskType
    removeTask: (todolistId: string, taskId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
}
export const Task = React.memo((props: TaskPropsType) => {
    console.log("Task was called")
    const onClickHandler = () => props.removeTask(props.todolistId, props.task.id)
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked;
        props.changeTaskStatus(props.task.id, newIsDoneValue, props.todolistId);
    }
    const onTitleChangeHandler = useCallback((newValue: string) => {
        props.changeTaskTitle(props.todolistId,props.task.id,newValue);
    }, [ props.changeTaskTitle, props.task.id,  props.todolistId])

    return <li key={props.task.id} className={`Todolist_task-li ${props.task.isDone ? "is-done" : ""}`}>
        <input type="checkbox" onChange={onChangeHandler} checked={props.task.isDone}/>
        <EditableSpan value={props.task.title} onChange={onTitleChangeHandler}/>
        <button className={"Todolist_div-ul-li-button"} onClick={onClickHandler}>x</button>
    </li>

})