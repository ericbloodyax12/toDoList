import {v1} from "uuid";
import {todolistAPI, TodoListType} from "../api/todolist-api";
import {Dispatch} from "redux";

export const SET_TODOLISTS = "SET-TODOLISTS"

export type FilterValuesType = "all" | "active" | "completed";
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}
export type TodolistDomainType = TodolistType & {filter: FilterValuesType}
export type ActionType = ReturnType<typeof removeTodolistAC>
                        | ReturnType <typeof addTodolistAC>
                        | ReturnType <typeof changeTodolistTitleAC>
                        | ReturnType<typeof getTodoListsAC>
                        | ReturnType<typeof changeTodolistStatusAC>

const initialState:TodolistDomainType[] = []

export const todolistsReducer = (state: TodolistDomainType[] = initialState , action: ActionType): TodolistDomainType[] => {
    switch (action.type) {
        case SET_TODOLISTS : {
            return action.todoLists.map((td) => ({...td, filter: "all"}))
        }
        case "REMOVE-TODOLIST" : {
            return state.filter((t) => t.id != action.id )
        }
        case "ADD-TODOLIST" : {
            return [...state, {...action.todoList, filter: "all"}]
        }
        case "CHANGE-TODOLIST-TITLE" : {
            return state.map((t) => t.id === action.id ? {...t, title: action.title} : t )

        }
        case "CHANGE-TODOLIST-STATUS" : {
            return state.map((t) => t.id === action.id ? {...t, filter: action.filter} : t)
        }
        default: return state;
        // default: throw new Error("error, action type was not detected")
    }
}

export const removeTodolistAC = (todolistID: string) => ({type: "REMOVE-TODOLIST", id: todolistID} as const)
export const addTodolistAC = (todoList: TodoListType) => ({ type: "ADD-TODOLIST", todoList } as const)
export const changeTodolistTitleAC = (id: string, title: string ) => ({type: "CHANGE-TODOLIST-TITLE", id, title} as const)
export const changeTodolistStatusAC = (id: string, filter: FilterValuesType) => ({type: "CHANGE-TODOLIST-STATUS", id, filter} as const)
export const getTodoListsAC = (todoLists: TodoListType[]) => ({type: SET_TODOLISTS, todoLists} as const)


export const getTodosTC = () => (dispatch:Dispatch)  => {
    // внутри санки можно делать побочные эффекты (запросы на сервер)
    todolistAPI.getTodoList().then((res) => {
        dispatch(getTodoListsAC(res.data))
    })
}
export const deleteTodosTC = (id:string) => (dispatch:Dispatch)  => {
    todolistAPI.deleteTodoList(id).then((res) => {
        dispatch(removeTodolistAC(id))
    })
}
export const postTodosTC = (title: string) => (dispatch:Dispatch)  => {
    todolistAPI.postTodoList(title).then((res) => {
        dispatch(addTodolistAC(res.data.data.item))
    })
}
export const putTitleTodosTC = (id: string, title: string) => (dispatch:Dispatch)  => {
    todolistAPI.updateTodoList(id,title).then((res) => {
        dispatch(changeTodolistTitleAC(id, title))
    })
}