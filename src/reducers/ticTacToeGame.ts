import _isEmpty from "lodash/isEmpty";

import { ADD_STEP } from "constants/ticTacToeGame";
import { checkPlayerSteps } from "utils";

interface PlayerCoordinates {
  x: number,
  y: number
}

interface InitialStateTypes {
  symbols: any,
  rows: any,
  currentSymbol: string,
  cellsXQuantity: number,
  cellsYQuantity: number,
  selectedPositionX: number,
  selectedPositionY: number,
  playerXSteps: PlayerCoordinates[],
  playerOSteps: PlayerCoordinates[],
  isOdd: boolean,
  gameLength: number,
}

interface ActionTypes {
  type: string,
  payload: InitialStateTypes,
}

const initialState: InitialStateTypes = {
  cellsXQuantity: 0,
  cellsYQuantity: 0,
  symbols: {},
  rows: {},
  currentSymbol: "",
  selectedPositionX: 0,
  selectedPositionY: 0,
  playerXSteps: [],
  playerOSteps: [],
  isOdd: false,
  gameLength: 3,
};

function ticTacToeGame (state = initialState, action:ActionTypes) {
  switch (action.type) {
    case ADD_STEP:
      const { payload: { cellsXQuantity, cellsYQuantity, currentSymbol, selectedPositionX, selectedPositionY, isOdd = state.isOdd, gameLength = state.gameLength, } } = action;
      const x: any = { ...state.symbols };
      const y: any = {
        ...state.rows
      };
      let playerXSteps = [...state.playerXSteps];
      let playerOSteps = [...state.playerOSteps];
      let xWin: boolean = false;
      let oWin: boolean = false;


      // Initialise
      if (_isEmpty(state.symbols)) {
        for (let n = 0; n < cellsXQuantity; n++) {
          x[n] = state.currentSymbol;
        }

        for (let n = 0; n < cellsYQuantity; n++) {
          y[n] = { ...x };
        }
      }

      // Scroll
      if (state.cellsXQuantity > 0 && cellsXQuantity > state.cellsXQuantity) {
        x[cellsXQuantity] = currentSymbol;
      }

      if (state.cellsYQuantity > 0 && cellsYQuantity > state.cellsYQuantity) {
        y[cellsYQuantity] = x;
      }

      // Select
      if (selectedPositionY >= 0 && selectedPositionX >= 0) {
        if (currentSymbol !== "") {
          y[selectedPositionY][selectedPositionX] = currentSymbol;

          if (isOdd) {
            playerXSteps = [...state.playerXSteps, { x: selectedPositionX, y: selectedPositionY }]
          } else {
            playerOSteps = [...state.playerOSteps, { x: selectedPositionX, y: selectedPositionY }]
          }
        }
      }

      //Game logic
      if (playerXSteps.length > gameLength) {
        xWin = checkPlayerSteps(playerXSteps, gameLength);
      }

      if (playerOSteps.length > gameLength) {
        oWin = checkPlayerSteps(playerOSteps, gameLength);
      }


      return {
        ...state,
        symbols: x,
        rows: y,
        cellsXQuantity: cellsXQuantity > state.cellsXQuantity ? cellsXQuantity : state.cellsXQuantity,
        cellsYQuantity: cellsYQuantity > state.cellsYQuantity ? cellsYQuantity : state.cellsYQuantity,
        selectedPositionX,
        selectedPositionY,
        playerXSteps,
        playerOSteps,
        isOdd: isOdd,
        xWin,
        oWin,
        gameLength,
      };

    default:
      return state;
  }
}

export default ticTacToeGame ;
