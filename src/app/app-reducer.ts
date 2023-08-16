//app-reducer.tsx
import {addTodolistAC} from "../state/todolists-reducer";

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed' | 'imgLoading'

const initialState = {
    status: 'idle' as RequestStatusType
}

type InitialStateType = typeof initialState
export type setStatusACType = ReturnType <typeof setStatusAC>
export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        default:
            return state
    }
}

export const setStatusAC = (status:RequestStatusType) => ({
type:'APP/SET-STATUS', status
} as const)

type ActionsType = setStatusACType
