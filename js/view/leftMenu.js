//ExampleView Object constructor
var LeftMenu = function (container,model) {
	// Get all the relevant elements of the view (ones that show data
    // and/or ones that responed to interaction)
    
  	model.addObserver(this);
  	this.update = function() {
  	  var leftMenuController = new LeftMenuController($("#leftMenu"), model);
      // Update the view to show the new number of guests
      $("#costTable > tbody").html("");
	  $('#costTable tbody').append('<tr><th>'+'Pending'+'</th><th id="pendingCost">'+'0.00'+'</th></tr>');
	  var dish = leftMenuController.getdish();
	  var id = dish[0];
	  var name = dish[1];
	  var price = dish[2];
	  for(i=0;i<id.length;i++){
          $('#costTable > tbody > tr:first').before('<tr class="costTable" id="'+id[i]+'" ><td>'+name[i]+'</td><td>'+price[i]+'</td></tr>');
	  }
	  $('#costTablePrice').text('SEK '+leftMenuController.getTotalMenuPrice());
	  this.dishList = container.find(".costTable");
	  this.dishList.click(function(){
  		var id = this.id;
    	var r = confirm("Do you want to remove this dish?");
    	if (r == true) {
    		leftMenuController.removeDishFromMenu(id);
    	}
  	});
    }
}