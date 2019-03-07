import React, { Component } from 'react';
import Styled from '../../assets/styled-components';
import cardServices from '../../services/card';

class Card extends Component{

  constructor(props) {
      super(props);
      this.state = {
        id: props.id,
        cardTitle: props.text
      }
    }
  
    onDrag = (ev) => {
      ev.dataTransfer.setData("id", this.props.id);
      ev.dataTransfer.setData("origListId", this.props.listId);
    }

    onBlur = async (ev) => {
      const newName = ev.target.value;
      const id = this.state.id;
      if (id) {
        if(newName) {
          cardServices.updateCard(id, {"title": newName});
        } else {
          this.props.deleteCard(id, this.props.listId);
        }
      }
    }

    updateTitle = (ev) => {
      this.setState({cardTitle: ev.target.value});
  }

    render() {
        return (
          <Styled.cardContent className={this.props.className} draggable="true" 
            onDragStart={(event) => this.onDrag(event)}>
              <Styled.styledName onBlur={this.props.onBlur || this.onBlur} autoFocus={this.props.isNew}
                value={this.state.cardTitle} onChange={this.updateTitle}>
              </Styled.styledName>
          </Styled.cardContent>
        )
    }
}

export default Card;