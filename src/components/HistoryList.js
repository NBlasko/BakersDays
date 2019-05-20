import React, { Component } from 'react';
import HistoryItem from './HistoryItem';

class HistoryList extends Component {

    render() {
        let inversedArray =
            this.props.countersArr
                .slice()
                .reverse()
                .map(element =>
                    <HistoryItem
                        key={element.serverKey}
                        historyProps={element}
                    />);
        return (
            <div> <h1 className="text-primary"> Istorija </h1>
                {inversedArray}
            </div>
        );
    }
}

export default HistoryList;