import React, { Component } from 'react';
import { connect } from 'react-redux';
import Styled from '../../assets/styled-components';
import  { Redirect } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import listServices from '../../services/list';
import cardServices from '../../services/card';
import { setLists } from '../../redux/feature/lists/list.actions';
import { getBoardData } from '../../redux/feature/board/board.actions';


class Board extends Component {
    constructor(props){
        super(props);
        this.state = {
            // listsObjects: [],
            // createListButtonDisabled: false,
            createNewCard: false,
        }
    }

    componentWillMount = async() => {
        if(!this.props.board) return;
        this.props.getBoardData();
    }


    deleteCard = (cardId, listId) => {
        //delete from db
        cardServices.deleteCard(cardId);
        //delete from state obj
        const listsObjects = this.state.listsObjects;
        const listIndex = listsObjects.findIndex((list => list._id === listId));
        const cardIndex = listsObjects[listIndex].cards.findIndex(card => card._id === cardId);
        if(cardIndex >= 0 ) {
            listsObjects[listIndex].cards.splice(cardIndex, 1);
        }
        this.setState({"listsObjects": listsObjects});
    }

    deleteList = (listId) => {
        //delete from db
        listServices.deleteList(listId);
        //delete from state obj
        const listsObjects = this.state.listsObjects;
        const listIndex = listsObjects.findIndex((list => list._id === listId));
        if(listIndex >= 0 ) {
            listsObjects.splice(listIndex, 1);
        }
        this.setState({"listsObjects": listsObjects});
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
                            // return <Styled.listWrapper key={listId} text={lists[listId].title} id={lists[listId]._id} deleteList={this.deleteList} 
                            //     cards={lists[listId].cards} isNew={false} />
                            return <Styled.listWrapper key={listId} list={lists[listId]} deleteList={this.deleteList} 
                                isNew={false} />
                        })
                    }
                    <Styled.listWrapper boardId={board._id} onBlurTextAction={this.onBlurCreateList} isNew={true}>
                        {/* <Button size="medium" color="primary" disabled={this.state.createListButtonDisabled} 
                        onClick={this.createList} >
                            <AddIcon />create New List
                        </Button> */}
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

export default connect(mapStateToprops, { setLists, getBoardData })(Board);