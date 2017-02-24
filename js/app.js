$(function () {

    // We instantiate our model
    var model = new DinnerModel();

    // Create the needed views
    var homeView = new HomeView($("#home-screen"), model);
    var overviewView = new OverviewView($("#overview-screen"), model);
    // TODO Change preparationView to JQuery
    var dishView = new DishView($("#dishView"),model);
    var leftMenu = new LeftMenu($("#leftMenu"),model);
    var preparationView = new PreparationView($("#preparation-screen"), model);
    var dishDetails = new DishDetails($("#listScreen"), model);

    // Create the needed controllers
    
    var overallController = new OverallController();
    var homeController = new HomeController(homeView, overallController);
    var overviewController = new OverviewController(overviewView, model, overallController);
    var preparationController = new PreparationController(preparationView, model, overallController);
    var dishViewController = new DishViewController(dishView, model, overallController);
    var leftMenuController = new LeftMenuController(leftMenu, model, overallController);
    var dishDetailsController = new DishDetailsController(dishDetails, model, overallController);
    overallController.init();
    
});