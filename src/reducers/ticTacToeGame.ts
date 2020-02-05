import _isEmpty from "lodash/isEmpty";
import { ADD_STEP } from "constants/ticTacToeGame";


interface Init {
  symbols: any;
  rows: any,
  currentSymbol: string;
  cellsXQuantity: number,
  cellsYQuantity: number,
}

const initialState: Init = {
  cellsXQuantity: 0,
  cellsYQuantity: 0,
  symbols: {},
  rows: {},
  currentSymbol: "",
};

function ticTacToeGame(state = initialState, action: any) {
  switch (action.type) {
    case ADD_STEP:
      const { payload: { cellsXQuantity, cellsYQuantity } } = action;
      const x: any = { ...state.symbols };
      const y: any = {
        ...state.rows
      };

      if (_isEmpty(state.symbols)) {
        for (let n = 0; n < cellsXQuantity; n++) {
          x[n] = state.currentSymbol;
        }

        for (let n = 0; n < cellsYQuantity; n++) {
          y[n] = state.currentSymbol;
        }
      }

      if (state.cellsXQuantity > 0 && cellsXQuantity > state.cellsXQuantity) {
        x[cellsXQuantity] = state.currentSymbol;
      }

      if (state.cellsYQuantity > 0 && cellsYQuantity > state.cellsYQuantity) {
        y[cellsYQuantity] = state.currentSymbol;
      }

      return {
        ...state,
        symbols: { ...x, },
        rows: { ...y },
        cellsXQuantity: cellsXQuantity > state.cellsXQuantity ? cellsXQuantity : state.cellsXQuantity,
        cellsYQuantity: cellsYQuantity > state.cellsYQuantity ? cellsYQuantity : state.cellsYQuantity,
      };

    default:
      return state;
  }
}

export { ticTacToeGame };
