import {
  get,
  put,
  post,
  del
} from '..'

const getPeople = () => get('http://localhost:3000/api/people')
const postItem = data => post(`http://localhost:3000/api/people/`, data)
const putItem = (id, data) => put(`http://localhost:3000/api/people/${id}`, data)
const deleteItem = id => del(`http://localhost:3000/api/people/${id}`)

export {
  getPeople,
  deleteItem,
  putItem,
  postItem
}
