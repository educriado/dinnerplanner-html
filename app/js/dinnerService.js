// Here we create an Angular service that we will use for our
// model. In your controllers (or other services) you can include the
// dependency on any service you need. Angular will insure that the
// service is created first time it is needed and then just reuse it
// the next time.
dinnerPlannerApp.factory('Dinner',function ($resource, $cookieStore) {

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
  this.currentDishImage = "";
  this.currentDishName = "";
  this.currentPrice = 0;
  this.currentInstruction = "";

  // Number of guests is retrieved by a cookie
  this.numberOfGuest = $cookieStore.get('numberOfGuest');
  console.log('Trying to retrieve numberOfGuest cookie.');
  if (this.numberOfGuest == null) {
    console.log('Cookie didnt exists, creating it.');
    this.numberOfGuest = 4;
    $cookieStore.put('numberOfGuest', this.numberOfGuest);
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

  this.getMenuCookie = function () {
    var cookieContent = $cookieStore.get('FullMenuDetail');
    if (cookieContent == null) {
      cookieContent = [];
    }
    return cookieContent;
  };

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

  this.DishSearch = $resource('https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/search',{},{
    get: {
      headers: {
        'X-Mashape-Key': 'Qu9grxVNWpmshA4Kl9pTwyiJxVGUp1lKzrZjsnghQMkFkfA4LB'
      }
    }
  });
  this.Dish = $resource('https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/:id/information',{},{
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
  }

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

  // this.getFullMenuDetail = function() {
  //   this.detail = $cookieStore.get('LeftMenuDetail');
  //   $cookieStore.remove('LeftMenuDetail');
  //   if(this.detail == null || this.detail == undefined){
  //     this.detail = [];
  //   }
  //   for(i = 0; i < this.detail.length; i++){
  //     if(this.fullMenu.indexOf(this.detail[i][0]) === -1){
  //       this.addDishToMenu(this.detail[i][0]);
  //     }
  //     this.detail = [];
  //   }
  //   for (i = 0; i < this.fullMenuDetail.length; i++) {
  //     var detailInner = [];
  //     detailInner.push(this.fullMenuDetail[i][0]);
  //     detailInner.push(this.fullMenuDetail[i][4]);
  //     detailInner.push(this.fullMenuDetail[i][1]);
  //     this.detail.push(detailInner);
  //   }
  //     $cookieStore.put('LeftMenuDetail', this.detail);
  //     return this.detail;
  // }

  this.getFullMenuDetail = function() {
    var fullDetailIs = this.getMenuCookie();
    this.detail = [];
    for (i = 0; i < fullDetailIs.length; i++) {
      var detailInner = [];
      detailInner.push(fullDetailIs[i][0]);
      detailInner.push(fullDetailIs[i][4]);
      detailInner.push(fullDetailIs[i][1]);
      this.detail.push(detailInner);
    }
    return this.detail;
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
      if(this.fullMenu.indexOf(id) === -1) {
          var dishType = this.getCurrentType();
          if(this.fullMenu.length > 0){
              for(key in this.fullMenu){
                  if(this.fullMenuDetail[key][2] === dishType){
                      this.removeDishFromMenu(this.fullMenu[key]);
                      dishInfo.push(id);
                      dishInfo.push(this.getCurrentName());
                      dishInfo.push(this.getCurrentType());
                      dishInfo.push(this.getCurrentImage());
                      dishInfo.push(this.getPrice());
                      dishInfo.push(this.getInstructions());
                      this.fullMenu.push(id);
                      $cookieStore.remove('FullMenu');
                      $cookieStore.put('FullMenu', this.fullMenu);
                      this.fullMenuDetail.push(dishInfo);
                      $cookieStore.remove('FullMenuDetail');
                      $cookieStore.put('FullMenuDetail', this.fullMenuDetail);
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
              $cookieStore.remove('FullMenu');
              $cookieStore.put('FullMenu', this.fullMenu);
              this.fullMenuDetail.push(dishInfo);
              $cookieStore.remove('FullMenuDetail');
              $cookieStore.put('FullMenuDetail', this.fullMenuDetail);
              return 1;
          } else {
              dishInfo.push(id);
              dishInfo.push(this.getCurrentName());
              dishInfo.push(this.getCurrentType());
              dishInfo.push(this.getCurrentImage());
              dishInfo.push(this.getPrice());
              dishInfo.push(this.getInstructions());
              this.fullMenu.push(id);
              $cookieStore.remove('FullMenu');
              $cookieStore.put('FullMenu', this.fullMenu);
              this.fullMenuDetail.push(dishInfo);
              $cookieStore.remove('FullMenuDetail');
              $cookieStore.put('FullMenuDetail', this.fullMenuDetail);
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
      $cookieStore.remove('FullMenu');
      $cookieStore.put('FullMenu', this.fullMenu);
      $cookieStore.remove('FullMenuDetail');
      $cookieStore.put('FullMenuDetail', this.fullMenuDetail);
  };

  // Angular service needs to return an object that has all the
  // methods created in it. You can consider that this is instead
  // of calling var model = new DinnerModel() we did in the previous labs
  // This is because Angular takes care of creating it when needed.
  return this;

});
