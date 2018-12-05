import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import exerciseReducer from './modules/reducers'

const reducers = combineReducers({
  form: formReducer,
  exerciseReducer,
})

export default reducers
