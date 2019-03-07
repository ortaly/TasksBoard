import React, { Component } from 'react';
import { connect } from 'react-redux';
import Styled from '../../assets/styled-components';
import { compose } from 'recompose';
import Styles from '../../assets/override-styles';
import { withStyles } from '@material-ui/core/styles';
import listServices from '../../services/list';
import Button from '@material-ui/core/Button';
import { addNewList } from '../../actions/list.actions';

class List extends Component{
    constructor(props) {
        super(props);
        this.state = {
            listTitle: props.text
        }
    }

    onDragOver = (ev) => {
        ev.preventDefault();
    }
      
    onDrop = (ev) => {
        ev.preventDefault();
        const cardId = ev.dataTransfer.getData("id");
        const origListId = ev.dataTransfer.getData("origListId");
        const destListId = this.props.id;
        if(origListId && destListId) {
            this.props.moveCard(cardId, origListId, destListId);
        }
    }

    renameOrCreateList = async(ev) => {
        const name = ev.target.value;
        const id = this.props.id;
        if(id) {
            listServices.updateList(id, {"title": name});
            return;
        }
        const boardId = this.props.boardId;
        if (boardId && name)  {
            ev.target.value = "";
            const list = await listServices.createList(boardId, name);
            this.props.addNewList(list);
            this.props.onBlurTextAction();
        }
    }

    updateTitle = (ev) => {
        this.setState({listTitle: ev.target.value});
    }

    render() {
        return (
            <div className={this.props.className} onDrop={event => this.onDrop(event)}
            onDragOver={(event => this.onDragOver(event))}>
                <Styled.listContent >
                    <Styled.listHeader>
                        <Styled.styledName ref={this.props.focusRef} onBlur={this.renameOrCreateList} onFocus={this.props.onFocusTextAction}
                            value={this.state.listTitle} onChange={this.updateTitle}/>
                        <Button size="small" variant="outlined" color="primary" classes={{label: this.props.classes.smallButton}} onClick={() => this.props.deleteList(this.props.id)}>Delete</Button>
                    </Styled.listHeader>
                    { this.props.children }
                    
                </Styled.listContent>
            </div>
        )
    }
}

export default compose(
    withStyles(Styles),
    connect(null, { addNewList })
 )(List);