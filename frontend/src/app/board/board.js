import React, { Component } from 'react';
import { connect } from 'react-redux';
import Styled from '../../assets/styled-components';
// import Card from './card';
import axios from 'axios';
import  { Redirect } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';


class Board extends Component {
    constructor(props){
        super(props);

        this.state = {
            lists: [],
        }

        this.moveCard = this.moveCard.bind(this);
    }

    async componentDidMount(){
        if(!this.props.board) return;
        const boardId = this.props.board._id;
        const token = localStorage.getItem('userToken');
        const response = await axios.get(`http://localhost:3000/board/${boardId}/lists`, { headers: {"x-access-token" : `${token}`}});
        const lists = await Promise.all(response.data.map(async list => {
            const listId = list._id;
            const res = await axios.get(`http://localhost:3000/list/${listId}/cards`, { headers: {"x-access-token" : `${token}`}});
            const cards = res.data;
            console.log(`cards for ${listId}: ` + JSON.stringify(cards));
            return {...list, cards: cards};
        }));
        console.log("Lists: " + JSON.stringify(lists));
        this.setState({lists: lists});
        
    }

    moveCard(id, origListId, destListId) {
        const lists = this.state.lists;
        const origIndex = lists.findIndex(list => list._id === origListId);
        const destIndex = lists.findIndex(list => list._id === destListId);

        const cardToMoveIndex = lists[origIndex].cards.findIndex(card => card._id === id);
        const card = lists[origIndex].cards[cardToMoveIndex];
        card.listId = destListId;
        //remove card
        lists[origIndex].cards.splice(cardToMoveIndex, 1);
        lists[destIndex].cards.push(card);

        this.setState({lists: lists});

        const token = localStorage.getItem('userToken');
        axios.put(`http://localhost:3000/card/${id}`, {"listId": destListId},
            { headers: {"x-access-token" : `${token}`}});
    }

    render() {
        const {board} = this.props;

            if (board && board.name) {
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
                            this.state.lists.map(list => {
                                return <Styled.listWrapper text={list.title} id={list._id} moveCard={this.moveCard}>
                                {
                                    list.cards.map(card => {
                                        return <Styled.cardsWrapper text={card.title} id={card._id} listId={list._id}></Styled.cardsWrapper>
                                    })
                                }
                                </Styled.listWrapper>
                            })
                        }
                    </Styled.boardWrapper>
                )
            }
            return <Redirect to='/'/>;
    }

}

const mapStateToprops = (state) => {
    return { board: state.boards.selectedBoard };
}


export default connect(mapStateToprops)(Board);