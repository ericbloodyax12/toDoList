import {FilterValuesType, TodolistType} from "../AppWithReducers";

import {v1} from "uuid";
import exp from "constants";

export type RemoveTodolistActionType = {
    type: "REMOVE-TODOLIST",
    id:string
}
export type AddTodolistActionType = {
    type: "ADD-TODOLIST",
    title: string,
    todolistId: string
}
export type ChangeTodolistTitleActionType = {
    type: "CHANGE-TODOLIST-TITLE",
    id: string,
    title: string
}
export type ChangeTodolistStatusActionType = {
    type: "CHANGE-TODOLIST-STATUS",
    id: string,
    filter: FilterValuesType
}
export type ActionType = RemoveTodolistActionType
                        | AddTodolistActionType
                        | ChangeTodolistTitleActionType
                        | ChangeTodolistStatusActionType

export let todolistID1 = v1();
export let todolistID2 = v1();
const initialState:TodolistType[] = [
        {id: todolistID1, title: "What to learn", filter: "all"},
{id: todolistID2, title: "What to buy", filter: "all"}
]

export const todolistsReducer = (state: TodolistType[] = initialState , action: ActionType): TodolistType[] => {
    switch (action.type) {
        case "REMOVE-TODOLIST" : {
            return state.filter((t) => t.id != action.id )
        }
        case "ADD-TODOLIST" : {
            return [...state, {id: action.todolistId, title: action.title,filter:"all"}]
        }
        case "CHANGE-TODOLIST-TITLE" : {
            return state.map((t) => t.id === action.id ? {...t, title: action.title} : t )
        //      const todolist = state.find(t => t.id === action.id )
        //     if (todolist) {
        //         todolist.title = action.title;
        //     }
        //
        //     return [...state]
        //
        }
        case "CHANGE-TODOLIST-STATUS" : {
            return state.map((t) => t.id === action.id ? {...t, filter: action.filter} : t)
        }
        default: return state;
        // default: throw new Error("error, action type was not detected")
    }
}

export const  removeTodolistAC = (todolistID: string): RemoveTodolistActionType => {
    return {type: "REMOVE-TODOLIST", id: todolistID}
}
export const addTodolistAC = (title: string): AddTodolistActionType => {
    return { type: "ADD-TODOLIST", title, todolistId: v1()}
}
export const  changeTodolistTitleAC = (id: string, title: string ): ChangeTodolistTitleActionType => {
    return {type: "CHANGE-TODOLIST-TITLE", id, title}
}
export const  changeTodolistStatusAC = (id: string, filter: FilterValuesType): ChangeTodolistStatusActionType => {
    return {type: "CHANGE-TODOLIST-STATUS", id, filter}
}
