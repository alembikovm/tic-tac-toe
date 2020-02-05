import React from "react";
import { debounce } from "lodash";

import { addStep } from "actions/ticTacToeGame";
import { connect } from "react-redux";

import "./TicTacToeGame.css";

const rootCls = "ticTacToeGame";

const cellWidth = 100;

interface State {
  pageXOffset: number;
  pageYOffset: number;
}

interface MapState {
  symbols?: any[];
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
    pageYOffset: 0,
  };

  componentDidMount() {
    const { addStep } = this.props;

    window.addEventListener("scroll", debounce(this.handleScroll, 200));

    const cellsXQuantity = window.innerWidth / cellWidth;
    const cellsYQuantity = window.innerHeight / cellWidth;

    addStep({ cellsXQuantity, cellsYQuantity });
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  handleScroll = () => {
    const {
      pageXOffset
    } = this.state;

    const { cellsXQuantity, cellsYQuantity, addStep } = this.props;

    if (window.pageXOffset > pageXOffset) {
      this.setState((prevState: any) => ({
        pageXOffset: window.pageXOffset
      }));

      addStep({ cellsXQuantity: cellsXQuantity + 1 });
    } else {
      this.setState((prevState: any) => ({
        pageYOffset: window.pageYOffset,
      }));

      addStep({ cellsYQuantity: cellsYQuantity + 1 });
    }
  };

  render() {
    const { symbols, addStep, rows } = this.props;

    return (
      <div className={`${rootCls}`}>
        {Object.entries(rows).map((cell: React.ReactNode, indexY: number) => (
          <Y key={`cellsY_${indexY}`}>
            {Object.values(symbols).map((symbol: any, idndexX: number) => {
              return (
                <div
                  key={`cellsX_${idndexX}`}
                  onClick={addStep}
                  className={`${rootCls}__cell`}
                >
                  {symbol}
                </div>
              );
            })}
          </Y>
        ))}
      </div>
    );
  }
}

function Y({ children, idx }: any) {
  return (
    <div className={`${rootCls}__row`} onClick={() => console.log(idx)}>
      {children}
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(TicTacToeGame);
