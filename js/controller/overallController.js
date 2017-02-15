var OverallController = function (document) {
    // Identifiers of every screen in correct order
    var screens = ["home-screen", "overview-screen", "dish-screen", "overview-screen", "preparation-screen"];
    var currentScreen = 0;
    
    this.init = function () {
        // Display only home screen and hide everything else
        var i;
        for (i = 1; i < screens.length; i++) {
            $("#" + screens[i]).hide();
            //document.getElementById(screens[i]).style.display = "none";
        }
    };
    
    this.nextStep = function () {
        // Hide current screen and show next one
        $("#" + screens[currentScreen]).hide();
        $("#" + screens[currentScreen + 1]).show();
        currentScreen++;
    };
    
    this.previusStep = function () {
        // Hide current screen and show previous one
        $("#" + screens[currentScreen]).hide();
        $("#" + screens[currentScreen - 1]).show();
        currentScreen--;
    };
};