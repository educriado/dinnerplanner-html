$.getScript("dinnerModel.js");

//ExampleView Object constructor
var ExampleView = function (container) {
	
	// Get all the relevant elements of the view (ones that show data
  	// and/or ones that responed to interaction)
	this.numberOfGuests = container.find("#numberOfGuests");
	this.plusButton = container.find("#plusGuest");
	this.minusButton = container.find("#minusGuest");
	
	this.numberOfGuests.html("Hello World");
	
}

var dish;
var totalPrice = 0;
var dinnerModel = new DinnerModel();

/*$("#meatballs").click(function(){
	test2 = blueBox.getNumberOfGuests();
    alert(test2);
});*/

var list = function (id){
	$("#Screen1_1").css("display", "none");
	$("#Screen1_2").css("display", "none");
	$("#Screen2").css("display", "");
	$("#labelNumberOfPeople").css("margin-top", "-17px");
	$("#inputNumberOfPeople").css("margin-top", "-17px");
	$("#ingredientTable > tbody").html("");
    dish = dinnerModel.getDish(id);
    for(key in dish.ingredients){
    	$('#ingredientTable tbody').append('<tr><td>'+dish.ingredients[key].quantity+' '+dish.ingredients[key].unit+'</td><td>'+dish.ingredients[key].name+'</td><td>SEK</td><td>'+dish.ingredients[key].price+'</td></tr>');
    	totalPrice = totalPrice + dish.ingredients[key].price;
    } 
    $('#totalPrice').text(totalPrice);
    $('#pendingCost').text(totalPrice);
}

$("#backButton").click(function(){
	$("#Screen1_1").css("display", "");
	$("#Screen1_2").css("display", "");
	$("#Screen2").css("display", "none");
	$("#labelNumberOfPeople").css("margin-top", "-70px");
	$("#inputNumberOfPeople").css("margin-top", "-70px");
	$('#pendingCost').text('0.00');
});

$("#confirmButton").click(function(){
	var addDish = dinnerModel.addDishToMenu(dish.id);
	if(addDish === 1){
		$("#Screen1_1").css("display", "");
		$("#Screen1_2").css("display", "");
		$("#Screen2").css("display", "none");
		$("#labelNumberOfPeople").css("margin-top", "-70px");
		$("#inputNumberOfPeople").css("margin-top", "-70px");
		$('#pendingCost').text('0.00');
		var fullMenu = dinnerModel.getFullMenu();
	    var totalPrice1 = dinnerModel.getTotalMenuPrice();
		for(key in fullMenu){
			$('#costTable > tbody > tr:first').before('<tr><td>'+fullMenu[key].name+'</td><td>'+'0.00'+'</td></tr>');
		}
	    $('#costTablePrice').text('SEK '+totalPrice1);
	}else{
		var r = confirm('Dish already exist in the menu.');
		if(r == true){
			$("#Screen1_1").css("display", "");
			$("#Screen1_2").css("display", "");
			$("#Screen2").css("display", "none");
			$("#labelNumberOfPeople").css("margin-top", "-70px");
			$("#inputNumberOfPeople").css("margin-top", "-70px");
			$('#pendingCost').text('0.00');
		}
	}
    
});


 
