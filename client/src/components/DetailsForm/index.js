import { connect } from 'react-redux'
import { reduxForm, reset, submit } from 'redux-form'
import { bindActionCreators } from 'redux'
import DetailsForm from './DetailsForm'
import {
  updateItem,
  addItem,
  toggleDetailsBar
} from '../../redux/modules/actions'

const mapStateToProps = (state) => {
  const { selectedRow } = state.exerciseReducer
  return ({
    initialValues: {
      ...selectedRow,
    }
  })
}

const validateEmail = (email) => {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

const validate = (values) => {
  const errors = {}
  const requiredFields = ['firstname', 'lastname', 'email', 'birthdate', 'phone']
  requiredFields.forEach((field) => {
    if (!values[field]) errors[field] = 'Required'
  })
  // Validate the email with regex and the autosuggest to be one of the items the user can select
  if (values.email) {
    if (!validateEmail(values.email)) errors.email = 'Valid format'
  }
  
  return errors
}

const onSubmit = (values, dispatch, props) => {
  const { collapsed } = props
  if (values.id) dispatch(updateItem(values))
  else dispatch(addItem(values))
  dispatch(reset('details_form'))
  dispatch(toggleDetailsBar(collapsed))
}

const formConfig = {
  form: 'details_form',
  onSubmit,
  validate,
  enableReinitialize: true,
}

export default connect(mapStateToProps)(reduxForm(formConfig)(DetailsForm))
