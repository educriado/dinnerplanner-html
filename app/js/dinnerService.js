// Here we create an Angular service that we will use for our 
// model. In your controllers (or other services) you can include the
// dependency on any service you need. Angular will insure that the
// service is created first time it is needed and then just reuse it
// the next time.
dinnerPlannerApp.factory('Dinner', function($resource) {

    const apiKey = 'Qu9grxVNWpmshA4Kl9pTwyiJxVGUp1lKzrZjsnghQMkFkfA4LB',
        apiRecipeSearch =
        'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/search',
        apiRecipeInformation =
        'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/:id/information';

    var numberOfGuest = 2,
        fullMenu = [],
        fullMenuDetail = [],
        currentSelectedDish = 0;
    // Not sure if we need the previous current variables since the data is
    // automatically binded


    this.setNumberOfGuests = function(num) {
        numberOfGuest = num;
    }

    this.getNumberOfGuests = function() {
        return numberOfGuest;
    }


    // TODO in Lab 5: Add your model code from previous labs
    // feel free to remove above example code
    // you will need to modify the model (getDish and getAllDishes) 
    // a bit to take the advantage of Angular resource service
    // check lab 5 instructions for details
    this.recipeSearch = $resource(apiRecipeSearch, {}, {
        get: {
            headers: {
                'X-Mashape-Key': apiKey
            }
        }
    });

    this.recipeInfo = $resource(apiRecipeInformation, {}, {
        get: {
            headers: {
                'X-Mashape-Key': apiKey
            }
        }
    });

    this.getTotalMenuPrice = function() {

    };

    this.addDishToMenu = function(dish) {
        fullMenu.push(dish);
    };

    this.removeDishFromMenu = function() {
        
    };




    // Angular service needs to return an object that has all the
    // methods created in it. You can consider that this is instead
    // of calling var model = new DinnerModel() we did in the previous labs
    // This is because Angular takes care of creating it when needed.
    return this;

});
