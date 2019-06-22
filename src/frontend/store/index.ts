import { combineReducers } from 'redux'
import { inputReducer } from './input/reducers'
import { translateReducer } from './translate/reducers';
import { combineEpics } from 'redux-observable';
import { translateEpic } from './translate/epics';

export const rootEpic = combineEpics(
    translateEpic
)

export const rootReducer = combineReducers({
    input: inputReducer,
    translate: translateReducer
})

export type AppState = ReturnType<typeof rootReducer>