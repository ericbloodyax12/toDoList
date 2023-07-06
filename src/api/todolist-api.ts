import axios from "axios";

const conf = {
    withCredentials: true,
    headers: {
        'API-KEY': '6e7aa82d-b9e4-4cf4-83d1-69d29e0aeaf2'
    }
}


export const todolistAPI = {
    getTodoList () {
        return axios.get("https://social-network.samuraijs.com/api/1.1/todo-lists",
            conf)
    },
    postTodoList (title: string) {
        return  axios.post("https://social-network.samuraijs.com/api/1.1/todo-lists",{title},
           conf)
    },
    deleteTodoList (todolistid: string) {
        return  axios.delete(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistid}`,
           conf)
    },
    updateTodoList (todolistid: string, title: string) {
        return  axios.put(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistid}`,{title},
           conf)
    }
}

