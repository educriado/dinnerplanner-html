$(function () {

    // We instantiate our model
    var model = new DinnerModel();

    // Create the needed views
    //var overviewContainer = document.getElementById("overview-screen");
    /*var homeView = new HomeView($("#home-screen"));
    var overviewView = new OverviewView($("#overview-screen"), model);
    var preparationContainer = document.getElementById("preparationView");
    var preparationView = new PreparationView(preparationContainer, model);*/
    var dishView = new DishView($("#dishView"),model);
    var leftMenu = new LeftMenu($("#leftMenu"),model);

    // Create the needed controllers
    /*var overallController = new OverallController(document);
    var homeController = new HomeController(homeView, overallController);
    var overviewController = new OverviewController(overviewView, model, overallController);
    var preparationController = new PreparationController(preparationView, model, overallController);
    overallController.init();*/
    var dishViewController = new DishViewController($("#dishView"), model);
    var leftMenuController = new LeftMenuController($("#leftMenu"), model);
});