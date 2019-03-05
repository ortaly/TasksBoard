import React, { Component } from 'react';
import { connect } from 'react-redux';
import Styled from '../../assets/styled-components';
import listServices from '../../services/list';
import { addNewList } from '../../actions/list.actions';

class List extends Component{

    constructor(props) {
        super(props);
        this.renameOrCreateList = this.renameOrCreateList.bind(this);
    }

    onDragOver(ev) {
        ev.preventDefault();
    }
      
    onDrop(ev) {
        ev.preventDefault();
        const cardId = ev.dataTransfer.getData("id");
        const origListId = ev.dataTransfer.getData("origListId");
        const destListId = this.props.id;
        this.props.moveCard(cardId, origListId, destListId);
    }

    async renameOrCreateList(ev) {
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

    render() {
        return (
            <div className={this.props.className} onDrop={event => this.onDrop(event)}
            onDragOver={(event => this.onDragOver(event))}>
                <Styled.listContent >
                    <Styled.listHeader>
                        <Styled.styledName ref={this.props.focusRef} onBlur={this.renameOrCreateList} onFocus={this.props.onFocusTextAction}>
                            {this.props.text}
                        </Styled.styledName>
                    </Styled.listHeader>
                    { this.props.children }
                    
                </Styled.listContent>
            </div>
        )
    }
}

export default connect(null, { addNewList })(List);