// Here we create an Angular service that we will use for our
// model. In your controllers (or other services) you can include the
// dependency on any service you need. Angular will insure that the
// service is created first time it is needed and then just reuse it
// the next time.
dinnerPlannerApp.factory('Dinner', function($resource, $cookieStore) {

  const apiKey = "Qu9grxVNWpmshA4Kl9pTwyiJxVGUp1lKzrZjsnghQMkFkfA4LB";
  const apiRecipeSearch =
    "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/search";
  const apiRecipeInformation =
    "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/{id}/information";

  this.detail = [];
  // We save the IDs of the dishes
  this.fullMenu = [];
  // We save the details of the dishes
  this.fullMenuDetail = [];
  this.currentSelectedDish = 0;
  this.currentType = "";
  this.typeDish = [];
  this.currentDishImage = "";
  this.currentDishName = "";
  this.currentPrice = 0;
  this.currentInstruction = "";
  var _self = this;
  // Number of guests is retrieved by a cookie
  this.numberOfGuest = $cookieStore.get('numberOfGuest');
  console.log('Trying to retrieve numberOfGuest cookie.');
  if (this.numberOfGuest == null) {
    console.log('Cookie didnt exists, creating it.');
    this.numberOfGuest = 4;
    $cookieStore.put('numberOfGuest', this.numberOfGuest);
  }

  this.fullMenuDetailCookie = $cookieStore.get('FullMenu');
  console.log('Trying to retrieve fullMenuDetail cookie.');
  if (this.fullMenuDetailCookie == null) {
    console.log('Cookie didnt exists, creating it.');
    this.fullMenuDetailCookie = [];
  }

  this.setNumberOfGuests = function(num) {
    this.numberOfGuest = num;
    $cookieStore.put('numberOfGuest', num);
  };

  this.getNumberOfGuests = function() {
    return this.numberOfGuest;
  };

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
        'X-Mashape-Key': apiKey,
      },
    },
  });

  this.setCurrentType = function(dishType) {
    this.currentType = dishType;
  };

  this.getCurrentType = function() {
    return this.currentType;
  };

  this.setCurrentImage = function(image) {
    this.currentDishImage = image;
  };

  this.getCurrentImage = function() {
    return this.currentDishImage;
  };

  this.setCurrentName = function(name) {
    this.currentDishName = name;
  };

  this.getCurrentName = function() {
    return this.currentDishName;
  };

  this.setPrice = function(price) {
    this.currentPrice = price;
  };

  this.getPrice = function() {
    return this.currentPrice;
  };

  this.setInstructions = function(instruction) {
    this.currentInstruction = instruction;
  };

  this.getInstructions = function() {
    return this.currentInstruction;
  };

  this.DishSearch = $resource('https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/search', {}, {
    get: {
      headers: {
        'X-Mashape-Key': 'Qu9grxVNWpmshA4Kl9pTwyiJxVGUp1lKzrZjsnghQMkFkfA4LB'
      }
    }
  });
  this.Dish = $resource('https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/:id/information', {}, {
    get: {
      headers: {
        'X-Mashape-Key': 'Qu9grxVNWpmshA4Kl9pTwyiJxVGUp1lKzrZjsnghQMkFkfA4LB'
      }
    }
  });

  this.setCurrentSelectedDish = function(id) {
    this.currentSelectedDish = id;
  };

  this.getCurrentSelectedDish = function() {
    return this.currentSelectedDish;
  };

  //function that returns a dish of specific ID
  this.getDish = function(id) {
    var key;
    for (key in dishes) {
      if (parseInt(dishes[key].id) === parseInt(id)) {
        return dishes[key];
      }
    }

  };


  //Returns the dish that is on the menu for selected type
  this.getSelectedDish = function(type) {
    //TODO Lab 2
    for (key in this.fullMenu) {
      if (this.getDish(this.fullMenu[key]).type === type) {
        return this.getDish(this.fullMenu[key]);
      }
    }
  };

  //Returns all the dishes on the menu.
  this.getFullMenu = function() {
    //TODO Lab 2
    var allDishes = [],
      key;
    for (key in this.fullMenu) {
      allDishes.push(this.getDish(this.fullMenu[key]));
    }
    return allDishes;
  };

  this.getFullMenuDetail = function() {
    this.detail = [];
    for (var i = 0; i < this.fullMenuDetail.length; i++) {
      var detailInner = [];
      detailInner.push(this.fullMenuDetail[i][0]);
      detailInner.push(this.fullMenuDetail[i][4]);
      detailInner.push(this.fullMenuDetail[i][1]);
      this.detail.push(detailInner);
    }
    return this.detail;
  };

  this.getFullMenuDetailForPreparation = function() {
      return this.fullMenuDetail;
  };

  var setFullMenuDetail = function(dishInfo) {
    _self.fullMenuDetail.push(dishInfo);
    console.log(_self.fullMenuDetail);
  }

  //Returns all ingredients for all the dishes on the menu.
  this.getAllIngredients = function() {
    //TODO Lab 2
    var listOfAllIngredients = [],
      key;
    for (key in this.fullMenu) {
      var ingrdientForDish = [];
      for (key in this.fullMenu[key].ingredients) {
        ingrdientForDish.push(this.fullMenu[key].ingredients.name);
      }
      listOfAllIngredients.push(ingrdientForDish);
    }
  };

  // Returns price of dish
  this.getTotalPrice = function(id) {
    var totalPrice = 0,
      dish = this.getDish(id),
      key;
    console.log(dish);
    for (key in dish.ingredients) {
      totalPrice = totalPrice + dish.ingredients[key].price;
    }
    totalPrice = totalPrice * this.getNumberOfGuests();
    console.log(totalPrice);
    return totalPrice;
  };

  //Returns the total price of the menu (all the ingredients multiplied by number of guests).
  this.getTotalMenuPrice = function() {
    //TODO Lab 2
    var totalMenuPrice = 0,
      key;
    for (key in this.fullMenuDetail) {
      totalMenuPrice = totalMenuPrice + this.fullMenuDetail[key][4];
    }
    totalMenuPrice = totalMenuPrice * this.getNumberOfGuests();
    return totalMenuPrice;
  };

  this.getTotalPrice = function(id) {
    var totalPrice = 0,
      dish = this.getDish(id),
      key;
    for (key in dish.ingredients) {
      totalPrice = totalPrice + dish.ingredients[key].price;
    }
    totalPrice = totalPrice * this.getNumberOfGuests();
    return totalPrice;
  };

  this.addDishToMenu = function(id) {
    //TODO use $cookieStore to save info about the menu
    console.log("Added dish:" + id);
    var key;
    var dishInfo = [];
    if (this.fullMenu.indexOf(id) === -1) {
      var dishType = this.getCurrentType();
      if (this.fullMenu.length > 0) {
        for (key in this.fullMenu) {
          if (this.fullMenuDetail[key][2] === dishType) {
            this.removeDishFromMenu(this.fullMenu[key]);
            dishInfo.push(id);
            dishInfo.push(this.getCurrentName());
            dishInfo.push(this.getCurrentType());
            dishInfo.push(this.getCurrentImage());
            dishInfo.push(this.getPrice());
            dishInfo.push(this.getInstructions());
            this.fullMenu.push(id);
            this.typeDish.push(this.getCurrentType())
            $cookieStore.remove('FullMenu', this.fullMenu);
            $cookieStore.remove('TypeDish', this.typeDish);
            $cookieStore.put('FullMenu', this.fullMenu);
            $cookieStore.put('TypeDish', this.typeDish);
            this.fullMenuDetail.push(dishInfo);
            return 1;
          }
        }
        dishInfo.push(id);
        dishInfo.push(this.getCurrentName());
        dishInfo.push(this.getCurrentType());
        dishInfo.push(this.getCurrentImage());
        dishInfo.push(this.getPrice());
        dishInfo.push(this.getInstructions());
        this.fullMenu.push(id);
        this.typeDish.push(this.getCurrentType())
        $cookieStore.remove('FullMenu', this.fullMenu);
        $cookieStore.remove('TypeDish', this.typeDish);
        $cookieStore.put('FullMenu', this.fullMenu);
        $cookieStore.put('TypeDish', this.typeDish);
        this.fullMenuDetail.push(dishInfo);
        return 1;
      } else {
        dishInfo.push(id);
        dishInfo.push(this.getCurrentName());
        dishInfo.push(this.getCurrentType());
        dishInfo.push(this.getCurrentImage());
        dishInfo.push(this.getPrice());
        dishInfo.push(this.getInstructions());
        this.fullMenu.push(id);
        this.typeDish.push(this.getCurrentType())
        $cookieStore.remove('FullMenu', this.fullMenu);
        $cookieStore.remove('TypeDish', this.typeDish);
        $cookieStore.put('FullMenu', this.fullMenu);
        $cookieStore.put('TypeDish', this.typeDish);
        this.fullMenuDetail.push(dishInfo);
        return 1;
      }
    } else {
      return 0;
    }
  };

  //Removes dish from menu
  this.removeDishFromMenu = function(id) {
    //TODO Lab 2
    var index = this.fullMenu.indexOf(id);
    this.fullMenu.splice(index, 1);
    this.fullMenuDetail.splice(index, 1);
    $cookieStore.remove('FullMenu', this.fullMenu);
    $cookieStore.remove('TypeDish', this.typeDish);
    $cookieStore.put('FullMenu', this.fullMenu);
    $cookieStore.put('TypeDish', this.typeDish);
  };

  this.fullMenuCookie = function (callback) {
    if (this.fullMenu.length === 0) {
      this.fullMenu = [];
      this.fullMenuCookieAllIds = [];
      if (this.fullMenuDetailCookie.length != 0) {
        this.fullMenuCookieAllIds = $cookieStore.get('FullMenu');
        this.typeDish = $cookieStore.get('TypeDish');
        for (var i = 0; i < this.fullMenuCookieAllIds.length; i++) {
          var id = this.fullMenuCookieAllIds[i];
          var detailAPI = [];
          var type = this.typeDish[i];
          this.Dish.get({ id: id }, function(data) {
            var dishInfo = [];
            var price = 0;
            var instructions = data.analyzedInstructions[0].steps;
            for (var key in instructions) {
              price++;
            }
            console.log("test");
            console.log(data);
            dishInfo.push(id);
            dishInfo.push(data.title);
            dishInfo.push(type);
            dishInfo.push(data.image);
            dishInfo.push(price);
            dishInfo.push(instructions);
            console.log(dishInfo);
            _self.fullMenuDetail.push(dishInfo);
            console.log(_self.fullMenuDetail);
            _self.fullMenu.push(id);
            if(_self.fullMenu.length === _self.fullMenuCookieAllIds.length){
              console.log(_self.fullMenuDetail);
              callback();
            }

          }, function(data) {
            alert("There was an error.");
          });
        }
        // WE HAVE ALL THE INFO ABOUT THE dishes
      }
    }else{
      callback();
    }
      // callback();
  }

  // Angular service needs to return an object that has all the
  // methods created in it. You can consider that this is instead
  // of calling var model = new DinnerModel() we did in the previous labs
  // This is because Angular takes care of creating it when needed.
  return this;

});
