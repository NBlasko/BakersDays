import React, { Component } from 'react';

import AddGoal from './AddGoal';
import HistoryList from './HistoryList';
import VotersList from './VotersList';
import RangList from './RangList';
import { voteRef } from '../firebase';


import { Button, ButtonGroup } from 'reactstrap';
import './App.css';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggle: "1",
      counters: [],
      countersArr: []
    }

    this.setSeen = this.setSeen.bind(this)
  }
  componentWillMount() {
    let counters = [];
    for (var i = 0; i < 149; i++)
      counters.push({
        vote: i + 1,
        score: 0
      });
    this.setState({ counters });
  }
  componentDidMount() {
    voteRef.on("child_added", snapshot => {
      let { vote, email, score } = snapshot.val();
      let serverKey = snapshot.key;
      let goals = { vote, email, score, serverKey };
      this.setState((prevState) => {
        return { countersArr: [...prevState.countersArr, goals] }
      });
      let tempArray = this.state.counters.slice();
      tempArray[vote - 1].score += score;
      this.setState({ counters: tempArray });
      voteRef.on("child_removed", snap => {
        this.setState({ counters: [], countersArr: [] });
      });
    });


  }

  setSeen(e) {
    this.setState({ toggle: e.target.value })

  }
  render() {
    const { toggle } = this.state;
    let NavOption;
    switch (toggle) {
      case "1":
        NavOption = <AddGoal />; break;
      case "2":
        NavOption = <HistoryList countersArr={this.state.countersArr} />; break;
      case "3":
        NavOption = <VotersList counters={this.state.counters} />; break;
      case "4":
        NavOption = <RangList counters={this.state.counters} />; break;
      default:
        return null;
    }

    return (
      <div className="App">
        <ButtonGroup style={{ width: "100%" }}>
          <Button className="smallText" onClick={this.setSeen} value={1} style={{ color: "white", width: "25%" }}>Dodaj </Button>
          <Button className="smallText" onClick={this.setSeen} value={2} style={{ color: "white", width: "25%" }}>Istorija </Button>
          <Button className="smallText" onClick={this.setSeen} value={3} style={{ color: "white", width: "25%" }}>Lista Pekara </Button>
          <Button className="smallText" onClick={this.setSeen} value={4} style={{ color: "white", width: "25%" }}>Rang Lista </Button>
        </ButtonGroup>
        {NavOption}



      </div>
    );
  }
}


export default App;
