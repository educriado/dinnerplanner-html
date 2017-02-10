$(function() {
	//We instantiate our model
	var model = new DinnerModel();
	
	//And create the needed controllers and views
	//var homeView = new HomeView($("#homeView"), model);
    var overviewContainer = document.getElementById("overviewView");
    var overviewView = new OverviewView(overviewContainer, model);
    //var preparationView = new PreparationView($("#preparationView"), model);
});