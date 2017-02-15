var OverallController = function (document) {
    // Identifiers of every screen in correct order
    var screens = ["home-screen", "select-dish-screen", "dish-screen", "overview-screen", "preparation-screen"];
    var currentScreen = 0;
    
    this.init = function () {
        // Display only home screen and hide everything else
        var i;
        for (i = 1; i < screens.length; i++) {
            document.getElementById(screens[i]).style.display = "none";
        }
    };
    
    this.nextStep = function () {
        // Hide current screen and show next one
        document.getElementById(screens[currentScreen]).style.display = "none";
        document.getElementById(screens[currentScreen + 1]).style.display = "block";
        currentScreen++;
    };
    
    this.previusStep = function () {
        // Hide current screen and show previous one
        document.getElementById(screens[currentScreen]).style.display = "none";
        document.getElementById(screens[currentScreen - 1]).style.display = "block";
        currentScreen--;
    };
};