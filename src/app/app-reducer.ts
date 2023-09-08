//app-reducer.tsx
import {addTodolistAC} from "../state/todolists-reducer";

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed' | 'imgLoading'

const initialState = {
    error: null as null | string, // по дефолту налл, но может быть как налл или стрингой
    status: 'idle' as RequestStatusType,
    isInitialized: false as boolean
}

type InitialStateType = typeof initialState
export type setStatusACType = ReturnType <typeof setStatusAC>
export const appReducer = (state: InitialStateType = initialState, action: appActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.error}
        case 'APP/SET-INITIALIZED':
            return {...state, isInitialized: action.isInitialized}
        default:
            return state
    }
}

export const setStatusAC = (status:RequestStatusType) => ({
type:'APP/SET-STATUS', status
} as const)
export const setErrorAC = (error: null | string) => ({
type:'APP/SET-ERROR', error
} as const)
export const setInitialazedAC = (isInitialized: boolean) => ({
type:'APP/SET-INITIALIZED',isInitialized
} as const)

export type appActionsType = setStatusACType | ReturnType<typeof setErrorAC> | ReturnType<typeof setInitialazedAC> | ReturnType<typeof setInitialazedAC>


