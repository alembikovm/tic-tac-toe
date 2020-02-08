const checkPlayerSteps = (playerSteps, gameLength) => {
  for (let n = gameLength; n > 1; n--) {
    const firstStep = playerSteps[playerSteps.length - gameLength];
    const secondStep = playerSteps[playerSteps.length - gameLength + 1];
    const currentStep = playerSteps[playerSteps.length - n];
    const nextStep = playerSteps[playerSteps.length - n + 1];

    //Horisontal checking
    if (currentStep.y === nextStep.y) {
      // From LEFT to RIGHT checking
      if (
        currentStep.x + 1 === nextStep.x ||
        // From RIGHT to LEFT checking
        currentStep.x - 1 === nextStep.x
      ) {
        console.log(true);
      }
    }

    // Vertical checking
    if (currentStep.x === nextStep.x) {
      // From UP to BOTTOM checking
      if (
        currentStep.y + 1 === nextStep.y ||
        // From BOTTOM to UP checking
        currentStep.y - 1 === nextStep.y
      ) {
        console.log(true);
      }
    }

    /*
     * Diagonal checking
     * We need to:
     *  1) Check first difference
     *  1) Check difference between horisontal cells +/- 1
     *  2) Check difference between vertical cells +/- 1
     */
    // from LEFT to RIGHT and UP to BOTTOM
    if (firstStep.x + 1 === secondStep.x && firstStep.y + 1 === secondStep.y) {
      if (
        currentStep.x + 1 === nextStep.x &&
        currentStep.y + 1 === nextStep.y
      ) {
        console.log(true);
      }
    }

    // from RIGHT to LEFT and BOTTOM to UP
    if (firstStep.x - 1 === secondStep.x && firstStep.y - 1 === secondStep.y) {
      if (
        currentStep.x - 1 === nextStep.x &&
        currentStep.y - 1 === nextStep.y
      ) {
        console.log(true);
      }
    }

    // from LEFT to RIGHT and BOTTOM to UP
    if (firstStep.x + 1 === secondStep.x && firstStep.y - 1 === secondStep.y) {
      if (
        currentStep.x + 1 === nextStep.x &&
        currentStep.y - 1 === nextStep.y
      ) {
        console.log(true);
      }
    }

    // from RIGHT to LEFT and UP to BOTTOM
    if (firstStep.x - 1 === secondStep.x && firstStep.y + 1 === secondStep.y) {
      if (
        currentStep.x - 1 === nextStep.x &&
        currentStep.y + 1 === nextStep.y
      ) {
        console.log(true);
      }
    }
  }
};

export { checkPlayerSteps };
