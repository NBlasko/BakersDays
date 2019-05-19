import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import { voteRef, firebaseApp, parentVoteRef } from '../firebase';
import { deleteAll } from '../actions';

class VotersList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false
        }
        this.handleClick = this.handleClick.bind(this);
        this.signOut = this.signOut.bind(this);
        this.deleteDB = this.deleteDB.bind(this);
        this.deleteDBFinaly = this.deleteDBFinaly.bind(this);
    }

    handleClick(e) {
        voteRef.push({ vote: e.target.id, email: this.props.user.email, score: -1 })
    }

    signOut() {
        this.props.deleteAll();
        voteRef.off();
        firebaseApp.auth().signOut();
    }

    deleteDB() {
        this.setState((preState) => { return { show: !preState.show } })
    }

    deleteDBFinaly() {
   //     voteRef.remove();
        parentVoteRef.remove();
    }

    render() {
        let bakersArray = this.props.counters.slice();
        let sorted = bakersArray.sort(function (a, b) {
            return b.score - a.score;
        });
        let visible = sorted.filter(el => el.score !== 0);
        var sum = 0;
        for (var i in bakersArray)
            sum += bakersArray[i].score;
        return (
            <div className="my-1">
                <Button color="danger" onClick={this.signOut}>
                    Sign Out </Button>
                {" "}

                <Button color="info" onClick={this.deleteDB}>
                    {(this.state.show === false)
                        ? "Obrisi sve podatke. Oprezno! "
                        : "Sakrij! "} </Button>

                <div>
                    {(this.state.show === true)
                        ? <Button
                            className="text-light bg-dark my-3"
                            onClick={this.deleteDBFinaly}>
                            Klik i nema povratka! </Button>
                        : null}
                </div>
                <h1 className="text-primary"> Rang Lista </h1>
                Suma svih glasova je : {sum}

                {visible.map(element => <div key={element.vote}>
                    <code> Pekar br.{element.vote}</code>
                    {" "} ima {element.score}
                    {(element.score === 1) ? " poen " : " poena "}
                    <Button
                        className="btn btn-outline-danger btn-sm"
                        onClick={this.handleClick} id={element.vote} >
                        Umanji</Button>
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

export default connect(mapStateToProps, { deleteAll })(VotersList);