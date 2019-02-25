import React, { Component } from 'react';

import { connect } from 'react-redux';
import  { Redirect } from 'react-router-dom';
import axios from 'axios';
import { setBoards, setSelectedBoard } from '../actions/boards.actions';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import DashboardIcon from '@material-ui/icons/Dashboard';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { compose } from 'recompose';
import { withStyles } from '@material-ui/core/styles';
import Styles from '../assets/override-styles';


class Boards extends Component {
    constructor(props){
        super(props);

        this.state = {
            boards: [],
            redirectToBoard: false,
            redirectToCreateNew: false
        }
    }

    async componentDidMount(){
        if (this.props.user && this.props.user.id){
            const token = localStorage.getItem('userToken');
            const response = await axios.get(`http://localhost:3000/user/boards`, { headers: {"x-access-token" : `${token}`}});
            const boards = response.data;
            await this.props.setBoards(boards);
            this.setState({boards: boards});
            console.log("boards: " + JSON.stringify(boards));
        }
    }

    openBoard(event, boardId){
        if(boardId){
            const board = this.state.boards.find(board => {
                return board._id == boardId;
            })
            this.props.setSelectedBoard(board);
            this.setState({redirectToBoard: board.name});
        } else {
            console.log("ERROR: no boardId to open!")
        }
    }

    createNewBoard(){
        this.setState({redirectToCreateNew: true});
    }

    render() {
        const { user } = this.props;

        if (this.state.redirectToBoard) {
            return <Redirect to={`/board/${this.state.redirectToBoard}`}/>;
        }

        if (this.state.redirectToCreateNew) {
            return <Redirect to='/createBoard'/>;
        }  
        if (user && user.name && user.id) { 
            return (
                <div>
                    <AppBar position="static" color="default">
                        <Toolbar>
                            <Typography variant="h6" color="inherit">
                                {`${user.name}'s Boards: `}
                                
                            </Typography>
                        </Toolbar>
                    </AppBar>
                    <br/>
                    {this.state.boards.map((board) => 
                        <ListItem button onClick={event => this.openBoard(event, board._id)}>
                            <Avatar>
                                <DashboardIcon />
                            </Avatar>
                            <ListItemText primary={board.name} classes={{ primary: this.props.classes.boardName }}/>
                        </ListItem>
                    )}
                    {/* <Button variant="outlined" size="medium" color="primary" onClick={this.createNewBoard}>
                        <AddIcon />create New Board
                    </Button> */}
                </div>
            );
        }
        return <Redirect to='/'/>;
    }
}

const mapStateToProps = (state) => {
    return { user: state.user };
}

export default compose(
    withStyles(Styles),
    connect(mapStateToProps, {setBoards, setSelectedBoard})
 )(Boards)


