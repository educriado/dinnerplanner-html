var LeftMenuController = function(view, model, overallController) {
    "use strict";
    
    view.inputNumberOfPeople.change(function() {
        var numberOfGuest = inputNumberOfPeople.value;
        if (numberOfGuest < 4) {
            alert("Number of guests cannot be less than 4.");
            view.inputNumberOfPeople.val(4);
        } else {
            model.setNumberOfGuests(numberOfGuest);
        }
    });

    view.confirmDinnerButton.click(function() {
        overallController.showDinnerOverview();
    });




    // this.getdish = function() {
    //     var result = [];
    //     var price = [];
    //     var name = [];
    //     var id = [];
    //     var fullMenu = model.getFullMenu();

    //     for (i = 0; i < fullMenu.length; i++) {
    //         id.push(fullMenu[i].id);
    //         price.push(model.getTotalPrice(fullMenu[i].id));
    //         name.push(fullMenu[i].name);
    //     }
    //     result.push(id);
    //     result.push(name);
    //     result.push(price);
    //     return result;
    // };

    // this.getTotalMenuPrice = function() {
    //     var totalPrice1 = model.getTotalMenuPrice();
    //     return totalPrice1;
    // };

    // this.removeDishFromMenu = function(id) {
    //     model.removeDishFromMenu(id);
    // };

    // $(document).on('change', '#inputNumberOfPeople', function() {
    //     var numberOfGuest = this.value;;
    //     if (numberOfGuest < 4) {
    //         alert("Number of guests cannot be less than 4.");
    //         $("#inputNumberOfPeople").val(4);
    //     } else {
    //         model.setNumberOfGuests(numberOfGuest);
    //     }
    // });
};
