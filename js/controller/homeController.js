var HomeController = function (homeView, overallController) {
    "use strict";
    
    homeView.createDinnerButton.click(function () {
        console.log("HomeController: button clicked");
        overallController.showSelectDish();
    });
};