import React, { Component } from 'react';
import Styled from '../../assets/styled-components';
import cardServices from '../../services/card';

class Card extends Component{

  constructor(props) {
      super(props);
      this.onBlur = this.onBlur.bind(this);
      this.state = {
        id: this.props.id,
        isNewCard: this.props.isNew,
      }
    }
  
    onDrag(ev) {
      ev.dataTransfer.setData("id", this.props.id);
      ev.dataTransfer.setData("origListId", this.props.listId);
    }

    async onBlur(ev) {
      const newName = ev.target.value;
      const id = this.state.id;
      if(id){
        cardServices.updateCard(id, {"title": newName});
      }
      if(this.state.isNewCard) {
        const card = await cardServices.addNewCard(this.props.listId,  newName);
        this.setState({id: card._id, isNewCard: false});
      }
    }

    render() {
        return (
          <Styled.cardContent className={this.props.className} draggable="true" 
            onDragStart={(event) => this.onDrag(event)}>
              <Styled.styledName onBlur={this.props.onBlur || this.onBlur}>
                {this.props.text}
              </Styled.styledName>
          </Styled.cardContent>
        )
    }
}

export default Card;