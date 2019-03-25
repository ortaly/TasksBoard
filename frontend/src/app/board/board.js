import React, { Component } from 'react';
import { connect } from 'react-redux';
import Styled from '../../assets/styled-components';
import  { Redirect } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { setLists } from '../../redux/feature/lists/list.actions';
import { getBoardData } from '../../redux/feature/board/board.actions';


class Board extends Component {
    constructor(props){
        super(props);
        this.state = {
            createNewCard: false,
        }
    }

    componentWillMount = async() => {
        if(!this.props.board) return;
        this.props.getBoardData();
    }

    render() {
        const { board, lists } = this.props;
        if ( board && board.name ) {
            return (
                <Styled.boardWrapper>
                    <br/>
                    <AppBar position="static" color="default">
                        <Toolbar>
                            <Typography variant="h6" color="inherit">
                                Board {board.name} 
                            </Typography>
                        </Toolbar>
                    </AppBar>
                    <br/>
                    {
                        Object.keys(lists).map((listId) => {
                            return <Styled.listWrapper key={listId} list={lists[listId]} isNew={false} />
                        })
                    }
                    <Styled.listWrapper boardId={board._id} isNew={true}>
                    </Styled.listWrapper>
                </Styled.boardWrapper>
            )
        }
        return <Redirect to='/'/>;
    }

}

const mapStateToprops = (state) => {
    return { 
        board: state.boards.selectedBoard, 
        lists: state.lists
    };
}

const mapDispatchToProps = { 
    setLists, 
    getBoardData 
};

export default connect(mapStateToprops, mapDispatchToProps)(Board);