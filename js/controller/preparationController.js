var PreparationController = function (preparationView, model, overallController) {
    "use strict";

    preparationView.goBackButton.click(function () {
        overallController.showSelectDish();
    });

};