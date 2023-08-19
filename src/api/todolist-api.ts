import axios, { AxiosResponse } from 'axios'
import {changeStatusTaskTC} from "../state/tasks-reducer";

export type TodoListType =
            {
                "id": string,
                "title": string,
                "addedDate": string,
                "order": number
            }

export type ResponseType<T = {}> = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data: T
}


const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.1/",
    withCredentials: true,
    headers: {
    'API-KEY': '6e7aa82d-b9e4-4cf4-83d1-69d29e0aeaf2'
}
})

export const todolistAPI = {
    getTodoList () {
        return instance.get<TodoListType[]>("todo-lists",
            )
    },
    postTodoList (title: string) {
        return  instance.post<ResponseType<{item:TodoListType}>>("todo-lists",{title},
           )
    },
    deleteTodoList (todoListId: string) {
        return  instance.delete<ResponseType>(`todo-lists/${todoListId}`,
           )
    },
    updateTodoList (todoListId: string, title: string) {
        return  instance.put<ResponseType>(`todo-lists/${todoListId}`,{title},
           )
    },
    getTasks (todoListId: string) {
        return instance.get<GetTasksResponse>(`todo-lists/${todoListId}/tasks`)
    },
    deleteTasks (todoListId: string, taskId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todoListId}/tasks/${taskId}`)
    },
    postTask (todoListId: string, title: string ) {
        return instance.post<ResponseType<{item: TaskType}>>(`todo-lists/${todoListId}/tasks`, {title})
    },
    changeStatusTask (todoListId: string, taskId: string, model: UpdateTaskModelType ) {
        return instance.put<ResponseType<{ item: TaskType }>, AxiosResponse<ResponseType<{ item: TaskType }>>, UpdateTaskModelType>(`todo-lists/${todoListId}/tasks/${taskId}`, model )
    },
}
export enum ResultCode {
    Ok = 0,
    Error = 1,
    Captcha = 10
}
export enum TaskStatuses {
    New = 0,
    Inprogress,
    Completed,
    Draft

}
export enum TaskPriorities  {
    Low = 0,
    Middle ,
    Hi,
    Urgently,
    Later
}

export type TaskType = {
    description: string
    title: string
    completed: boolean
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}

export type GetTasksResponse = {
    error: string | null
    totalCount : number
    items: TaskType[]
}
export type UpdateTaskModelType = {
    title:string,
    description: string,
    status: TaskStatuses,
    priority: TaskPriorities
    startDate: string
    deadline: string
}