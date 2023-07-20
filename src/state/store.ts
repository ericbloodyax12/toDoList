import {ActionTasksType, tasksReducer} from './tasks-reducer'
import {TodoListActionType, todolistsReducer} from './todolists-reducer'
import {AnyAction, applyMiddleware, combineReducers, legacy_createStore,} from 'redux'
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import thunk, {ThunkDispatch} from "redux-thunk";
import {appReducer} from "../app/app-reducer";

// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния
const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app: appReducer
})
// type AppRootState = {
//     todolistsReducer: TodolistType[]
//     tasks: TasksStateType
// }

// непосредственно создаём store
export const store = legacy_createStore(rootReducer, applyMiddleware(thunk))
// определить автоматически тип всего объекта состояния
export type ThunkDispatchType = ThunkDispatch<AppRootStateType, any, AnyAction>
export const useAppDispatch = () =>  useDispatch<ThunkDispatchType>();
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector
// типизированный хук useSelector
export type AppRootStateType = ReturnType <typeof rootReducer>
// эт чтобы можно было в консоли браузера обращаться к store в любой момент

export type AppActionsType = TodoListActionType | ActionTasksType

// @ts-ignore
window.store = store
