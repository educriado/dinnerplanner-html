var DishDetailsController = function (view, model, overallController) {
    "use strict";

    view.backButton.click(function () {
        overallController.backButton();
        model.setCurrentSelectedDish("0");
    });

    view.confirmButton.click(function () {
        var id = model.getCurrentSelectedDish();
        var addDish = model.addDishToMenu(id);
        if (addDish === 1) {
            overallController.backButton();
            model.setCurrentSelectedDish("0");
        } else {
            var r = confirm('Dish already exist in the menu.');
            if (r == true) {
                overallController.backButton();
                model.setCurrentSelectedDish("0");
            }
        }

    });
};