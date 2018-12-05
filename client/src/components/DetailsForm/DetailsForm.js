import React from 'react'
import { Input, Button } from 'antd'
import { PropTypes } from 'prop-types'
import { map, omit } from 'lodash'
import { Field } from 'redux-form'
import { makeField } from '../../helpers/makefield'

const AInput = makeField(Input)

export default class DetailsForm extends React.Component {
  renderInput = (key) => {
    return (
      <Field
        id={key}
        name={key}
        component={AInput}
        type="text"
      />
    )
  }

  renderFields = () => {
    const { 
      selectedRow
    } = this.props
    var divStyle = {
      color: 'white',
    }
    return (
      map(omit(selectedRow, ['id']), (value, key) => (
        <div
          key={key}
        >
          <div style={divStyle}>
            {key.replace(/_/g, ' ')}
          </div>
          {this.renderInput(key)}
        </div>
      ))
    )
  }

  render() {
    const { handleSubmit } = this.props
    return (
      <React.Fragment>
        { this.renderFields() }
        <Button
          onClick={handleSubmit}
          icon="check"
        />
      </React.Fragment>
    )
  }
}