import { combineReducers } from 'redux'
import { inputReducer } from './input/reducers'

export const rootReducer = combineReducers({
    input: inputReducer
})

export type AppState = ReturnType<typeof rootReducer>