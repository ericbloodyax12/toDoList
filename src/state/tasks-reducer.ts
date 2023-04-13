import {FilterValuesType, TasksStateType, TodolistType} from "../App";

import {v1} from "uuid";

export type RemoveTaskActionType = {
    type: "REMOVE-TASK",
    todolistID: string,
    id:string
}
export type AddTaskActionType = {
    type: "ADD-TASK",
    todolistID: string,

    title:string,

}
export type ChangeStatusTaskActionType = {
    type: "CHANGE-STATUS-TASK",

    todolistID: string,
    id: string;
    isDone: boolean,
}
type ChangeStatusPayLoadType = Pick<ChangeStatusTaskActionType, "todolistID" | "id"| "isDone">




export type ActionTasksType = RemoveTaskActionType
                        | AddTaskActionType
                        |ChangeStatusTaskActionType



export const tasksReducer = (state: TasksStateType , action: ActionTasksType): TasksStateType => {
    switch (action.type) {
        case "REMOVE-TASK" : {

          return   {...state, [action.todolistID]:state[action.todolistID].filter(t => t.id !== action.id) }

        }
        case "ADD-TASK" : {
            let newTask = {id:v1(), title: action.title, isDone: false}

           return {...state, [action.todolistID]:[...state[action.todolistID],newTask]}

        }
        case "CHANGE-STATUS-TASK" : {
            return {...state, [action.todolistID]: [...state[action.todolistID].map(t => {
                return t.id === action.id
                    ? {...t, isDone:action.isDone}
                    : t
                })]}
        }

        default: throw new Error("error, action type was not detected")
    }
}

export const  removeTaskAC = (todolistID: string, id:string): RemoveTaskActionType => {
    return {type: "REMOVE-TASK", todolistID, id}
}
export const addTaskAC = (todolistID: string, title: string): AddTaskActionType => {
    return {type: "ADD-TASK", todolistID, title }
}
export const ChangeStatusTaskAC = (payload: ChangeStatusPayLoadType): ChangeStatusTaskActionType => {
    return {type: "CHANGE-STATUS-TASK", todolistID:payload.todolistID, id:payload.id, isDone:payload.isDone }
}
