import React from 'react'
import { Route, Switch} from 'react-router-dom';
import Login from './app/Login';
import Boards from './app/boards';
import Register from './app/Register';
import Board from './app/board/board';
import './assets/style.css';

const App = () => (
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/boards" component={Boards} /> 
        <Route path="/register" component={Register} /> 
        <Route path="/board/:boardId" component={Board} />
      </Switch>
)

export default App;