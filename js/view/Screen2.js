$.getScript("dinnerModel.js");

var dish;
var totalPrice = 0;
var dinnerModel = new DinnerModel();

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
    	//totalPrice = totalPrice + dish.ingredients[key].price;
    } 
    totalPrice = dinnerModel.getTotalPrice(id);
    var numberOfGuests = dinnerModel.getNumberOfGuests();
    $('#totalPrice').text(totalPrice/numberOfGuests);
    $('#pendingCost').text(totalPrice);
    $("#preparation").html("");
    $("#preparation").append(dish.description);
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
		$("#costTable > tbody").html("");
		$('#costTable tbody').append('<tr><th>'+'Pending'+'</th><th id="pendingCost">'+'0.00'+'</th></tr>');
		
		var fullMenu = dinnerModel.getFullMenu();
	    var totalPrice1 = dinnerModel.getTotalMenuPrice();
		for(i=0;i<fullMenu.length;i++){
			var price = dinnerModel.getTotalPrice(fullMenu[i].id);
			var name = fullMenu[i].name;
			$('#costTable > tbody > tr:first').before('<tr onclick="deleteFromMenu('+fullMenu[i].id+')" ><td>'+name+'</td><td>'+price+'</td></tr>');
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

$(document).on('change','#inputNumberOfPeople',function(){
	var numberOfGuest = this.value;;
	if(numberOfGuest < 4){
		alert("Number of guests cannot be less than 4.");
		$("#inputNumberOfPeople").val(4);
	}else{
		dinnerModel.setNumberOfGuests(numberOfGuest);
		$("#costTable > tbody").html("");
		$('#costTable tbody').append('<tr><th>'+'Pending'+'</th><th id="pendingCost">'+'0.00'+'</th></tr>');
		
		var fullMenu = dinnerModel.getFullMenu();
	    var totalPrice1 = dinnerModel.getTotalMenuPrice();
		for(i=0;i<fullMenu.length;i++){
			var price = dinnerModel.getTotalPrice(fullMenu[i].id);
			var name = fullMenu[i].name;
			$('#costTable > tbody > tr:first').before('<tr onclick="deleteFromMenu('+fullMenu[i].id+')" ><td>'+name+'</td><td>'+price+'</td></tr>');
		}
	    $('#costTablePrice').text('SEK '+totalPrice1);
	}
	
});

var deleteFromMenu = function (id){
	var r = confirm("Do you want to remove this dish?");
	if (r == true) {
	    dinnerModel.removeDishFromMenu(id);
	    $("#costTable > tbody").html("");
		$('#costTable tbody').append('<tr><th>'+'Pending'+'</th><th id="pendingCost">'+'0.00'+'</th></tr>');
		
		var fullMenu = dinnerModel.getFullMenu();
	    var totalPrice1 = dinnerModel.getTotalMenuPrice();
		for(i=0;i<fullMenu.length;i++){
			var price = dinnerModel.getTotalPrice(fullMenu[i].id);
			var name = fullMenu[i].name;
			$('#costTable > tbody > tr:first').before('<tr onclick="deleteFromMenu('+fullMenu[i].id+')" ><td>'+name+'</td><td>'+price+'</td></tr>');
		}
	    $('#costTablePrice').text('SEK '+totalPrice1);
	}
	
}

$("#costTable > tbody > tr").hover(function(){
    $(this).css("background-color", "pink");
    }, function(){
    $(this).css("background-color", "white");
});


 
