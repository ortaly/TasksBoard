import React, { Component } from 'react';
import { connect } from 'react-redux';
import  { Redirect } from 'react-router-dom';
import { createBoard, selectBoard } from '../redux/feature/boards/boards.actions';
import { getBoards } from '../redux/feature/user/user.actions';
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
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';


class Boards extends Component {
    constructor(props){
        super(props);
        this.state = {
            redirectToBoard: false,
            createNewDialog: false,
            newBoardName: ''
        }
    }

    componentDidMount = async () => {
        this.props.getBoards();
    }

    handleChange = name => event => {
        this.setState({ [name]: event.target.value });
    };

    openCreateBoardDialog = () => {
        this.setState({createNewDialog: true});
    }

    handleClose = () => {
        this.setState({createNewDialog: false, newBoardName: ''});
    }

    openBoard = async (event, boardId) => {
        if(boardId){
            await this.props.selectBoard(boardId);
            if(this.props.selectedBoard){
                this.setState({redirectToBoard: this.props.selectedBoard.name});
            }
        } else {
            console.log("ERROR: no boardId to open!")
        }
    }

    createNewBoard = async () => {
        this.props.createBoard(this.state.newBoardName);
        this.handleClose();
    }

    render() {
        const { user } = this.props;

        if (this.state.redirectToBoard) {
            return <Redirect to={`/board/${this.state.redirectToBoard}`}/>;
        }
        const boardsList = this.props.boards ? (this.props.boards.map((board) => 
                <ListItem button key={board._id} onClick={event => this.openBoard(event, board._id)}>
                    <Avatar>
                        <DashboardIcon />
                    </Avatar>
                    <ListItemText primary={board.name} classes={{ primary: this.props.classes.whiteName }}/>
                </ListItem>
            )) : null;

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
                    <Button variant="outlined" size="medium" color="primary" onClick={this.openCreateBoardDialog}>
                        <AddIcon />create New Board
                    </Button>
                    <br/>
                    {boardsList}
                    <br/><br/>
                    <Dialog
                        open={this.state.createNewDialog} onClose={this.handleClose} aria-labelledby="form-dialog-title">
                        <DialogTitle id="form-dialog-title">Create New Board</DialogTitle>
                        <DialogContent>
                            <TextField autoFocus margin="dense" id="name" label="Board Name" type="text" fullWidth 
                            value={this.state.newBoardName} onChange={this.handleChange('newBoardName')} />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleClose} color="primary">
                            Cancel
                            </Button>
                            <Button onClick={this.createNewBoard} color="primary">
                            Create
                            </Button>
                        </DialogActions>
                    </Dialog>
                </div>
            );
        }
        return <Redirect to='/'/>;
    }
}

const mapStateToProps = (state) => {
    return { user: state.user, boards: state.boards.boardsList, selectedBoard: state.boards.selectedBoard };
}

const mapDispatchToProps = {
    createBoard, 
    getBoards, 
    selectBoard
}

export default compose(
    withStyles(Styles),
    connect(mapStateToProps, mapDispatchToProps)
 )(Boards)


