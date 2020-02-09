import React, { FunctionComponent } from "react";
import _debounce from "lodash/debounce";
import _isEmpty from "lodash/isEmpty";
import { connect } from "react-redux";

import StartGameModal from "components/StartGameModal";
import { addStep } from "actions/ticTacToeGame";

import "./TicTacToeGame.css";
import WinnerModal from "components/WinnerModal";

const rootCls = "ticTacToeGame";

const cellWidth = 100;

const roundedNumber = (number: number) => Math.round(number);

interface StateTypes {
  pageXOffset: number;
  pageYOffset: number;
}

interface MapStateTypes {
  ticTacToeGame: TicTacTypes;
}

interface TicTacTypes {
  symbols: string[];
  rows: React.ReactNode[];
  selectedPositionX: number;
  selectedPositionY: number;
  isOdd: boolean;
}

interface MapDispatch {
  addStep: any;
}

interface PropsTypes {
  cellWidth: number;
  symbols: string[];
  cellsXQuantity: number;
  cellsYQuantity: number;
  rows: React.ReactNode[];
  selectedPositionX: number;
  selectedPositionY: number;
  isOdd: boolean;
  xWin: boolean;
  oWin: boolean;
}

const mapDispatchToProps: MapDispatch = {
  addStep
};

const mapStateToProps = (state: MapStateTypes) => state.ticTacToeGame;

class TicTacToeGame extends React.Component<any, StateTypes> {
  state: Readonly<StateTypes> = {
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

    if (pageXOffset && window.pageXOffset > pageXOffset) {
      this.setState((prevState: StateTypes) => ({
        pageXOffset: window.pageXOffset
      }));

      this.addStep({ cellsXQuantity: cellsXQuantity + 1, cellsYQuantity });
    } else {
      this.setState((prevState: StateTypes) => ({
        pageYOffset: window.pageYOffset
      }));

      this.addStep({ cellsYQuantity: cellsYQuantity + 1, cellsXQuantity });
    }
  };

  changeSymbol = (isOdd: boolean, currentSymbol: string) => {
    if (currentSymbol === "") {
      this.addStep({ isOdd: !isOdd });

      return isOdd ? "O" : "X";
    }

    return currentSymbol;
  };

  addStep = (coordinates: any) => {
    const { addStep } = this.props;
    addStep(coordinates);
  };

  handleClick = (selectedPositionX: number, selectedPositionY: number) => {
    const { addStep, rows, isOdd, xWin, oWin } = this.props;

    const selectedPosition = rows[selectedPositionY][selectedPositionX];

    const currentSymbol = this.changeSymbol(isOdd, selectedPosition);

    if (currentSymbol === selectedPosition || xWin || oWin) return;

    addStep({
      currentSymbol,
      selectedPositionY,
      selectedPositionX
    });
  };

  render() {
    const { symbols, rows, xWin, oWin } = this.props;

    return (
      <div className={rootCls}>
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
                        {rows && rows[indexY] && rows[indexY][indexX]}
                      </div>
                    );
                  })}
              </Y>
            );
          })}

        <StartGameModal />
        <WinnerModal isModalOpen={xWin || oWin} player={xWin ? "X" : "O"} />
      </div>
    );
  }
}

interface YProps {
  children: React.ReactNode;
}

const Y: React.FunctionComponent<YProps> = ({ children }) => {
  return <div className={`${rootCls}__row`}>{children}</div>;
};

export default connect(mapStateToProps, mapDispatchToProps)(TicTacToeGame);
