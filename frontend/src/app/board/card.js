import React, { Component } from 'react';
import Styled from '../../assets/styled-components';

class Card extends Component{
  
    onDrag(ev) {
      // event.preventDefault();
      ev.dataTransfer.setData("id", this.props.id);
      ev.dataTransfer.setData("origListId", this.props.listId);
    }

    render() {
        return (
            <Styled.cardContent className={this.props.className} draggable="true" onDragStart={(event) => this.onDrag(event)}>
                <Styled.listHeaderName>
                  {this.props.text}
                </Styled.listHeaderName>
            </Styled.cardContent>
        )
    }
}

export default Card;