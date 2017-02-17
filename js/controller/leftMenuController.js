var LeftMenuController = function (view, model) {

	this.getdish = function () {
        var result = [];
		var price = [];
		var name = [];
		var id = [];
		var fullMenu = model.getFullMenu();
	    
		for(i=0;i<fullMenu.length;i++){
			id.push(fullMenu[i].id);
			price.push(dinnerModel.getTotalPrice(fullMenu[i].id));
			name.push(fullMenu[i].name);
		}
		result.push(id);
		result.push(name);
		result.push(price);
		return result;
    };

    this.getTotalMenuPrice = function() {
        var totalPrice1 = model.getTotalMenuPrice();
        return totalPrice1;
    };

    this.removeDishFromMenu = function (id) {
    	model.removeDishFromMenu(id);
    };

    $(document).on('change','#inputNumberOfPeople',function(){
    	var numberOfGuest = this.value;;
    	if(numberOfGuest < 4){
    		alert("Number of guests cannot be less than 4.");
		    $("#inputNumberOfPeople").val(4);
    	}else{
    		model.setNumberOfGuests(numberOfGuest);
    	}
	});
}