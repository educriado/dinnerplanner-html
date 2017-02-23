//ExampleView Object constructor
var PreparationView = function (container, model) {
    "use strict";
    
    // Get all the relevant elements of the view (ones that show data
    // and/or ones that responed to interaction)
    this.goBackButton = container.find("#go-back-button");
    this.numberOfGuests = container.find("#people-attending-dinner");
    
    this.update = function () {
        console.log("PreparationView: this.update() function gets executed");
        
        // Empty previous content
        container.find("#preparation-dynamic-content").empty();
        
        // Start with new content
        this.numberOfGuests.text("My Dinner: " + model.getNumberOfGuests() + " people");
        
        var menu = model.getFullMenu();
        
        // Create one row for each dish, with 3 columns for
        // image, name + description, preparation
        for (var i = 0; i < menu.length; i++) {
            var dishRow = $("<div />", {
                "class": "row"
            });
            
            // Dish info
            var image = "images/" + menu[i].image,
                name = menu[i].name,
                description = menu[i].description;
            
            // Fill info
            
            var imgO = $("<img />"),
                imgColumn = $("<div />", {
                "class": "col-md-2"
                });
            imgO.attr("src", image);
            imgColumn.append(imgO);
            
            var nameO = $("<h3>" + name + "</h3>"),
                descriptionO = $("<p>" + description + "</p>"),
                nameColumn = $("<div />", {
                "class": "col-md-4"
                });
            // Don't know why this wasn't working with descriptionO
            // and it works now with descriptionNameO
            var descriptionNameO = $("<p> " + description + "</p>");
            nameColumn.append(nameO, descriptionNameO);
            console.log(nameColumn);
            
            var preparationO = $("<h3>Preparation</h3>"),
                preparationColumn = $("<div />", {
                "class": "col-md-6"
                });
            preparationColumn.append(preparationO, descriptionO);
            
            dishRow.append(imgColumn, nameColumn, preparationColumn);
            container.find("#preparation-dynamic-content").after(dishRow);
        }
        
    };
    
    // Add ourselves as observer of the model
    model.addObserver(this);
    
    // Initial population (for the dinner guests)
    this.update();
    
    /*//console.log(container);
    var menu = model.getFullMenu();
    container = document.getElementById("preparationView");
    
    

    for (key in menu) {

        // Create row
        var dishRow = document.createElement("div");
        dishRow.className = "row";

        // Create column for image
        var imageColumn = document.createElement("div");
        imageColumn.className = "col-md-2";
        var image = "images/" + menu[key].image;
        var imageO = document.createElement("img");
        imageO.setAttribute("src", image);
        imageColumn.appendChild(imageO);

        // Create column for name and description
        var name = menu[key].name;
        var description = menu[key].description;
        var nameColumn = document.createElement("div");
        nameColumn.className = "col-md-4";
        var nameTextNode = document.createTextNode(name);
        var descriptionTextNode = document.createTextNode(description);
        var nameO = document.createElement("h3");
        var descriptionO = document.createElement("p");
        nameO.appendChild(nameTextNode);
        descriptionO.appendChild(descriptionTextNode);
        nameColumn.appendChild(nameO);
        nameColumn.appendChild(descriptionO);

        // Create column for preparation
        var preparationColumn = document.createElement("div");
        preparationColumn.className = "col-md-6";
        var preparationTextNode = document.createTextNode("Preparation");
        var preparationO = document.createElement("h3")
        preparationO.appendChild(preparationTextNode);
        preparationColumn.appendChild(preparationO);
        preparationColumn.appendChild(descriptionO);

        // Put everything together
        dishRow.appendChild(imageColumn);
        dishRow.appendChild(nameColumn);
        dishRow.appendChild(preparationColumn);
        container.appendChild(dishRow);
    }*/
};