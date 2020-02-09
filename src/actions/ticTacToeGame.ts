import { ADD_STEP } from "constants/ticTacToeGame";

interface Payload {
    symbols?: any;
    rows?: any,
    currentSymbol?: string;
    cellsXQuantity?: number,
    cellsYQuantity?: number,
    selectedPositionX?: number,
    selectedPositionY?: number,
    playerXSteps?: PlayerCoordinates[],
    playerOSteps?: PlayerCoordinates[],
    isOdd?: boolean,
    gameLength?: number
}

interface PlayerCoordinates {
  x: number,
  y: number
}

function addStep(payload: Payload) {
  return { type: ADD_STEP, payload };
}

export { addStep };
