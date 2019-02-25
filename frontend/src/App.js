import React from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Login from './app/Login';
import Boards from './app/boards';
import Board from './app/board/board';
import HTML5Backend from 'react-dnd-html5-backend'
import { DragDropContext } from 'react-dnd'
import './assets/style.css';

const App = ({ store }) => (
  <Provider store={store}>
    <Router>
      <div>
        <Route path="/" component={Login} />
        <Route path="/boards" component={Boards} /> 
        <Route path="/board/:boardId" component={Board} /> 
      </div>
    </Router>
  </Provider>
)

App.propTypes = {
  store: PropTypes.object.isRequired
}

export default DragDropContext(HTML5Backend)(App);