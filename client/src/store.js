import { applyMiddleware, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'
import thunk from 'redux-thunk'
import rootReducer from './redux'

export default function configureStore() {
  const enhancer = composeWithDevTools(
    applyMiddleware(thunk)
  )
  return createStore(rootReducer, enhancer)
}
