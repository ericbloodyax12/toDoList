import { tasksReducer } from './tasks-reducer'
import { todolistsReducer } from './todolists-reducer'
import { combineReducers, createStore } from 'redux'
import {TodolistType} from "../AppWithRedux";
import {TaskType} from "../Todolist";

// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния
const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer
})
// type AppRootState = {
//     todolistsReducer: TodolistType[]
//     tasks: TasksStateType
// }
export type AppRooState =  ReturnType<typeof rootReducer>

// непосредственно создаём store
export const store = createStore(rootReducer)
// определить автоматически тип всего объекта состояния
export type AppRootStateType = ReturnType<typeof rootReducer>
// а это, чтобы можно было в консоли браузера обращаться к store в любой момент

// @ts-ignore
window.store = store
