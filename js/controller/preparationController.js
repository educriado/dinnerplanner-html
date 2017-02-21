var PreparationController = function (preparationView, model, overallController) {
    "use strict";

    preparationView.goBackButton.click(function () {
        // Go back to select dish screen
        // We're coming from overview screen, so go back 2 times
        overallController.previousStep();
        overallController.previousStep();
    });

};