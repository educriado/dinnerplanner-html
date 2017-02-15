var HomeController = function (homeView, overallController) {
    "use strict";
    
    homeView.createDinnerButton.click(function () {
        overallController.nextStep();
    });
};