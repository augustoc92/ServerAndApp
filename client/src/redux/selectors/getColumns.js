import { createSelector } from 'reselect'
import difference from 'lodash/difference'
import get from 'lodash/get'

const getList = (state) => state.exerciseReducer.list

const getColumnsFromData = createSelector([
  getList,
], (
  list,
) => {
  const objToReturn = {}
  const columnsToShow = []
  const columns = Object.keys(get(list, '[0]', {}))
  columns.forEach((item) => {
    const title = item.replace(/_/g, ' ')
      columnsToShow.push({
        dataIndex: item,
        key: item,
        width: 100,
      })
  })
  objToReturn.columnsToShow = columnsToShow.filter(x => x.dataIndex !== 'id')
  return objToReturn.columnsToShow
})

export default getColumnsFromData
