//ExampleView Object constructor
var DishView = function(container, model) {
    "use strict";
    // Get all the relevant elements of the view (ones that show data
    // and/or ones that responed to interaction)
    model.addObserver(this);
    this.dishView = container.find("#dishViewImage");
    this.searchButton = container.find("#selectDishButton");
    this.inputSearch = container.find("#inputSearch");
    this.selectType = container.find("#typeSelect");
    this.dishViewSelect = container.find("#dishViewSelect");
    this.dishViewDetail = container.find("#listScreen");
    this.dishViewDetail.hide();
    this.dishView.append('<div id="1" style="margin-left: 128px; margin-top: 125px; margin-right: 50px; float: left;" class="img-with-text"><img src="images/toast.jpg" alt="HTML5 Icon" style="width:128px;height:128px;"><b>French Toast</b></div>');
    this.dishView.append('<div id="2" style="margin-top: 125px; margin-right: 50px; float: left;" class="img-with-text"><img src="images/sourdough.jpg" alt="HTML5 Icon" style="width:128px;height:128px;"><b>Sourdough Starter</b></div>');
    this.dishView.append('<div id="3" style="margin-top: 125px; margin-right: 50px; float: left;" class="img-with-text"><img src="images/bakedbrie.jpg" alt="HTML5 Icon" style="width:128px;height:128px;"><b>Baked Brie with Peaches</b></div>');
    this.dishView.append('<div id="100" style="margin-top: 125px; margin-right: 50px; float: left;" class="img-with-text"><img src="images/meatballs.jpg" alt="HTML5 Icon" style="width:128px;height:128px;"><b>Meat balls</b></div>');

    this.update = function() {
        // Update the view to show the new number of guests
    };

    this.displayDishes = function(dishes) {
        // Empty the div containing the dishes
        this.dishView.empty();
        var key;
        for(key in dishes) {
            this.dishView.append('<div id="' + dishes[key].id + 
                '" style="margin-left: 128px; margin-top: 125px; margin-right: 50px; float: left;" class="img-with-text"><img src="images/'+dishes[key].image +'" alt="HTML5 Icon" style="width:128px;height:128px;"><b>'+dishes[key].name+'</b></div>');
        }

    };
};
