import {
    addTodolistAC, getTodoListsAC, removeTodolistAC,
    SET_TODOLISTS,
} from "./todolists-reducer";

import {Dispatch} from "redux";
import {TaskStatuses, TaskType, todolistAPI, UpdateTaskModelType} from "../api/todolist-api";
import {AppActionsType, AppRootStateType} from "./store";
import {TasksStateType} from "../app/App";


export type ActionTasksType = ReturnType<typeof removeTaskAC>
                        | ReturnType<typeof ChangeTitleTaskAC>
                        | ReturnType <typeof addTodolistAC>
                        | ReturnType<typeof removeTodolistAC>
                        | ReturnType<typeof getTodoListsAC>
                        | ReturnType<typeof getTasksAC>
                        | ReturnType<typeof deleteTasksAC>
                        | ReturnType<typeof addTaskAC>
                        | ReturnType <typeof changeStatusTasksAC>
// const initialState = {
//     [todolistID1]: [
//         {id: "1", title: "HTML&CSS", isDone: true},
//         {id: "2", title: "JS", isDone: true}
//     ],
//     [todolistID2]: [
//         {id: "1", title: "Milk", isDone: true},
//         {id: "2", title: "React Book", isDone: true},
//         {id: "3", title: "New Book", isDone: true}
//     ]
// }

export const tasksReducer = (state: TasksStateType = {} , action: ActionTasksType): TasksStateType => {
    switch (action.type) {
        case "DELETE-TASK": {
            return {...state,  [action.todoListId]:state[action.todoListId].filter((t) => t.id !== action.taskId ) };

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
          return  {...state, [action.todolistID]:state[action.todolistID].filter(t => t.id !== action.id) }

        }
        case "POST-TASK" : {

           return {...state, [action.todolistID]:[...state[action.todolistID], action.task ]}

        }
        case "CHANGE-STATUS-TASK" : {
           return {...state,  [action.todoListId]:
               state[action.todoListId].map((t) => t.id === action.taskId ?  {...t, ...action.model} : t )}
        }
        case "CHANGE-TITLE-TASK" : {
            return {...state, [action.todolistID]: state[action.todolistID].map((task) => {
                return task.id === action.id
                    ? {...task, title: action.newTitle}
                    : task
                }) }
        }
        case "ADD-TODOLIST" : {
           return  {...state, [action.todoList.id] : []}
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

export const  removeTaskAC = (todolistID: string, id:string) =>
    ({type: "REMOVE-TASK", todolistID, id} as const)
export const ChangeTitleTaskAC = (todolistID:string, id:string, newTitle:string) =>
    ({type: "CHANGE-TITLE-TASK", todolistID, id, newTitle} as const)
export const getTasksAC = (todoListId: string,tasks: TaskType[]) =>
    ({type: "GET-TASKS", todoListId, tasks} as const)
export const deleteTasksAC = (todoListId: string, taskId: string) =>
    ({type: "DELETE-TASK", todoListId, taskId} as const)
export const addTaskAC = (todolistID: string, task: TaskType) =>
    ({type: "POST-TASK", todolistID, task} as const)
export const changeStatusTasksAC = (todoListId: string, taskId: string, model: UpdateTaskModelType) =>
    ({type: "CHANGE-STATUS-TASK", todoListId, taskId, model} as const)

export const getTasksTC = (todoListId:string) => (dispatch:Dispatch)  => {
    todolistAPI.getTasks(todoListId).then((res) => {
        dispatch(getTasksAC(todoListId, res.data.items))
    })
}
export const deleteTasksTC = (todoListId:string, taskId: string) => (dispatch:Dispatch<AppActionsType>)  => {
    todolistAPI.deleteTasks(todoListId, taskId).then((res) => {
        dispatch(deleteTasksAC(todoListId, taskId))
    })
}
export const changeStatusTaskTC = (todoListId:string, taskId: string, status: TaskStatuses) => (dispatch:Dispatch<AppActionsType>,
        getState: () => AppRootStateType)  => {
    const allTasksFromState = getState().tasks;
    const task = allTasksFromState[todoListId].find((t) => t.id === taskId)
    if (task) {
        const model: UpdateTaskModelType = {title: task.title,
        startDate: task.startDate,
        priority: task.priority,
        description: task.description,
        deadline: task.deadline,
        status}

        todolistAPI.changeStatusTask(todoListId, taskId, model)
            .then((res) => {
                dispatch(changeStatusTasksAC(todoListId, taskId, model))
    })
}}
export const postTasksTC = (todoListId:string, title: string) => (dispatch:Dispatch)  => {
    todolistAPI.postTask(todoListId, title).then((res) => {
       console.log(res)
        dispatch(addTaskAC(todoListId, res.data.data.item))
    })
}

