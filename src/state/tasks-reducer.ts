import {
    AddTodolistActionType,
    GetTodoListsACType,
    RemoveTodolistActionType,
    SET_TODOLISTS,
    todolistID1,
    todolistID2
} from "./todolists-reducer";
import {TasksStateType} from "../AppWithRedux";
import {Dispatch} from "redux";
import {TaskStatuses, TaskType, todolistAPI, UpdateTaskModelType} from "../api/todolist-api";
import {AppRootStateType} from "./store";

export type RemoveTaskActionType = {
    type: "REMOVE-TASK",
    todolistID: string,
    id:string
}

export type ChangeStatusTasksACType = ReturnType <typeof changeStatusTasksAC>


export type ChangeTitleActionType = ReturnType<typeof ChangeTitleTaskAC>
export type getTaskActionType = ReturnType<typeof getTasksAC>
export type deleteTasksActionType = ReturnType<typeof deleteTasksAC>
export type postTaskType = ReturnType<typeof addTaskAC>
export type ActionTasksType = RemoveTaskActionType

                        | ChangeTitleActionType
                        | AddTodolistActionType
                        | RemoveTodolistActionType
                        | GetTodoListsACType
                        | getTaskActionType
                        | deleteTasksActionType
                        | postTaskType
                        | ChangeStatusTasksACType
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
export const changeStatusTasksAC = (todoListId: string, taskId: string, model: UpdateTaskModelType) => {
    return {type: "CHANGE-STATUS-TASK", todoListId, taskId, model} as const
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
export const changeStatusTaskTC = (todoListId:string, taskId: string, status: TaskStatuses) => (dispatch:Dispatch, getState: () => AppRootStateType)  => {
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

