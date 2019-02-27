import React, { Component } from 'react';
import Styled from '../../assets/styled-components';
import axios from 'axios';
import cardServices from '../../services/card';

class Card extends Component{

  constructor(props) {
      super(props);
      this.onBlur = this.onBlur.bind(this);

    }
  
    onDrag(ev) {
      ev.dataTransfer.setData("id", this.props.id);
      ev.dataTransfer.setData("origListId", this.props.listId);
    }

    onBlur(ev) {
      const newName = ev.target.value;
      const id = this.props.id;
      cardServices.updateCard(id, {"title": newName});
    }

    render() {
        return (
          <Styled.cardContent className={this.props.className} draggable="true" 
            onDragStart={(event) => this.onDrag(event)}>
              <Styled.styledName onBlur={this.onBlur}>
                {this.props.text}
              </Styled.styledName>
          </Styled.cardContent>
        )
    }
}

export default Card;