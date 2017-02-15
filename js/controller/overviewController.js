var OverviewController = function (overviewView, model, overallController) {
    "use strict";
    
    overviewView.goBackButton.click(function () {
        overallController.previusStep();
    });
    
    overviewView.printFullRecipeButton.click(function () {
        overallController.nextStep();
    });
};