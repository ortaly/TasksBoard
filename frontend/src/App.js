import React from 'react'
import PropTypes from 'prop-types'
import { BrowserRouter , Route, Switch, withRouter } from 'react-router-dom'
import Login from './app/Login';
import Boards from './app/boards';
import Register from './app/Register';
import Board from './app/board/board';
import './assets/style.css';

const App = () => (
      <div>
        <Route path="/" exact={true} component={Login} />
        <Route path="/boards" component={Boards} /> 
        <Route path="/register" component={Register} /> 
        <Route path="/board/:boardId" component={Board} />
      </div>
)

App.propTypes = {
  store: PropTypes.object.isRequired
}

export default withRouter(App);