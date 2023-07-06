import axios from "axios";

type TodoListType =
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
    deleteTodoList (todolistid: string) {
        return  instance.delete<ResponseType>(`todo-lists/${todolistid}`,
           )
    },
    updateTodoList (todolistid: string, title: string) {
        return  instance.put<ResponseType>(`todo-lists/${todolistid}`,{title},
           )
    }
}

