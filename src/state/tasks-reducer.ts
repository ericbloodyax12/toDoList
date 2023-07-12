import {v1} from "uuid";
import {
    AddTodolistActionType, getTodoListsAC, GetTodoListsACType,
    RemoveTodolistActionType,
    SET_TODOLISTS,
    todolistID1,
    todolistID2
} from "./todolists-reducer";
import {TasksStateType} from "../AppWithRedux";
import {Dispatch} from "redux";
import {GetTasksResponse, TaskStatuses, todolistAPI} from "../api/todolist-api";
import {TaskType} from "../api/todolist-api";

export type RemoveTaskActionType = {
    type: "REMOVE-TASK",
    todolistID: string,
    id:string
}
export type ChangeStatusTaskActionType = {
    type: "CHANGE-STATUS-TASK",
    payload: {
    id: string,
    completed: TaskStatuses,
    todolistId: string
    }

}
export type ChangeStatusPayLoadType = ChangeStatusTaskActionType["payload"]

export type ChangeTitleActionType = ReturnType<typeof ChangeTitleTaskAC>
export type getTaskActionType = ReturnType<typeof getTasksAC>
export type deleteTasksActionType = ReturnType<typeof deleteTasksAC>
export type postTaskType = ReturnType<typeof addTaskAC>
export type ActionTasksType = RemoveTaskActionType

                        | ChangeStatusTaskActionType
                        | ChangeTitleActionType
                        | AddTodolistActionType
                        | RemoveTodolistActionType
                        | GetTodoListsACType
                        | getTaskActionType
                        | deleteTasksActionType
                        | postTaskType

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

export const tasksReducer = (state: TasksStateType = {} , action: ActionTasksType): TasksStateType => {
    switch (action.type) {
        case "DELETE-TASK": {
            let stateCopy = {...state,  [action.todoListId]:state[action.todoListId].filter((t) => t.id !== action.taskId ) };
            return stateCopy;
        }
        case "GET-TASKS" : {
            return {...state, [action.todoListId]:[...action.tasks]}
        }
        case SET_TODOLISTS : {
            let stateCopy = {...state}
            action.todoLists.forEach((td) => stateCopy[td.id] = [])
            return stateCopy
        }

        case "REMOVE-TASK" : {
          return   {...state, [action.todolistID]:state[action.todolistID].filter(t => t.id !== action.id) }

        }
        case "POST-TASK" : {

           return {...state, [action.todolistID]:[...state[action.todolistID], action.task ]}

        }
        case "CHANGE-STATUS-TASK" : {
            return {...state, [action.payload.todolistId]: [...state[action.payload.todolistId].map(t => {
                return t.id === action.payload.id
                    ? {...t, isDone:action.payload.completed}
                    : t
                })]}
        }
        case "CHANGE-TITLE-TASK" : {
            return {...state, [action.todolistID]: state[action.todolistID].map((task) => {
                return task.id === action.id
                    ? {...task, title: action.newTitle}
                    : task
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
export const ChangeStatusTaskAC = (payload:ChangeStatusPayLoadType): ChangeStatusTaskActionType => {
    return {type: "CHANGE-STATUS-TASK", payload }
}

export const ChangeTitleTaskAC = (todolistID:string, id:string, newTitle:string) => {
    return {type: "CHANGE-TITLE-TASK", todolistID, id, newTitle} as const
}
export const getTasksAC = (todoListId: string,tasks: TaskType[]) => {
    return {type: "GET-TASKS", todoListId, tasks} as const
}
export const deleteTasksAC = (todoListId: string, taskId: string) => {
    return {type: "DELETE-TASK", todoListId, taskId} as const
}
export const addTaskAC = (todolistID: string, task: TaskType) => {
    return {type: "POST-TASK", todolistID, task} as const
}

export const getTasksTC = (todoListId:string) => (dispatch:Dispatch)  => {
    todolistAPI.getTasks(todoListId).then((res) => {
        dispatch(getTasksAC(todoListId, res.data.items))
    })
}
export const deleteTasksTC = (todoListId:string, taskId: string) => (dispatch:Dispatch)  => {
    todolistAPI.deleteTasks(todoListId, taskId).then((res) => {
        dispatch(deleteTasksAC(todoListId, taskId))
    })
}
export const postTasksTC = (todoListId:string, title: string) => (dispatch:Dispatch)  => {
    todolistAPI.postTask(todoListId, title).then((res) => {
       console.log(res)
        dispatch(addTaskAC(todoListId, res.data.data.item))
    })
}

