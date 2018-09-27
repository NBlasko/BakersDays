import React, { Component } from 'react';
import HistoryItem from './HistoryItem';

class HistoryList extends Component {

    render() {
        let inversedArray = this.props.countersArr.slice().reverse();
        return (
            <div> <h1 className="text-primary"> Istorija </h1>
                {
                    inversedArray.map(element => { return (<HistoryItem key={element.serverKey} historyProps={element} />) })
                }
            </div>
        );
    }
}


export default HistoryList;