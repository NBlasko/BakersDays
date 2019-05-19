import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import { voteRef } from '../firebase';

class VotersList extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        voteRef.push({ vote: e.target.id, email: this.props.user.email, score: -1 })
    }

    render() {
        let bakersArray = this.props.counters.slice();
        return (
            <div>
                <h1 className="text-primary"> Lista pekara </h1>
                {bakersArray.map(element =>
                    <div key={element.vote}><code>
                        Pekar br.{element.vote}</code>
                        {" "} ima {element.score}
                        {(element.score === 1) ? " poen " : " poena "}
                        {(element.score > 0)
                            ? <Button
                                className="btn btn-outline-danger btn-sm"
                                onClick={this.handleClick}
                                id={element.vote} >
                                Umanji </Button>
                            : null}
                    </div>)}
            </div>
        );
    }

}
function mapStateToProps(state) {
    const { user } = state;
    return { user };
}

VotersList.propTypes = {
    user: PropTypes.object.isRequired
}

export default connect(mapStateToProps, null)(VotersList);