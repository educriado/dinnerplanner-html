//ExampleView Object constructor
var OverviewView = function (container, model) {
    
    // Get all the relevant elements of the view (ones that show data
    // and/or ones that responed to interaction)
    console.log(container);
    this.dishesOverview = container;
    // Populate the menu overview with the elements from the model
    
    var menu = model.getFullMenu();

    var numOfDishes = menu.length;
    var colWidth = 12 / numOfDishes;
    //console.log(menu);
    var menu_row = document.createElement("div");
    console.log(menu_row);
    menu_row.className = "row";
    console.log("Constructor is called.");
    for(key in menu) {
        console.log("Inside for loop.");
        var dish_column = document.createElement("div");
        dish_column.className = "col-md-" + colWidth;
        // Content of each dish being displayed: image, name and price
        var image = "images/" + menu[key].image;
        var name = menu[key].name;
        // Calculate price of dish, this should be moved to a model function later on
        var ingredientsLen = menu[key].ingredients.length;
        var dishPrice = 0.0;
        for (var i = 0; i < ingredientsLen; i++) {
            dishPrice += menu[key].ingredients[i].price;
        }
        // Fill dish column with the data we have
        var imageO = document.createElement("img");
        imageO.setAttribute("src", image);
        var nameTextNode = document.createTextNode(name);
        var nameO = document.createElement("p");
        nameO.appendChild(nameTextNode);
        var priceTextNode = document.createTextNode(dishPrice.toString());
        var priceO = document.createElement("p");
        priceO.appendChild(priceTextNode);
        dish_column.appendChild(imageO);
        dish_column.appendChild(nameO);
        dish_column.appendChild(priceO);
        // Append column as child to row div
        menu_row.appendChild(dish_column);
    }
    container.appendChild(menu_row);
}
 
