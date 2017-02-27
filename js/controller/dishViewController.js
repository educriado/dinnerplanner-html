var DishViewController = function(view, model, overallController) {
    // Add click event to initially shown dishes
    function addClickEventToElems() {
        var array = [],
            key;
        $('div', view.dishView).each(function() {
            array.push($(this).attr('id'));
        });
        for (key in array) {
            var dish = view.dishView.find("#" + array[key]);
            dish.click(function() {
                model.setCurrentSelectedDish(this.id);
                overallController.showDishDetails(this.id);
            });
        }
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
