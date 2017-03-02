//ExampleView Object constructor
var LeftMenu = function(container, model) {
    "use strict";
    // Get all the relevant elements of the view (ones that show data
    // and/or ones that responed to interaction)

    model.addObserver(this);
    this.confirmDinnerButton = container.find("#confirmDinner");
    this.inputNumberOfPeople = container.find("#inputNumberOfPeople");

    this.update = function() {
        //var leftMenuController = new LeftMenuController($("#leftMenu"), model, overallController);
        // Update the view to show the new number of guests
        // TODO Get the data from the model, not controller
        var result = [];
        var price = [];
        var name = [];
        var id = [];
        var fullMenu = model.getFullMenuDetail();
        var totalNumberOfGuests = model.getNumberOfGuests();

        for (i = 0; i < fullMenu.length; i++) {
            id.push(fullMenu[i][0]);
            price.push(fullMenu[i][4]);
            name.push(fullMenu[i][1]);
        }
        $('#pendingCost').text("");
        $("#costTable > tbody").html("");
        $('#costTable tbody').append('<tr><th>' + 'Pending' +
            '</th><th id="pendingCost">' + '0.00' + '</th></tr>');
        /* var dish = leftMenuController.getdish();
         var id = dish[0];
         var name = dish[1];
         var price = dish[2];*/

        for (var i = 0; i < id.length; i++) {
            $('#costTable > tbody > tr:first').before(
                '<tr class="costTable" id="' + id[i] + '" ><td>' + name[i] +
                '</td><td>' + (price[i] * totalNumberOfGuests) + '</td></tr>');
        }
        $('#costTablePrice').text('SEK ' + model.getTotalMenuPrice());
        this.dishList = container.find(".costTable");
        this.dishList.click(function() {
            var id = this.id;
            var r = confirm("Do you want to remove this dish?");
            if (r == true) {
                model.removeDishFromMenu(id);
            }
        });
    };
};
