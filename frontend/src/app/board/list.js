import React, { Component } from 'react';
import Styled from '../../assets/styled-components';
import axios from 'axios';
import listServices from '../../services/list';

class List extends Component{

    constructor(props) {
        super(props);

        this.onBlur = this.onBlur.bind(this);
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

    onBlur(ev) {
        const newName = ev.target.value;
        const id = this.props.id;
        listServices.updateList(id, {"title": newName});
      }

    render() {
        return (
            <div className={this.props.className} onDrop={event => this.onDrop(event)}
            onDragOver={(event => this.onDragOver(event))}>
                <Styled.listContent >
                    <Styled.listHeader>
                        <Styled.styledName onBlur={this.onBlur}>
                            {this.props.text}
                        </Styled.styledName>
                    </Styled.listHeader>
                    { this.props.children }
                </Styled.listContent>
            </div>
        )
    }
}

export default List;