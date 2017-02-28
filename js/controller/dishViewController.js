var DishViewController = function(view, model, overallController) {
    // Add click event to initially shown dishes
    function addClickEventToElems() {
        view.dishView.on("click", ".dishPic", function() {
            model.setCurrentSelectedDish(this.id);
            overallController.showDishDetails(this.id);
        });
    }

    view.searchButton.click(function() {
        view.update();
        addClickEventToElems();
    });

    view.selectType.change(function() {
        view.update();
        addClickEventToElems();
    });

    addClickEventToElems();
};
