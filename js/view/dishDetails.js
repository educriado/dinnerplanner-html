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
        var populateDetails = model.getDishByID(id, function(dish){
         /* hide "waiting" widget ... */
         /* update the view with new dishes */ 
            var price = 1;
            var totalPrice = 0;
            $("#ingredientTable > tbody").html("");
            for (var key in dish.extendedIngredients) {
                $("#ingredientTable > tbody").append('<tr><td>' +
                    dish.extendedIngredients[key].amount + ' ' +
                    dish.extendedIngredients[key].unit + '</td><td>' +
                    dish.extendedIngredients[key].name + '</td><td>SEK</td><td>' +
                    price + '</td></tr>');
                totalPrice += 1 * dish.extendedIngredients[key].amount;
            }
            //var totalPrice = model.getTotalPrice(id);
            var numberOfGuests = model.getNumberOfGuests();
            totalPrice = totalPrice * numberOfGuests;
            container.find('#totalPrice').text(totalPrice / numberOfGuests);
            $('#pendingCost').text(totalPrice);
            /*var src = dish.image;
            container.find('#imgLocation').attr("src", 'images/' + src);
            container.find('#preparation').html("");*/
            container.find('#preparation').html("");
            for(var key in dish.analyzedInstructions){
                for(var key1 in dish.analyzedInstructions[key].steps){
                    container.find('#preparation').append('<li>'+dish.analyzedInstructions[key].steps[key1].step+'</li>');
                }
            }

        });
        /*var dish = model.getDish(id);
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
        container.find('#preparation').append(dish.description);*/
    };
}
