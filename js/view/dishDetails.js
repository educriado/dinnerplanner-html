var DishDetails = function(container, model) {
    "use strict";

    model.addObserver(this);

    // Get all the relevant elements of the view (ones that show data
    // and/or ones that responed to interaction)
    this.backButton = container.find($("#backButton"));
    this.confirmButton = container.find("#confirmButtonDetails");



    this.update = function() {
        // this.dishViewDetail = view.find("#listScreen");
        var id = model.getCurrentSelectedDish();
        if (id === 0){
            console.log("DishDetails: trying to update information with " +
            "unexistent dish (id = 0)");
            return;
        }
        var dish = model.getDish(id);
        $("#ingredientTable > tbody").html("");
        for (var key in dish.ingredients) {
            $("#ingredientTable > tbody").append('<tr><td>' +
                dish.ingredients[key].quantity + ' ' +
                dish.ingredients[key].unit + '</td><td>' +
                dish.ingredients[key].name + '</td><td>SEK</td><td>' +
                dish.ingredients[key].price + '</td></tr>');
        }
        var totalPrice = model.getTotalPrice(id);
        var numberOfGuests = model.getNumberOfGuests();
        container.find('#totalPrice').text(totalPrice / numberOfGuests);
        $('#pendingCost').text(totalPrice);
        var src = dish.image;
        container.find('#imgLocation').attr("src", 'images/' + src);
        container.find('#preparation').html("");
        container.find('#preparation').append(dish.description);
    };
}
