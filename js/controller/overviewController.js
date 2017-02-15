var OverviewController = function (overviewView, model, overallController) {
    "use strict";
    
    overviewView.goBackButton.addEventListener("click", function () {
        overallController.previusStep();
    });
    
    overviewView.printFullRecipeButton.addEventListener("click", function () {
        overallController.nextStep();
    });
};