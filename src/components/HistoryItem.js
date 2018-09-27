import React, { Component } from 'react';

class HistoryItem extends Component {

    render() {
        let { vote, email, score } = this.props.historyProps;
        return (
            <div style={{ margin: '10px' }}>
                <span>  </span>
                <code> Pekar br.{vote}</code> ima {score} {(score === 1) ? "poen " : "poena "} <span className="text-muted">- dodao </span>  <em> {email} </em>
            </div>
        );
    }
}

export default HistoryItem;