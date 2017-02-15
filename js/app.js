$(function () {

    // We instantiate our model
    var model = new DinnerModel();

    // Create the needed views
    //var overviewContainer = document.getElementById("overview-screen");
    var overviewView = new OverviewView($("#overview-screen"), model);
    var preparationContainer = document.getElementById("preparationView");
    var preparationView = new PreparationView(preparationContainer, model);

    // Create the needed controllers
    var overviewController = new OverviewController(overviewView, model);
    var preparationController = new PreparationController(preparationView, model);
    var overallController = new OverallController(document);
    overallController.init();
});