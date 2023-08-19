import {appActionsType, setErrorAC, setStatusAC} from '../app/app-reducer'
import { Dispatch } from 'redux'
import { ResponseType } from '../api/todolist-api'

// generic function
export const handleServerAppError = <T>(dispatch: ErrorUtilsDispatchType, data: ResponseType<T>) => {
    if (data.messages[0].length) {
        dispatch(setErrorAC(data.messages[0]))
    }
    else {
        dispatch(setErrorAC("Here's some error"))
    }
    dispatch(setStatusAC("failed"))
}

export const handleServerNetworkError = (dispatch: ErrorUtilsDispatchType, err: { message: string }) => {
    dispatch(setStatusAC("failed"))
    dispatch(setErrorAC(err.message))
}

type ErrorUtilsDispatchType = Dispatch<appActionsType>
