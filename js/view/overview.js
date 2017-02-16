//ExampleView Object constructor
var OverviewView = function (container, model) {

    "use strict";
    
    // Get all the relevant elements of the view (ones that show data
    // and/or ones that responed to interaction)
    this.goBackButton = container.find("#go-back-button");
    this.printFullRecipeButton = container.find("#print-full-recipe-button");
    this.numberOfGuests = container.find("#people-attending-dinner");
    console.log(this.numberOfGuests);
    
    // Update function called when notified by the model
    this.update = function () {
        console.log("OverviewView: this.update() function gets executed.");
        
        // Empty previous content
        container.find("#overview-dynamic-content").empty();
        
        // Start with new content
        this.numberOfGuests.text("My Dinner: " + model.getNumberOfGuests() + " people");
        var menu = model.getFullMenu();
        
        // Divide the 12 column grid in Bootstrap in columns depending
        // on the number of dishes
        var colWidth = 12 / (menu.length + 1);
        var menuRow = $("<div />", {
            "class": "row"
        });

        for (var i = 0; i < menu.length; i++) {
            console.log("For loop iteration number:" + i);
            // Dish info
            var image = "images/" + menu[i].image,
                name = menu[i].name,
                dishPrice = model.getTotalPrice(menu[i].id);

            // Fill info
            var imgO = $("<img />"),
                nameO = $("<h5>" + name + "</h5>"),
                dishPriceO = $("<p>" + dishPrice + "SEK</p>");
            imgO.attr("src", image);

            var dishColumn = $("<div />", {
                "class": "col-md-" + colWidth
            });

            dishColumn.append(imgO, nameO, dishPriceO);
            menuRow.append(dishColumn);
        }

        // Total menu price info

        // Append elements to container (parent)
        container.find("#overview-dynamic-content").after(menuRow);
    };
    
    // Add ourselves as observer of the model
    model.addObserver(this);
    
    // Populate the menu overview with the elements from the model
    this.update();


    /*var menu = model.getFullMenu();

    var numOfDishes = menu.length;
    var colWidth = 12 / (numOfDishes + 1);
    //console.log(menu);
    var menu_row = document.createElement("div");
    console.log(menu_row);
    menu_row.className = "row";
    console.log("Constructor is called.");
    for (key in menu) {
        console.log("Inside for loop.");
        var dish_column = document.createElement("div");
        dish_column.className = "col-md-" + colWidth;
        // Content of each dish being displayed: image, name and price
        var image = "images/" + menu[key].image;
        var name = menu[key].name;
        // Calculate price of dish, this should be moved to a model function later on
        var ingredientsLen = menu[key].ingredients.length;
        var dishPrice = model.getTotalPrice(menu[key].id);
        // Fill dish column with the data we have
        var imageO = document.createElement("img");
        imageO.setAttribute("src", image);
        var nameTextNode = document.createTextNode(name);
        var nameO = document.createElement("h5");
        nameO.appendChild(nameTextNode);
        var priceTextNode = document.createTextNode(dishPrice.toString() + " SEK");
        var priceO = document.createElement("p");
        priceO.appendChild(priceTextNode);
        dish_column.appendChild(imageO);
        dish_column.appendChild(nameO);
        dish_column.appendChild(priceO);
        // Append column as child to row div
        menu_row.appendChild(dish_column);
    }
    // Total menu price
    var totalPrice = model.getTotalMenuPrice();
    var totalPriceColumn = document.createElement("div");
    totalPriceColumn.className = "col-md-" + colWidth;
    var totalPriceTextNode = document.createTextNode("Total price ");
    var mybr = document.createElement('br');
    var totalPriceTextNodePrice = document.createTextNode(totalPrice);
    var totalPriceO = document.createElement("p");
    totalPriceO.appendChild(totalPriceTextNode);
    totalPriceO.appendChild(mybr);
    totalPriceO.appendChild(totalPriceTextNodePrice);
    totalPriceColumn.appendChild(totalPriceO);
    menu_row.appendChild(totalPriceColumn);
    container.appendChild(menu_row);*/
};