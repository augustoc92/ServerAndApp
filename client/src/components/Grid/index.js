import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import { bindActionCreators } from 'redux'
import 'antd/dist/antd.css';
import Grid from './view'
import {
  toggleDetailsBar,
  thunkGetPeople,
  selectRow,
  removeItem
} from '../../redux/modules/actions'
import getColumnsFromData from '../../redux/selectors/getColumns'
import getFilteredData from '../../redux/selectors/getFilteredData'

const mapStateToProps = state => { 
  const cols = getColumnsFromData(state)
  const filteredList = getFilteredData(state)
  return ({
    cols,
    list: filteredList,
    trueOrFalse: state.exerciseReducer.collapsed,
    selectedRow: state.exerciseReducer.selectedRow
  })
}

const mapDispatchToProps = dispatch => bindActionCreators({
  toggleDetailsBar,
  thunkGetPeople,
  selectRow,
  removeItem
}, dispatch)

const formConfig = {
  form: 'filter_form',
  enableReinitialize: true,
}
export default connect(mapStateToProps, mapDispatchToProps)(reduxForm(formConfig)(Grid))
