import React, { Component } from 'react';
import Styled from '../../assets/styled-components';

class List extends Component{

    onDragOver(ev) {
        ev.preventDefault();
    }
      
    onDrop(ev) {
        ev.preventDefault();
        const cardId = ev.dataTransfer.getData("id");
        const origListId = ev.dataTransfer.getData("origListId");
        const destListId = this.props.id;
        this.props.moveCard(cardId, origListId, destListId);


        // var data = ev.dataTransfer.getData("text");
        // ev.target.appendChild(document.getElementById(data));
    }

    render() {
        return (
            <div className={this.props.className} onDrop={event => this.onDrop(event)}
            onDragOver={(event => this.onDragOver(event))}>
                <Styled.listContent >
                    <Styled.listHeader>
                        <Styled.listHeaderName>
                            {this.props.text}
                        </Styled.listHeaderName>
                    </Styled.listHeader>
                    
                    { this.props.children }
                </Styled.listContent>
                
            </div>
        )
    }
}

export default List;