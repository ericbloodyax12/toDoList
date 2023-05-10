import {v1} from "uuid";
import {AddTodolistActionType, RemoveTodolistActionType, todolistID1, todolistID2} from "./todolists-reducer";
import {TasksStateType} from "../AppWithRedux";

export type RemoveTaskActionType = {
    type: "REMOVE-TASK",
    todolistID: string,
    id:string
}
export type AddTaskActionType = {
    type: "ADD-TASK",
    todolistID: string,
    title:string


}
export type ChangeStatusTaskActionType = {
    type: "CHANGE-STATUS-TASK",
    payload: {
    id: string,
    isDone: boolean,
    todolistId: string
    }

}
export type ChangeStatusPayLoadType = ChangeStatusTaskActionType["payload"]

export type ChangeTitleActionType = ReturnType<typeof ChangeTitleTaskAC>


export type ActionTasksType = RemoveTaskActionType
                        | AddTaskActionType
                        | ChangeStatusTaskActionType
                        | ChangeTitleActionType
                        | AddTodolistActionType
                        | RemoveTodolistActionType

const initialState = {
    [todolistID1]: [
        {id: "1", title: "HTML&CSS", isDone: true},
        {id: "2", title: "JS", isDone: true}
    ],
    [todolistID2]: [
        {id: "1", title: "Milk", isDone: true},
        {id: "2", title: "React Book", isDone: true},
        {id: "3", title: "New Book", isDone: true}
    ]
}

export const tasksReducer = (state: TasksStateType = initialState , action: ActionTasksType): TasksStateType => {
    switch (action.type) {

        case "REMOVE-TASK" : {
            console.log(state, action.todolistID)

          return   {...state, [action.todolistID]:state[action.todolistID].filter(t => t.id !== action.id) }

        }
        case "ADD-TASK" : {
            let newTask = {id:v1(), title: action.title, isDone: false}
           return {...state, [action.todolistID]:[...state[action.todolistID],newTask]}

        }
        case "CHANGE-STATUS-TASK" : {
            return {...state, [action.payload.todolistId]: [...state[action.payload.todolistId].map(t => {
                return t.id === action.payload.id
                    ? {...t, isDone:action.payload.isDone}
                    : t
                })]}
        }
        case "CHANGE-TITLE-TASK" : {
            return {...state, [action.todolistID]: state[action.todolistID].map((t) => {
                return t.id === action.id
                    ? {...t, title: action.newTitle}
                    : t
                }) }
        }
        case "ADD-TODOLIST" : {
           return  {...state, [action.todolistId] : []}
        }
        case "REMOVE-TODOLIST" : {
          let stateCopy = {...state};
           delete stateCopy[action.id];
           return stateCopy;
        }
        default: return state;
        // default: throw new Error("error, action type was not detected")
    }
}

export const  removeTaskAC = (todolistID: string, id:string): RemoveTaskActionType => {
    return {type: "REMOVE-TASK", todolistID, id}
}
export const addTaskAC = (todolistID: string, title: string): AddTaskActionType => {
    return {type: "ADD-TASK", todolistID, title }
}
export const ChangeStatusTaskAC = (payload:ChangeStatusPayLoadType): ChangeStatusTaskActionType => {
    return {type: "CHANGE-STATUS-TASK", payload }
}

export const ChangeTitleTaskAC = (todolistID:string, id:string, newTitle:string) => {
    return {type: "CHANGE-TITLE-TASK", todolistID, id, newTitle} as const
}
