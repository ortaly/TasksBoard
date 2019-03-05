import React, { Component } from 'react';

import { connect } from 'react-redux';
import  { Redirect } from 'react-router-dom';
import { setBoards, setSelectedBoard } from '../actions/boards.actions';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import DashboardIcon from '@material-ui/icons/Dashboard';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Typography from '@material-ui/core/Typography';
import { compose } from 'recompose';
import { withStyles } from '@material-ui/core/styles';
import Styles from '../assets/override-styles';
import userService from '../services/user';
import boardService from '../services/board';
import Collapse from '@material-ui/core/Collapse';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';


class Boards extends Component {
    constructor(props){
        super(props);
        this.state = {
            boards: [],
            redirectToBoard: false,
            createNew: false,
            newBoardName: ''
        }

        this.createNewBoard = this.createNewBoard.bind(this);
        this.openCreateBoardSection = this.openCreateBoardSection.bind(this);
    }

    async componentDidMount(){
        if (this.props.user && this.props.user.id){
            const boards = await userService.getBoards();
            await this.props.setBoards(boards);
            this.setState({boards: boards});
            console.log("boards: " + JSON.stringify(boards));
        }
    }

    handleChange = name => event => {
        this.setState({ [name]: event.target.value });
    };

    openCreateBoardSection() {
        this.setState({createNew: true});
    }

    openBoard(event, boardId){
        if(boardId){
            const board = this.state.boards.find(board => {
                return board._id === boardId;
            })
            this.props.setSelectedBoard(board);
            this.setState({redirectToBoard: board.name});
        } else {
            console.log("ERROR: no boardId to open!")
        }
    }

    async createNewBoard(){
        const newBoard = await boardService.createNewBoard(this.props.user.id, this.state.newBoardName);
        let boards = this.state.boards;
        boards.push(newBoard);
        this.setState({boards: boards});
        this.setState({createNew: false});
        this.setState({newBoardName: ''})
    }

    render() {
        const { user } = this.props;

        if (this.state.redirectToBoard) {
            return <Redirect to={`/board/${this.state.redirectToBoard}`}/>;
        }

        if (this.state.redirectToCreateNew) {
            return <Redirect to='/createBoard'/>;
        }  
        if (user && user.id) { 
            return (
                <div>
                    <AppBar position="static" color="default">
                        <Toolbar>
                            <Typography variant="h6" color="inherit">
                                {`${user.firstName} ${user.lastName}'s Boards: `}
                                
                            </Typography>
                        </Toolbar>
                    </AppBar>
                    <br/>
                    {this.state.boards.map((board) => 
                        <ListItem button onClick={event => this.openBoard(event, board._id)}>
                            <Avatar>
                                <DashboardIcon />
                            </Avatar>
                            <ListItemText primary={board.name} classes={{ primary: this.props.classes.whiteName }}/>
                        </ListItem>
                    )}
                    <Button variant="outlined" size="medium" color="primary" onClick={this.openCreateBoardSection}>
                        <AddIcon />create New Board
                    </Button>
                    <br/><br/>
                    <Collapse in={this.state.createNew}>
                        <div>
                            <ValidatorForm onSubmit={(event) => this.createNewBoard(event)}>
                                <TextValidator label="Board Name"
                                    onChange={this.handleChange('newBoardName')} 
                                    validators={['required']} errorMessages={['this field is required']} value={this.state.newBoardName}/>
                                <br/><br/>
                                <Button type="submit" variant="contained" color="primary">Create</Button>
                            </ValidatorForm>
                        </div>
                    </Collapse>
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


