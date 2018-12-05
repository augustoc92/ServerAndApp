import { reject } from 'ramda'
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
  REMOVE_ITEM_REJECTED,
} from './const'

import { getPeople, deleteItem, postItem, putItem } from '../../helpers/api/people'

export const toggleDetailsBar = shouldCollapse => (dispatch) => {
  dispatch({
    type: CHANGE_COLLAPSED_SIDEBAR,
    payload: {
      collapsed: !shouldCollapse
    }
  })
}
export const thunkGetPeople = () => (dispatch) => {
  dispatch({
    type: GET_DATA_PENDING
  })
  return getPeople()
    .then((json) => {
      dispatch({
        type: GET_DATA_FULLFILED,
        payload: json
      })
    })
    .catch((e) => {
      dispatch({
        type: GET_DATA_REJECTED,
        payload: {
          errorMsg: `Failed trying to get data ${e.error}`
        }
      })
    })
}
export const selectRow = item => (dispatch) => {
  dispatch({
    type: SELECT_ROW,
    payload: {
      item
    }
  })
}
export const removeItem = (id) => (dispatch) => {
  deleteItem(id)
    .then(() => {
      dispatch({
        type: REMOVE_ITEM_FULFILLED,
        payload: {
          id
        }
      })
    })
    .catch((errMsg) => {
      dispatch({
        type: REMOVE_ITEM_REJECTED,
        payload: {
          errorMsg: errMsg
        }
      })
    })
}
export const addItem = (item) => (dispatch) => {
  const formatItem = reject(a => !a && a !== Number, item)
  postItem(formatItem)
    .then(() => {
      dispatch({
        type: ADD_ITEM_FULLFILED,
        payload: {
          newItem: item
        }
      })
    })
    .catch((errMsg) => {
      dispatch({
        type: ADD_ITEM_REJECTED,
        payload: {
          errorMsg: errMsg
        }
      })
    })
}

export const updateItem = (item) => (dispatch) => {
  const { id } = item
  const formatItem = JSON.stringify(reject(a => !a && a !== Number, item))
  putItem(id, formatItem).then(() => {
    dispatch({
      type: UPDATE_ITEM_FULLFILED,
      payload: {
        item
      }
    })
  })
    .catch((e) => {
      dispatch({
        type: UPDATE_ITEM_REJETED,
        payload: {
          errorMsg: `Failed trying to update item ${e.error}`
        }
      })
    })
}
