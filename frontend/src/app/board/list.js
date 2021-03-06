import React, { Component } from 'react';
import { connect } from 'react-redux';
import Styled from '../../assets/styled-components';
import { compose } from 'recompose';
import Styles from '../../assets/override-styles';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { addNewList, updateList, moveCard, addNewCard, deleteList } from '../../redux/feature/lists/list.actions';
import AddIcon from '@material-ui/icons/Add';


class List extends Component{
    constructor(props) {
        super(props);
        this.state = {
            listTitle: props.list && props.list.title || '',
            createListButtonDisabled: false
        }
        if (props.isNew) {
            this.createListRef = React.createRef();
        }
    }

    onDragOver = (ev) => {
        ev.preventDefault();
    }
      
    onDrop = (ev) => {
        ev.preventDefault();
        const cardId = ev.dataTransfer.getData("id");
        const origListId = ev.dataTransfer.getData("origListId");
        const destListId = this.props.list._id;
        if(origListId && destListId) {
            this.props.moveCard(cardId, origListId, destListId);
        }
    }

    onFocusCreateList = () => {
        this.setState({createListButtonDisabled: true});
    }

    addNewCard = async(listId) => {
        this.props.addNewCard(listId);
    }

    renameOrCreateList = async(ev) => {
        const name = ev.target.value;
        const listId = this.props.list && this.props.list.id;
        if(listId) {
            this.props.updateList(listId, name);
            return;
        }
        const boardId = this.props.boardId;
        if (boardId && name)  {
            this.props.addNewList(boardId, name);
            this.setState({createListButtonDisabled: false, listTitle: ''});
        }
    }

    createList = () => {
        this.createListRef.current.focus();
    }

    updateTitle = (ev) => {
        this.setState({listTitle: ev.target.value});
    }

    render() {
        let addButton;
        let { list, isNew } = this.props;
        if(isNew){
            addButton = <Button size="medium" color="primary" disabled={this.state.createListButtonDisabled} 
                        onClick={this.createList} >
                            <AddIcon />create New List
                        </Button>
        } else {
            addButton = <Button size='medium' color="primary" onClick={() => this.addNewCard(list._id)}>
                <AddIcon />Add a card
            </Button>;
        }
        return (
            <div className={this.props.className} onDrop={!isNew ? event => this.onDrop(event): null}
            onDragOver={(event => this.onDragOver(event))}>
                <Styled.listContent >
                    <Styled.listHeader>
                        <Styled.styledName ref={this.createListRef} onBlur={this.renameOrCreateList} onFocus={this.onFocusCreateList}
                            value={this.state.listTitle} onChange={this.updateTitle}/>
                        {!isNew ?
                            <Button size="small" variant="outlined" color="primary" classes={{label: this.props.classes.smallButton}} 
                            onClick={() => this.props.deleteList(list._id)}>Delete</Button>:
                            null
                        }
                    </Styled.listHeader>
                    {
                        list && list.cards && list.cards.map(card => {
                            return <Styled.cardWrapper key={card._id} text={card.title} id={card._id} listId={list._id} 
                                isNew={card.isNew}></Styled.cardWrapper>
                        })
                    }
                    {addButton}
                    
                </Styled.listContent>
            </div>
        )
    }
}

const mapDispatchToProps = { 
    addNewList, 
    moveCard, 
    updateList, 
    addNewCard, 
    deleteList 
}

export default compose(
    withStyles(Styles),
    connect(null, mapDispatchToProps)
 )(List);