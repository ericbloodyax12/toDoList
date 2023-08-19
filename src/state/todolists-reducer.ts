import {v1} from "uuid";
import {ResultCode, todolistAPI, TodoListType} from "../api/todolist-api";
import {Dispatch} from "redux";
import {RequestStatusType, setErrorAC, setStatusAC, setStatusACType} from "../app/app-reducer";
import {handleServerNetworkError} from "../utils/error-utils";

export const SET_TODOLISTS = "SET-TODOLISTS"

export type FilterValuesType = "all" | "active" | "completed";
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}
export type TodolistDomainType = TodolistType & {filter: FilterValuesType, entityStatus: RequestStatusType}
export type TodoListActionsType = ReturnType<typeof removeTodolistAC>
                        | ReturnType <typeof addTodolistAC>
                        | ReturnType <typeof changeTodolistTitleAC>
                        | ReturnType<typeof getTodoListsAC>
                        | ReturnType<typeof changeTodolistStatusAC>
                        | setStatusACType
                        | ReturnType<typeof changeEntityStatusAC>
                        | ReturnType<typeof setErrorAC>

const initialState:TodolistDomainType[] = []

export const todolistsReducer = (state: TodolistDomainType[] = initialState , action: TodoListActionsType): TodolistDomainType[] => {
    switch (action.type) {
        case SET_TODOLISTS : {
            return action.todoLists.map((td) => ({...td, filter: "all", entityStatus: "idle"}))
        }
        case "REMOVE-TODOLIST" : {
            return state.filter((t) => t.id != action.id )
        }
        case "ADD-TODOLIST" : {
            return [{...action.todoList, filter: "all", entityStatus: "idle" },...state]
        }
        case "CHANGE-TODOLIST-TITLE" : {
            return state.map((t) => t.id === action.id ? {...t, title: action.title} : t )

        }
        case "CHANGE-TODOLIST-STATUS" : {
            return state.map((t) => t.id === action.id ? {...t, filter: action.filter} : t)
        }
        case "CHANGE-ENTITY-STATUS" : {
            return state.map((t) => t.id === action.id ? {...t, entityStatus: action.status} : t)
        }
        default: return state;
        // default: throw new Error("error, action type was not detected")
    }
}

export const removeTodolistAC = (todolistID: string) => ({type: "REMOVE-TODOLIST", id: todolistID} as const)
export const addTodolistAC = (todoList: TodoListType) => ({ type: "ADD-TODOLIST", todoList } as const)
export const changeTodolistTitleAC = (id: string, title: string ) => ({type: "CHANGE-TODOLIST-TITLE", id, title} as const)
export const changeTodolistStatusAC = (id: string, filter: FilterValuesType) => ({type: "CHANGE-TODOLIST-STATUS", id, filter} as const)
export const changeEntityStatusAC = (id: string, status: RequestStatusType) => ({type: "CHANGE-ENTITY-STATUS", id, status} as const)
export const getTodoListsAC = (todoLists: TodoListType[]) => ({type: SET_TODOLISTS, todoLists} as const)




export const getTodosTC = () => (dispatch:Dispatch)  => {
    dispatch(setStatusAC("loading"))
    // внутри санки можно делать побочные эффекты (запросы на сервер)
    todolistAPI.getTodoList().then((res) => {
        dispatch(getTodoListsAC(res.data))
        dispatch(setStatusAC("succeeded"))
    })
}
// export const getTodosTC = (): ThunkDispatchType => async dispatch => {
//     const res = await todolistAPI.getTodoList()
//         dispatch(getTodoListsAC(res.data))
// }

export const deleteTodosTC = (id:string) => (dispatch:Dispatch)  => {

    dispatch(changeEntityStatusAC(id,"loading"))
    dispatch(setStatusAC("loading"))
    todolistAPI.deleteTodoList(id).then((res) => {
        if (res.data.resultCode === ResultCode.Ok) {
            dispatch(removeTodolistAC(id))
            dispatch(setStatusAC("succeeded"))
        } else {
            if (res.data.messages[0].length) {
                dispatch(setErrorAC(res.data.messages[0]))
            }
            else {
                dispatch(setErrorAC("Here's some error"))
            }
        }
    })
        .catch((error) => {
            handleServerNetworkError(dispatch, error)
            dispatch(changeEntityStatusAC(id,"failed"))
        })
}
export const postTodosTC = (title: string) => (dispatch:Dispatch)  => {
    dispatch(setStatusAC("loading"))
    todolistAPI.postTodoList(title).then((res) => {
        dispatch(addTodolistAC(res.data.data.item))
        dispatch(setStatusAC("succeeded"))
    })
}
export const putTitleTodosTC = (id: string, title: string) => (dispatch:Dispatch)  => {
    dispatch(setStatusAC("loading"))
    todolistAPI.updateTodoList(id,title).then((res) => {
        dispatch(changeTodolistTitleAC(id, title))
        dispatch(setStatusAC("succeeded"))
    })
}