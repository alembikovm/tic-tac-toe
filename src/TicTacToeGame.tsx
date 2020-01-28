import React from "react";
import { debounce } from "lodash";

import "./TicTacToeGame.css";

class TicTacToeGame extends React.Component {
  state = {
    cellsX: [],
    cellsY: [],
    cellWidth: 100,
    pageXOffset: 0,
    pageYOffset: 0,
    cellsXQuantity: 0,
    cellsYQuantity: 0
  };

  componentDidMount() {
    const { cellWidth } = this.state;

    window.addEventListener("scroll", debounce(this.handleScroll, 200));

    const cellsXQuantity = window.innerWidth / cellWidth;
    const cellsYQuantity = window.innerHeight / cellWidth;

    this.drawCells(cellsXQuantity, "cellsX");
    this.drawCells(cellsYQuantity, "cellsY");
  }

  drawCells = (cellsQuantity: number, coordinate: string) => {
    let cells = [];

    for (let i = 0; i <= cellsQuantity; i++) {
      cells.push(
        <div
          style={{
            width: this.state.cellWidth,
            height: this.state.cellWidth,
            border: "solid black 1px"
          }}
          key={i}
        ></div>
      );
    }

    this.setState({
      [coordinate]: cells,
      [`${[coordinate]}Quantity`]: cellsQuantity
    });
  };

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  handleScroll = () => {
    if (window.pageXOffset > this.state.pageXOffset) {
      const cellsXQuantity = this.state.cellsXQuantity + 1;

      this.setState({
        pageXOffset: window.pageXOffset,
        cellsXQuantity,
        cellsX: [
          ...this.state.cellsX,
          <div
            key={cellsXQuantity}
            style={{
              width: this.state.cellWidth,
              height: this.state.cellWidth,
              border: "solid black 1px"
            }}
          ></div>
        ]
      });
    } else {
      const cellsYQuantity = this.state.cellsXQuantity + 1;

      this.setState({
        pageYOffset: window.pageYOffset,
        cellsYQuantity,
        cellsY: [
          ...this.state.cellsY,
          <div
            key={cellsYQuantity}
            style={{
              width: this.state.cellWidth,
              height: this.state.cellWidth,
              border: "solid black 1px"
            }}
          ></div>
        ]
      });
    }
  };

  render() {
    return (
      <div className="TicTacToeGame">
        {this.state.cellsY.map((cell: Node, idx: number) => (
          <Y key={idx}>{this.state.cellsX}</Y>
        ))}
      </div>
    );
  }
}

function Y({ children }: any) {
  return <div className="horisontal">{children}</div>;
}

export default TicTacToeGame;
