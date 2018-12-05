import initialState from './initialState'
import { 
  CHANGE_COLLAPSED_SIDEBAR,
  GET_DATA_PENDING,
  GET_DATA_FULLFILED,
  GET_DATA_REJECTED,
  SELECT_ROW,
  UPDATE_ITEM_FULLFILED,
  UPDATE_ITEM_REJETED,
  ADD_ITEM_FULLFILED,
  ADD_ITEM_REJECTED,
  REMOVE_ITEM_FULFILLED,
  REMOVE_ITEM_REJECTED
} from './const'

const reducer = (state = initialState, action ) => {
  switch (action.type) {
    case CHANGE_COLLAPSED_SIDEBAR: {
      return {
        ...state,
        collapsed: action.payload.collapsed
      }
    }
    case REMOVE_ITEM_FULFILLED: {
      return {
        ...state,
        list: state.list.filter(x => x.id !== action.payload.id)
      }
    }
    case REMOVE_ITEM_REJECTED: {
      return {
        ...state,
        errorMsg: action.payload.errorMsg
      }
    }
    case ADD_ITEM_FULLFILED: {
      const { newItem } = action.payload
      const newList = [...state.list]
      newList.push(newItem)
      return {
        ...state,
        list: newList
      }
    }
    case ADD_ITEM_REJECTED: {
      return {
        ...state,
        errorMsg: action.payload.errorMsg
      }
    }
    case UPDATE_ITEM_REJETED: {
      return {
        ...state,
        errorMsg: action.payload.errorMsg
      }
    }
    case UPDATE_ITEM_FULLFILED: {
      const { item } = action.payload
      const index = state.list.findIndex(x => x.id === item.id)
      const newList = [...state.list]
      newList[index] = item
      return {
        ...state,
        list: newList
      }
    }

    case GET_DATA_PENDING: {
      return {
        ...state,
        errorMsg: '',
        isFetching: true
      }
    }
    case GET_DATA_FULLFILED: {
      return {
        ...state,
        list: action.payload.data,
        isFetching: false,
      }
    }
    case SELECT_ROW: {
      return {
        ...state,
        selectedRow: action.payload.item
      }
    }
    case GET_DATA_REJECTED: {
      return {
        ...state,
        errorMsg: action.payload.errorMsg,
        isFetching: false,
      }
    }
    default:
      return state
  }
}

export default reducer