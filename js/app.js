$(function () {

    // We instantiate our model
    var model = new DinnerModel();

    // Create the needed views
    //var overviewContainer = document.getElementById("overview-screen");
    var homeView = new HomeView($("#home-screen"));
    var overviewView = new OverviewView($("#overview-screen"), model);
    var preparationView = new PreparationView($("#preparation-screen"), model);

    // Create the needed controllers
    var overallController = new OverallController(document);
    var homeController = new HomeController(homeView, overallController);
    var overviewController = new OverviewController(overviewView, model, overallController);
    var preparationController = new PreparationController(preparationView, model, overallController);
    overallController.init();
});