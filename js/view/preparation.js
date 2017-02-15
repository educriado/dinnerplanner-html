//ExampleView Object constructor
var PreparationView = function (container, model) {

    // Add ourselves as observer of the model
    model.addObserver(this);
    // Get all the relevant elements of the view (ones that show data
    // and/or ones that responed to interaction)

    console.log(container);
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
    }
}