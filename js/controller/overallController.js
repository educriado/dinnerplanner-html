var OverallController = function (document) {
    // Identifiers of every screen in correct order
    // TODO change this to correct screen order when Arhram has his html code
    "use strict";
    var screens = ["home-screen", "overview-screen", "dish-screen", "overview-screen", "preparation-screen"];
    var currentScreen = 0;
    
    this.init = function () {
        // Display only home screen and hide everything else
        var i;
        for (i = 1; i < screens.length; i++) {
            $("#" + screens[i]).hide();
        }
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