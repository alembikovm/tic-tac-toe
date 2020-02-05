import { ADD_STEP } from "constants/ticTacToeGame";

function addStep(payload: any) {
  return { type: ADD_STEP, payload };
}

export { addStep };
