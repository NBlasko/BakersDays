import React, { Component } from 'react';
import { voteRef } from '../firebase';
import { connect } from 'react-redux';
import { Button} from 'reactstrap';
import PropTypes from 'prop-types';

class AddGoal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            counters: [],
            valueCount: ""   
        }

        this.addCount = this.addCount.bind(this);
        this.pushToCounter = this.pushToCounter.bind(this);
        this.deleteDigit = this.deleteDigit.bind(this);
    }

    componentWillMount() {
        let counters = [];
        for (var i = 0; i < 149; i++)
            counters.push({
                name: i + 1,
                score: 0
            });
        this.setState({ counters });
    }




    addCount(e) {
        if (this.state.valueCount.length === 0 && e.target.value === "0") {
            return;
        }

        const newValueCount = this.state.valueCount + e.target.value;
        this.setState({ valueCount: newValueCount })

    }
    pushToCounter() {

        if (this.state.valueCount < 150 && this.state.valueCount !== "") {
            const { user } = this.props;
            voteRef.push({ vote: this.state.valueCount, email: user.email, score: 1 });
            this.setState({ valueCount: "" })
        }
    }
    deleteDigit() {
        if (this.state.valueCount.length !== 0)
            this.setState((preState) => ({
                valueCount: preState.valueCount.slice(0, -1)
            }));


    }
    render()
    {
    let ButtonArray = Array(10).fill().map((e,i)=> <Button key ={i} className="btn btn-outline-primary btn-lg" onClick={this.addCount} value={i}> {i} </Button>)
        return (
            <div>
                <div className="text-light bg-dark"> Broj: {this.state.valueCount} </div>
                {ButtonArray}
                <Button className="btnInline btn-lg" color="warning" onClick={this.deleteDigit} > Obrisi </Button>
                <Button className="btnInline btn-lg" color="success" onClick={this.pushToCounter}> Unesi </Button>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { user } = state;
    return { user };
}

AddGoal.propTypes = {
    user: PropTypes.object.isRequired
}

export default connect(mapStateToProps, null)(AddGoal);
