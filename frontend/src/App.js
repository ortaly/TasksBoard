import React from 'react'
import PropTypes from 'prop-types'
import { Route, Switch, withRouter } from 'react-router-dom';
import Login from './app/Login';
import Boards from './app/boards';
import Register from './app/Register';
import Board from './app/board/board';
import './assets/style.css';
import { BrowserRouter } from 'react-router-dom';

const App = () => (
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/boards" component={Boards} /> 
        <Route path="/register" component={Register} /> 
        <Route path="/board/:boardId" component={Board} />
      </Switch>
)

App.propTypes = {
  store: PropTypes.object.isRequired
}

export default withRouter(App);