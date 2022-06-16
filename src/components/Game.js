import { Component, createRef } from "react";
import Tile from "./Tile.js"
import { Row, Button } from 'react-bootstrap';

class Game extends Component {
  width = 3;
  height = 3;
  tilesRefs = [];

  constructor(props) {
    super(props);
    this.state = { playerActive: 'X', playfield: [], ended: false, winner: null, round: 1 };

    for (var i = 0; i < this.width*this.height; i++) {
      let newRef = createRef();
      this.tilesRefs.push(newRef);
    } 
  }

  componentDidMount() {
    let field = []
    for (var i = 0; i < this.width * this.height; i++) field.push(String.fromCharCode(65+i));
    this.setState({ playfield: field });
  }

  reset = () => {
    let field = [];
    for (var i = 0; i < this.width * this.height; i++) field.push(String.fromCharCode(65+i));
    this.setState({ playfield: field, playerActive: 'X', ended: false, winner: null, round: 1 });

    for (let tref of this.tilesRefs) tref.current.reset();
  }

  updateGame = (id) => {
    let val = (this.state.playerActive === 'X') ? 'O' : 'X';
    let field = this.state.playfield;
    let round_cnt = this.state.round+1;

    field[id] = this.state.playerActive;
    
    this.setState({ playerActive: val, playfield: field, round: round_cnt });

    let winner = this.checkGame();
    if (winner !== ' ') {
      this.setState({ ended: true, winner: winner });
    }
  }

  checkGame = () => {
    let field = this.state.playfield;

    // check rows
    for (var i = 0; i < this.width*this.height; i+=3) {
      if (field[i] === field[i+1] && field[i] === field[i+2]) {
        return field[i];
      }
    }

    // check cols
    for (i = 0; i < this.width; i++) {
      if (field[i] === field[i+3] && field[i] === field[i+6]) {
        return field[i];
      }
    }

    // check diagonals
    if (field[0] === field[4] && field[0] === field[8]) return field[0];
    if (field[2] === field[4] && field[2] === field[6]) return field[2];
    
    if (this.state.round == this.width*this.height) return 'No winner';

    return ' ';
  }

  render() {
    let tiles = [];

    for (var j = 0; j < this.width; j++) {
      let partTiles = []
      for (var i = 0; i < this.height; i++) {
        partTiles.push(<Tile ref={this.tilesRefs[j*3+i]} id={(j * this.width) + i} playerActive={this.state.playerActive} updateGame={this.updateGame}>i</Tile>)
      }

      tiles.push(<Row> {partTiles} </Row>);
    }

    return (
      <div>
        {tiles}
        <h1>{ (this.state.ended === false) ? "Game in progess" : "Winner is player: " + this.state.winner }</h1>
        { (this.state.ended === true) ? <Button onClick={this.reset}>Reset</Button> : '' }
      </div>
    );
  }
}

export default Game;