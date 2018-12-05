import React from 'react'
import { Route, Switch, Redirect } from 'react-router'
import App from './components/App'
import Form from './components/Form'
import Grid from './components/grid'

const Routes = () => {
  console.log('ASSDASDASDASDASDASDASDASDASDSDSAD')
  return (
    <App>
      <Switch>
        <Route exact path="/Grid" component={Grid} />
        <Route exact path="/Form" component={Form} />
      </Switch>
    </App>
  )
}

export default Routes
