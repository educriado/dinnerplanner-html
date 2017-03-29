// Here we create an Angular service that we will use for our
// model. In your controllers (or other services) you can include the
// dependency on any service you need. Angular will insure that the
// service is created first time it is needed and then just reuse it
// the next time.
dinnerPlannerApp.factory('Dinner',function ($resource, $cookieStore) {

  this.numberOfGuest = 4;
  $cookieStore.put('numberOfGuest', this.numberOfGuest);


  this.setNumberOfGuests = function(num) {
    this.numberOfGuest = num;
    $cookieStore.put('numberOfGuest', num);
  };

  this.getNumberOfGuests = function() {
    return $cookieStore.get('numberOfGuest');
  };


  // TODO in Lab 5: Add your model code from previous labs
  // feel free to remove above example code
  // you will need to modify the model (getDish and getAllDishes)
  // a bit to take the advantage of Angular resource service
  // check lab 5 instructions for details

  const apiKey = "Qu9grxVNWpmshA4Kl9pTwyiJxVGUp1lKzrZjsnghQMkFkfA4LB",
      apiRecipeSearch =
      "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/search",
      apiRecipeInformation =
      "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/{id}/information";

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

  this.fullMenu = [];
  this.fullMenuDetail = [];
  this.observers = [];
  this.currentSelectedDish = 0;
  this.currentType = "";
  this.currentDishImage = "";
  this.currentDishName = "";
  this.currentPrice = 0;
  this.currentInstruction = "";



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

  /*this.getDishByID = function (id, cb) {
      var model = this;
      $.ajax( {
         url: 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/'+id+'/information?id='+id+'',
         headers: {
           'X-Mashape-Key': 'Qu9grxVNWpmshA4Kl9pTwyiJxVGUp1lKzrZjsnghQMkFkfA4LB'
         },
         success: function(data) {
           console.log(data)
           model.setCurrentImage(data.image);
           var totalPrice = 0;
           for (var key in data.extendedIngredients) {
              totalPrice += 1 * data.extendedIngredients[key].amount;
           }
           model.setPrice(totalPrice);
           model.setInstructions(data.instructions);
           cb(data);
         },
         error: function(data) {
           console.log(data)
         }
       })
  }*/

  this.setCurrentSelectedDish = function(id) {
      this.currentSelectedDish = id;
  };

  this.getCurrentSelectedDish = function() {
      return this.currentSelectedDish;
  }

  //function that returns all dishes of specific type (i.e. "starter", "main dish" or "dessert")
  //you can use the filter argument to filter out the dish by name or ingredient (use for search)
  //if you don't pass any filter all the dishes will be returned
  /*this.getAllDishes = function(type, filter, callback, errorCallback) {

      // Do the API call
      var result = $.ajax({
          url: apiRecipeSearch,
          headers: {
              'X-Mashape-Key': apiKey
          },
          data: {
              query: filter,
              type: type
          },
          success: function(results) {
              callback(results);
          },
          error: function(results) {
              callback(results);
          }
      });
  };*/

  //function that returns a dish of specific ID
  this.getDish = function(id) {
      var key;
      for (key in dishes) {
          if (parseInt(dishes[key].id) === parseInt(id)) {
              return dishes[key];
          }
      }

  };


  /*this.setNumberOfGuests = function(num) {
      //TODO Lab 2
      this.numberOfGuests = num;
  };

  // should return
  this.getNumberOfGuests = function() {
      //TODO Lab 2
      return this.numberOfGuests;
  };*/

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
      return this.fullMenuDetail;
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
  };

  // the dishes variable contains an array of all the
  // dishes in the database. each dish has id, name, type,
  // image (name of the image file), description and
  // array of ingredients. Each ingredient has name,
  // quantity (a number), price (a number) and unit (string
  // defining the unit i.e. "g", "slices", "ml". Unit
  // can sometimes be empty like in the example of eggs where
  // you just say "5 eggs" and not "5 pieces of eggs" or anything else.
  var dishes = [{
      'id': 1,
      'name': 'French toast',
      'type': 'starter',
      'image': 'toast.jpg',
      'description': "In a large mixing bowl, beat the eggs. Add the milk, brown sugar and nutmeg; stir well to combine. Soak bread slices in the egg mixture until saturated. Heat a lightly oiled griddle or frying pan over medium high heat. Brown slices on both sides, sprinkle with cinnamon and serve hot.",
      'ingredients': [{
          'name': 'eggs',
          'quantity': 0.5,
          'unit': '',
          'price': 10
      }, {
          'name': 'milk',
          'quantity': 30,
          'unit': 'ml',
          'price': 6
      }, {
          'name': 'brown sugar',
          'quantity': 7,
          'unit': 'g',
          'price': 1
      }, {
          'name': 'ground nutmeg',
          'quantity': 0.5,
          'unit': 'g',
          'price': 12
      }, {
          'name': 'white bread',
          'quantity': 2,
          'unit': 'slices',
          'price': 2
      }]
  }, {
      'id': 2,
      'name': 'Sourdough Starter',
      'type': 'starter',
      'image': 'sourdough.jpg',
      'description': "Here is how you make it... Lore ipsum...",
      'ingredients': [{
          'name': 'active dry yeast',
          'quantity': 0.5,
          'unit': 'g',
          'price': 4
      }, {
          'name': 'warm water',
          'quantity': 30,
          'unit': 'ml',
          'price': 0
      }, {
          'name': 'all-purpose flour',
          'quantity': 15,
          'unit': 'g',
          'price': 2
      }]
  }, {
      'id': 3,
      'name': 'Baked Brie with Peaches',
      'type': 'starter',
      'image': 'bakedbrie.jpg',
      'description': "Here is how you make it... Lore ipsum...",
      'ingredients': [{
          'name': 'round Brie cheese',
          'quantity': 10,
          'unit': 'g',
          'price': 8
      }, {
          'name': 'raspberry preserves',
          'quantity': 15,
          'unit': 'g',
          'price': 10
      }, {
          'name': 'peaches',
          'quantity': 1,
          'unit': '',
          'price': 4
      }]
  }, {
      'id': 100,
      'name': 'Meat balls',
      'type': 'main dish',
      'image': 'meatballs.jpg',
      'description': "Preheat an oven to 400 degrees F (200 degrees C). Place the beef into a mixing bowl, and season with salt, onion, garlic salt, Italian seasoning, oregano, red pepper flakes, hot pepper sauce, and Worcestershire sauce; mix well. Add the milk, Parmesan cheese, and bread crumbs. Mix until evenly blended, then form into 1 1/2-inch meatballs, and place onto a baking sheet. Bake in the preheated oven until no longer pink in the center, 20 to 25 minutes.",
      'ingredients': [{
          'name': 'extra lean ground beef',
          'quantity': 115,
          'unit': 'g',
          'price': 20
      }, {
          'name': 'sea salt',
          'quantity': 0.7,
          'unit': 'g',
          'price': 3
      }, {
          'name': 'small onion, diced',
          'quantity': 0.25,
          'unit': '',
          'price': 2
      }, {
          'name': 'garlic salt',
          'quantity': 0.7,
          'unit': 'g',
          'price': 2
      }, {
          'name': 'Italian seasoning',
          'quantity': 0.6,
          'unit': 'g',
          'price': 3
      }, {
          'name': 'dried oregano',
          'quantity': 0.3,
          'unit': 'g',
          'price': 3
      }, {
          'name': 'crushed red pepper flakes',
          'quantity': 0.6,
          'unit': 'g',
          'price': 3
      }, {
          'name': 'Worcestershire sauce',
          'quantity': 6,
          'unit': 'ml',
          'price': 7
      }, {
          'name': 'milk',
          'quantity': 20,
          'unit': 'ml',
          'price': 4
      }, {
          'name': 'grated Parmesan cheese',
          'quantity': 5,
          'unit': 'g',
          'price': 8
      }, {
          'name': 'seasoned bread crumbs',
          'quantity': 15,
          'unit': 'g',
          'price': 4
      }]
  }, {
      'id': 101,
      'name': 'MD 2',
      'type': 'main dish',
      'image': 'bakedbrie.jpg',
      'description': "Here is how you make it... Lore ipsum...",
      'ingredients': [{
          'name': 'ingredient 1',
          'quantity': 1,
          'unit': 'pieces',
          'price': 8
      }, {
          'name': 'ingredient 2',
          'quantity': 15,
          'unit': 'g',
          'price': 7
      }, {
          'name': 'ingredient 3',
          'quantity': 10,
          'unit': 'ml',
          'price': 4
      }]
  }, {
      'id': 102,
      'name': 'MD 3',
      'type': 'main dish',
      'image': 'meatballs.jpg',
      'description': "Here is how you make it... Lore ipsum...",
      'ingredients': [{
          'name': 'ingredient 1',
          'quantity': 2,
          'unit': 'pieces',
          'price': 8
      }, {
          'name': 'ingredient 2',
          'quantity': 10,
          'unit': 'g',
          'price': 7
      }, {
          'name': 'ingredient 3',
          'quantity': 5,
          'unit': 'ml',
          'price': 4
      }]
  }, {
      'id': 103,
      'name': 'MD 4',
      'type': 'main dish',
      'image': 'meatballs.jpg',
      'description': "Here is how you make it... Lore ipsum...",
      'ingredients': [{
          'name': 'ingredient 1',
          'quantity': 1,
          'unit': 'pieces',
          'price': 4
      }, {
          'name': 'ingredient 2',
          'quantity': 12,
          'unit': 'g',
          'price': 7
      }, {
          'name': 'ingredient 3',
          'quantity': 6,
          'unit': 'ml',
          'price': 4
      }]
  }, {
      'id': 200,
      'name': 'Chocolat Ice cream',
      'type': 'dessert',
      'image': 'icecream.jpg',
      'description': "Here is how you make it... Lore ipsum...",
      'ingredients': [{
          'name': 'ice cream',
          'quantity': 100,
          'unit': 'ml',
          'price': 6
      }]
  }, {
      'id': 201,
      'name': 'Vanilla Ice cream',
      'type': 'dessert',
      'image': 'icecream.jpg',
      'description': "Here is how you make it... Lore ipsum...",
      'ingredients': [{
          'name': 'ice cream',
          'quantity': 100,
          'unit': 'ml',
          'price': 6
      }]
  }, {
      'id': 202,
      'name': 'Strawberry',
      'type': 'dessert',
      'image': 'icecream.jpg',
      'description': "Here is how you make it... Lore ipsum...",
      'ingredients': [{
          'name': 'ice cream',
          'quantity': 100,
          'unit': 'ml',
          'price': 6
      }]
  }];


  // Angular service needs to return an object that has all the
  // methods created in it. You can consider that this is instead
  // of calling var model = new DinnerModel() we did in the previous labs
  // This is because Angular takes care of creating it when needed.
  return this;

});
