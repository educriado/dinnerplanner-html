var OverviewController = function (overviewView, model, overallController) {
    "use strict";

    overviewView.goBackButton.click(function () {
        // Go back to select dish screen
        overallController.showSelectDish();
    });

    overviewView.printFullRecipeButton.click(function () {
        overallController.showDinnerPreparation();
    });
};