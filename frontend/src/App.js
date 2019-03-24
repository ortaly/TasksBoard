import React from 'react'
import PropTypes from 'prop-types'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Login from './app/Login';
import Boards from './app/boards';
import Register from './app/Register';
import Board from './app/board/board';
import './assets/style.css';
import history from './history';

const App = () => (
    <Router history={history}>
      <div>
        <Route path="/" exact={true} component={Login} />
        <Route path="/boards" component={Boards} /> 
        <Route path="/register" component={Register} /> 
        <Route path="/board/:boardId" component={Board} />
      </div>
    </Router>
)

App.propTypes = {
  store: PropTypes.object.isRequired
}

export default App;