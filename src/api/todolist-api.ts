import axios from "axios";

export type TodoListType =
            {
                "id": string,
                "title": string,
                "addedDate": string,
                "order": number
            }

type ResponseType<T = {}> = {
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
        return instance.delete<DeleteTasksResponse>(`todo-lists/${todoListId}/tasks/${taskId}`)
    },
    postTask (todoListId: string, title: string ) {
        return instance.post<PostTaskResponse>(`todo-lists/${todoListId}/tasks`, {title})
    },
}
enum TaskStatuses {
    New = 0,
    Inprogress,
    Completed,
    Draft

}
enum TaskPriorities  {
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

type DeleteTasksResponse = {
    resultCode: number
    messages: string[]
    data: {
        data:{
            item:TaskType
        }
    }
}
type PostTaskResponse = {
    data: {
            item:TaskType
    }

    resultCode: number
    messages: string[]
}