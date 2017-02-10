$(function() {
	//We instantiate our model
	var model = new DinnerModel();
	//And create the needed controllers and views
	//var homeView = new HomeView($("#homeView"), model);
    var overviewContainer = document.getElementById("overviewView");
    var overviewView = new OverviewView(overviewContainer, model);
    var preparationContainer = document.getElementById("preparationView");
    var preparationView = new PreparationView(preparationContainer, model);
});