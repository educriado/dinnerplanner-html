var OverallController = function () {
    // Identifiers of every screen in correct order
    // TODO add the behaviour to show or hide elements in the select dish view
    "use strict";
    var screens = ["home-screen", "select-dish-screen", "overview-screen", "preparation-screen"];
    var currentScreen = 0;
    
    this.init = function () {
        // Display only home screen and hide everything else
        var i;
        for (i = 1; i < screens.length; i++) {
            $("#" + screens[i]).hide();
        }
    };
    
    this.showSelectDish = function () {
        $("#home-screen").hide();
        $("#dishView").show();
        $("#leftMenu").show();
    };
    
    this.showDishDetails = function (id) {
        
        $("#listScreen").show();
        $("#dishView").hide();
    };
    
    this.backButton = function () {
        
        $("#listScreen").hide();
        $("#dishView").show();
    };
    
    this.showDinnerOverview = function() {
        $("#listScreen").hide();
        $("#dishView").hide();
        $("#leftMenu").hide();
        $("#overview-screen").show();
    };
    
    this.nextStep = function () {
        // Hide current screen and show next one
        $("#" + screens[currentScreen]).hide();
        $("#" + screens[currentScreen + 1]).show();
        currentScreen++;
        console.log("OverallController: showing '" + screens[currentScreen] + "' screen.");
    };
    
    this.previousStep = function () {
        // Hide current screen and show previous one
        $("#" + screens[currentScreen]).hide();
        $("#" + screens[currentScreen - 1]).show();
        currentScreen--;
        console.log("OverallController: showing '" + screens[currentScreen] + "' screen.");
    };
};