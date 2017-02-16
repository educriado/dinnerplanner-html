var OverviewController = function (overviewView, model, overallController) {
    "use strict";

    overviewView.goBackButton.click(function () {
        // Go back to select dish screen
        overallController.previousStep();
    });

    overviewView.printFullRecipeButton.click(function () {
        overallController.nextStep();
    });
};