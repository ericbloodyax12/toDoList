import React, {useCallback} from 'react';
import {AddItemForm} from './components/AddItemForm/AddItemForm';
import {EditableSpan} from './EditableSpan';
import "./todolist.css";
import {FilterValuesType} from "./AppWithRedux";
import {Task} from "./components/Task/Task";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {

    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (todolistId: string,taskId: string) => void
    changeTaskTitle: (todolistID:string, id:string, newTitle:string) => void
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (todolistId: string, title: string ) => void

    removeTodolist: (id: string) => void
    changeTodolistTitle: (id: string, newTitle: string) => void
    filter: FilterValuesType
}

export const Todolist = React.memo((props: PropsType) => {
    const addTask = useCallback((title: string) => {
        props.addTask(props.id,title);
    },[props.addTask, props.id])

    const removeTodolist = () => {
        props.removeTodolist(props.id);
    }
    const changeTodolistTitle = useCallback((title: string) => {
        props.changeTodolistTitle(props.id, title);
    }, [props.changeTodolistTitle, props.id])

    const onAllClickHandler = useCallback(() => props.changeFilter("all", props.id),[
        props.changeFilter,
        props.id]);
    const onActiveClickHandler = useCallback(() => props.changeFilter("active", props.id),[
        props.changeFilter,
        props.id]);
    const onCompletedClickHandler = useCallback(() => props.changeFilter("completed", props.id),[
        props.changeFilter,
        props.id]);
    let tasksForTodolist = props.tasks

    if (props.filter === "active") {
        tasksForTodolist = props.tasks.filter((t: TaskType) => t.isDone === false);
    }
    if (props.filter === "completed") {
        tasksForTodolist = props.tasks.filter((t: TaskType) => t.isDone === true);
    }

    return <div>
        <h3> <EditableSpan value={props.title} onChange={changeTodolistTitle} />
            <button className={"Todolist_div-h3-button"} onClick={removeTodolist}>x</button>
        </h3>
        <AddItemForm addItem={addTask}/>
        <ul>
            {
                props.tasks?.map(task => <Task
                    key={task.id}
                    task={task}
                    changeTaskStatus={props.changeTaskStatus}
                    todolistId={props.id}
                    changeTaskTitle={props.changeTaskTitle}
                    removeTask={props.removeTask}
                />)
            }
        </ul>
        <div>
            <button className={props.filter === 'all' ? "active-filter" : ""}
                    onClick={onAllClickHandler}>All
            </button>
            <button className={props.filter === 'active' ? "active-filter" : ""}
                    onClick={onActiveClickHandler}>Active
            </button>
            <button className={props.filter === 'completed' ? "active-filter" : ""}
                    onClick={onCompletedClickHandler}>Completed
            </button>
        </div>
    </div>
})


