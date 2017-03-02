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

    var imageWidth = 150;

    // We don't have to hide elements from other views here
    //this.dishViewDetail = container.find("#listScreen");
    //this.dishViewDetail.hide();
    // this.dishView.append('<div id="1" style="margin-left: 128px; margin-top: 125px; margin-right: 50px; float: left;" class="img-with-text"><img src="images/toast.jpg" alt="HTML5 Icon" style="width:128px;height:128px;"><b>French Toast</b></div>');
    // this.dishView.append('<div id="2" style="margin-top: 125px; margin-right: 50px; float: left;" class="img-with-text"><img src="images/sourdough.jpg" alt="HTML5 Icon" style="width:128px;height:128px;"><b>Sourdough Starter</b></div>');
    // this.dishView.append('<div id="3" style="margin-top: 125px; margin-right: 50px; float: left;" class="img-with-text"><img src="images/bakedbrie.jpg" alt="HTML5 Icon" style="width:128px;height:128px;"><b>Baked Brie with Peaches</b></div>');
    // this.dishView.append('<div id="100" style="margin-top: 125px; margin-right: 50px; float: left;" class="img-with-text"><img src="images/meatballs.jpg" alt="HTML5 Icon" style="width:128px;height:128px;"><b>Meat balls</b></div>');


    function callback(results) {
        var baseUri = results.baseUri,
            results = results.results,
            key;
        var row0 = [];
        row0[0] = $("<div />", {
            "class": "row"
        });
        row0[1] = $("<div />", {
            "class": "row"
        });
        row0[2] = $("<div />", {
            "class": "row"
        });
        var dishNum = 0;
        var i = 0;
        for (key in results) {
            var dishId = results[key].id,
                title = results[key].title,
                image = results[key].image;
            var titleO = $("<h5>" + title + "</h5>"),
                dishColumn = $("<div id=" + dishId + " />"),
                imageO = $("<img />");
            dishColumn.attr("class", "col-md-2 dishPic");
            dishColumn.attr("value", title);
            imageO.attr("src", baseUri + image);
            imageO.attr("width", imageWidth);
            imageO.attr("height", imageWidth);
            if (dishNum === 4) {
                dishNum = 0 ;
                console.log("Inside modulus 3 if");
                // Add another row
                var dishViewVar = container.find("#dishViewImage");
                dishViewVar.append(row0[i]);
                i++;
                
            }
            dishColumn.append(imageO, titleO);
            row0[i].append(dishColumn);
            dishNum += 1;
        }
        console.log(this);
        $("#loadDish").hide();
        // We have to get it from the container because using 'this' doesn't work
        /*var dishViewVar = container.find("#dishViewImage");
        dishViewVar.append(rowO);*/
    }

    function errorCallback(results) {
        var errorMsg = $("<h2>There was an error calling the API.</h2>");
        errorMsg.css("color", "red");
        var dishViewVar = container.find("#dishViewImage");
        dishViewVar.append(errorMsg);
        $("#loadDish").hide();
    }

    this.update = function() {
        console.log(this);
        this.dishView.empty();
        $("#loadDish").show();
        model.getAllDishes(this.selectType.val(), this.inputSearch.val(), callback,
            errorCallback);
        model.setCurrentType(this.selectType.val());
    };


    this.displayDishes = function(dishes) {
        // Empty the div containing the dishes
        this.dishView.empty();
        var key;
        for (key in dishes) {
            this.dishView.append('<div class="dishClass" id="' + dishes[key].id +
                '" style="margin-left: 128px; margin-top: 125px; margin-right: 50px; float: left;" class="img-with-text"><img src="images/' + dishes[key].image + '" alt="HTML5 Icon" style="width:128px;height:128px;"><b>' + dishes[key].name + '</b></div>');
        }

    };

    this.update();
};
