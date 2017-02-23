var DishViewController = function(view, model, overallController) {

    this.dishViewImage = view.dishView;
    this.dishViewSelect = view.dishViewSelect;
    this.dishViewDetail = view.dishViewDetail;
    this.ingredientDiv = this.dishViewDetail.find("#ingredientDiv");
    this.ingredientTableDiv = this.dishViewDetail.find("#ingredientTableDiv");
    this.ingredientTable = this.ingredientTableDiv.find("#ingredientTable")
    this.tbody = this.ingredientTable.find("tbody")
    var array = [];
    $('div', this.dishViewImage).each(function() {
        array.push($(this).attr('id'));
    });
    for (key in array) {
        this.dish = this.dishViewImage.find("#" + array[key]);
        this.dish.click(function() {
            model.setCurrentSelectedDish(this.id);
            overallController.showDishDetails(this.id);
        });
    }

    view.searchButton.click(function() {
        var searchResult = model.getAllDishes(view.selectType.val(),
            view.inputSearch.val());
        view.displayDishes(searchResult);
    });

    view.selectType.change(function() {
        var searchResult = model.getAllDishes(view.selectType.val());
        view.displayDishes(searchResult);
    });

    /*function getDishDetail(id) {
        overallController.showDishDetails(id);
        model.setCurrentSelectedDish(id);
        /*this.dishViewDetail = view.find("#listScreen");
        var dish = model.getDish(id);
        $("#"+this.ingredientTable.id+" > tbody").html("");
        for(key in dish.ingredients){
           $("#"+this.ingredientTable.id+" > tbody").append('<tr><td>'+dish.ingredients[key].quantity+' '+dish.ingredients[key].unit+'</td><td>'+dish.ingredients[key].name+'</td><td>SEK</td><td>'+dish.ingredients[key].price+'</td></tr>');
        } 
        var totalPrice = model.getTotalPrice(id);
        var numberOfGuests = model.getNumberOfGuests();
        $(this.dishViewDetail.find('#totalPrice')).text(totalPrice/numberOfGuests);
        $('#pendingCost').text(totalPrice);
        var src = dish.image;
        $(this.dishViewDetail.find('#imgLocation')).attr("src", 'images/'+src);
        $(this.dishViewDetail.find('#preparation')).html("");
        $(this.dishViewDetail.find('#preparation')).append(dish.description);
        $(".btn-outline-primary").prop("id", id);
        
    }*/

    /* this.backButton = this.dishViewDetail.find("#backButton");
    this.backButton.click(function(){
        this.dishViewImage = view.find("#dishViewImage");
        this.dishViewSelect = view.find("#dishViewSelect");
        this.dishViewDetail = view.find("#listScreen");
        $(this.dishViewImage).show();
        $(this.dishViewSelect).show();
        $(this.dishViewDetail).hide();
    });
    
    this.confirmButton = this.dishViewDetail.find(".btn-outline-primary");
    this.confirmButton.click(function(){
        var addDish = model.addDishToMenu(this.id);
            if(addDish === 1){
                this.dishViewImage = view.find("#dishViewImage");
                this.dishViewSelect = view.find("#dishViewSelect");
                this.dishViewDetail = view.find("#listScreen");
                $(this.dishViewImage).show();
                $(this.dishViewSelect).show();
                $(this.dishViewDetail).hide();
            }else{
                var r = confirm('Dish already exist in the menu.');
                if(r == true){
                    this.dishViewImage = view.find("#dishViewImage");
                    this.dishViewSelect = view.find("#dishViewSelect");
                    this.dishViewDetail = view.find("#listScreen");
                    $(this.dishViewImage).show();
                    $(this.dishViewSelect).show();
                    $(this.dishViewDetail).hide();
                }
            }
    });
*/

}
