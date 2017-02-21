$(function () {

    // We instantiate our model
    var model = new DinnerModel();

    // Create the needed views
    var homeView = new HomeView($("#home-screen"));
    var overviewView = new OverviewView($("#overview-screen"), model);
    // TODO Change preparationView to JQuery
    var dishView = new DishView($("#dishView"),model);
    var leftMenu = new LeftMenu($("#leftMenu"),model);
    var preparationView = new PreparationView($("#preparation-screen"), model);

    // Create the needed controllers
    var overallController = new OverallController(document);
    var homeController = new HomeController(homeView, overallController);
    var overviewController = new OverviewController(overviewView, model, overallController);
    var preparationController = new PreparationController(preparationView, model, overallController);
    var dishViewController = new DishViewController($("#dishView"), model);
    var leftMenuController = new LeftMenuController($("#leftMenu"), model, overallController);
    overallController.init();
    
});