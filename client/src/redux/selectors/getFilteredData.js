import { getFormValues } from 'redux-form'
import filter from 'lodash/filter'
import get from 'lodash/get'
import { createSelector } from 'reselect'
import { isNumber } from 'util'
// import moment from 'moment'

const getList = (state) => state.exerciseReducer.list
const getValues = (state) => getFormValues('filter_form')(state)

const logicalOperators = {
  '>': (a, b) => a > b,
  '>=': (a, b) => a >= b,
  '<': (a, b) => a < b,
  '<=': (a, b) => a <= b
}

const getFilteredData = createSelector([
  getList,  
  getValues,
], (list, filterValues) => {
  if (filterValues) {
    const firstElement = get(list, '[0]', {})
    const filters = Object.entries(firstElement).reduce((previousValue, value) => {
      if (isNumber(value[1])) {
        return {
          ...previousValue,
          numberFilters: [
            ...previousValue.numberFilters,
            value[0]
          ],
        }
      }
      return previousValue
    }, { dateFilters: [], numberFilters: [] })

    return filter(list, value => Object.keys(filterValues)
      .reduce((previousValue, key) => {
        if (filters.numberFilters.includes(key)) {
          if (/\s*[<>]=?\s*\d*/gm.test(filterValues[key])) {
            const opearator = filterValues[key].match(/[<>]=?/gm)
            const val = filterValues[key].match(/\d+/gm)
            const RetVal = logicalOperators[opearator] ? logicalOperators[opearator](value[key], val) : ''
            return RetVal
          }
        }
        const notNullValue = value[key] || value[key] === 0 ? value[key] : ''
        return previousValue && notNullValue.toString().toUpperCase()
          .includes(filterValues[key].toString().toUpperCase())
      },
      true))
  }
  return list
})

export default getFilteredData
