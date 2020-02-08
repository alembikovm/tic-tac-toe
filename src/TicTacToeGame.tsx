import React from "react";
import _debounce from "lodash/debounce";
import _isEmpty from "lodash/isEmpty";

import { addStep } from "actions/ticTacToeGame";
import { connect } from "react-redux";

import "./TicTacToeGame.css";

const rootCls = "ticTacToeGame";

const cellWidth = 100;

const roundedNumber = (number: number) => Math.round(number);

interface State {
  pageXOffset: number;
  pageYOffset: number;
}

interface MapState {
  symbols?: any[];
  selectedPositionX: number;
  selectedPositionY: number;
  isOdd: boolean;
}

interface Props {
  addStep: any;
  cellWidth: SVGAnimatedNumberList;
  symbols: any[];
}

const mapDispatchToProps = {
  addStep
};

const mapStateToProps = (state: MapState) => state;

class TicTacToeGame extends React.Component<any, any> {
  state: Readonly<State> = {
    pageXOffset: 0,
    pageYOffset: 0
  };

  componentDidMount() {
    window.addEventListener("scroll", _debounce(this.handleScroll, 200));

    const cellsXQuantity = roundedNumber(window.innerWidth / cellWidth) + 1;
    const cellsYQuantity = roundedNumber(window.innerHeight / cellWidth) + 1;

    this.addStep({ cellsXQuantity, cellsYQuantity });
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  handleScroll = () => {
    const { pageXOffset } = this.state;

    const { cellsXQuantity, cellsYQuantity } = this.props;

    if (window.pageXOffset > pageXOffset) {
      this.setState((prevState: any) => ({
        pageXOffset: window.pageXOffset
      }));

      this.addStep({ cellsXQuantity: cellsXQuantity + 1, cellsYQuantity });
    } else {
      this.setState((prevState: any) => ({
        pageYOffset: window.pageYOffset
      }));

      this.addStep({ cellsYQuantity: cellsYQuantity + 1, cellsXQuantity });
    }
  };

  changeSymbol = (isOdd: boolean, currentSymbol: any) => {
    if (currentSymbol === "") {
      this.addStep({ isOdd: !isOdd });

      return isOdd ? "X" : "O";
    }

    return currentSymbol;
  };

  addStep = (coordinates: any) => {
    const { addStep } = this.props;
    addStep(coordinates);
  };

  handleClick = (selectedPositionX: any, selectedPositionY: any) => {
    const { addStep, rows, isOdd } = this.props;

    const selectedPosition = rows[selectedPositionY][selectedPositionX];

    const currentSymbol = this.changeSymbol(isOdd, selectedPosition);

    if (currentSymbol === selectedPosition) return; 

    addStep({
      currentSymbol,
      selectedPositionY,
      selectedPositionX
    });
  };

  render() {
    const { symbols, rows, playerXSteps, playerYSteps } = this.props;

    console.log(playerXSteps);
    console.log(playerYSteps);

    return (
      <div className={`${rootCls}`}>
        {!_isEmpty(rows) &&
          Object.entries(rows).map((cell: any, indexY: number) => {
            return (
              <Y key={`cellsY_${indexY}`}>
                {!_isEmpty(symbols) &&
                  Object.values(symbols).map((symbol: any, indexX: number) => {
                    return (
                      <div
                        key={`cellsX_${indexX}`}
                        onClick={() => this.handleClick(indexX, indexY)}
                        className={`${rootCls}__cell`}
                      >
                        {rows[indexY] && rows[indexY][indexX]}
                      </div>
                    );
                  })}
              </Y>
            );
          })}
      </div>
    );
  }
}

function Y({ children, idx }: any) {
  return <div className={`${rootCls}__row`}>{children}</div>;
}

export default connect(mapStateToProps, mapDispatchToProps)(TicTacToeGame);
