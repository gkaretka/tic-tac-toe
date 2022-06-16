import { Component } from "react";
import Button from 'react-bootstrap/Button';
import "../App.css"

class Tile extends Component {
  constructor(props) {
    super(props);
    this.state = { ticked: false, owner: null };
  }

  render() {
    return (
      <Button className="tick-tack-toes" onClick={this.tick}>{(this.state.ticked === true) ? this.state.owner : <>&nbsp;</>}</Button>
    );
  }

  reset = () => {
    this.setState({ ticked: false, owner: null });
  }

  tick = () => {
    if (this.state.owner !== null) return;
    this.setState({ ticked: true, owner: this.props.playerActive });
    this.props.updateGame(this.props.id);
  }
}

export default Tile;