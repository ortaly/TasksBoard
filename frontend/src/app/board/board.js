import React, { Component } from 'react';
import { connect } from 'react-redux';
import Styled from '../../assets/styled-components';
import  { Redirect } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import boardServices from '../../services/board';
import listServices from '../../services/list';
import cardServices from '../../services/card';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import { setLists } from '../../actions/list.actions';


class Board extends Component {
    constructor(props){
        super(props);
        this.state = {
            listsObjects: [],
            createListButtonDisabled: false,
            createNewCard: false,
        }
        this.createListRef = React.createRef();
    }

    componentWillMount = async() => {
        if(!this.props.board) return;
        this.getBoardData();
    }

    getBoardData = async() => {
        const listsData = await boardServices.getBoardLists(this.props.board._id);
        const lists = await Promise.all(listsData.map(async list => {
            const cards = await listServices.getListCards(list._id);
            console.log(`cards for ${list._id}: ` + JSON.stringify(cards));
            return {...list, cards: cards};
        }));
        console.log("Lists: " + JSON.stringify(lists));
        this.setState({listsObjects: lists});
        this.props.setLists(lists);
    }

    moveCard = (id, origListId, destListId) => {
        const lists = this.state.listsObjects;
        const origIndex = lists.findIndex(list => list._id === origListId);
        const destIndex = lists.findIndex(list => list._id === destListId);

        const cardToMoveIndex = lists[origIndex].cards.findIndex(card => card._id === id);
        const card = lists[origIndex].cards[cardToMoveIndex];
        card.listId = destListId;
        //remove card
        lists[origIndex].cards.splice(cardToMoveIndex, 1);
        lists[destIndex].cards.push(card);

        this.setState({listsObjects: lists});
        cardServices.updateCard(id, {"listId": destListId});
        
    }

    createList = () => {
        this.createListRef.current.focus();
    }

    onFocusCreateList = () => {
        this.setState({createListButtonDisabled: true});
    }

    onBlurCreateList = () => {
        this.setState({createListButtonDisabled: false});
        this.getBoardData();
    }

    addNewCard = async(listId) => {
        const listsObjects = this.state.listsObjects;
        const index = listsObjects.findIndex((list => list._id === listId));
        let newCard = await cardServices.addNewCard(listId,  "Card Title");
        newCard.isNew = true;
        listsObjects[index].cards.push(newCard);
        this.setState({"listsObjects": listsObjects});
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
        const { board } = this.props;
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
                        this.state.listsObjects.map((list,i) => {
                            return <Styled.listWrapper key={list} text={list.title} id={list._id} moveCard={this.moveCard} deleteList={this.deleteList}>
                            {
                                list.cards.map(card => {
                                    return <Styled.cardWrapper key={card._id} text={card.title} id={card._id} listId={list._id} 
                                    isNew={card.isNew} deleteCard={this.deleteCard}></Styled.cardWrapper>
                                })
                            }
                            <Button size='medium' color="primary" onClick={() => this.addNewCard(list._id)}>
                                <AddIcon />Add a card
                            </Button>
                            </Styled.listWrapper>
                        })
                    }
                    <Styled.listWrapper focusRef={this.createListRef} boardId={board._id} 
                    onFocusTextAction={this.onFocusCreateList} onBlurTextAction={this.onBlurCreateList}>
                        <Button size="medium" color="primary" disabled={this.state.createListButtonDisabled} 
                        onClick={this.createList}>
                            <AddIcon />create New List
                        </Button>
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

export default connect(mapStateToprops, { setLists })(Board);