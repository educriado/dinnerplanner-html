// Dinner controller that we use whenever we want to display detailed
// information for one dish
dinnerPlannerApp.controller('DishCtrl', function ($scope,$routeParams,Dinner) {

  // TODO in Lab 5: you need to get the dish according to the routing parameter
  // $routingParams.paramName
  // Check the app.js to figure out what is the paramName in this case

  $scope.search = function() {
     $scope.status = "Searching...";
     Dinner.Dish.get({id:$routeParams.dishId},function(data){
       $scope.ingredients=data.extendedIngredients;
       $scope.instructions=data.analyzedInstructions[0].steps;
       $scope.images=data.image;
       $scope.price=0;
       for(var key in $scope.instructions){
         $scope.price++;
       }
       Dinner.setCurrentName(data.title);
       Dinner.setCurrentImage($scope.images);
       Dinner.setInstructions($scope.instructions);
       Dinner.setPrice($scope.price);
       $scope.status = "Showing results for the dish";
     },function(data){
       $scope.status = "There was an error";
     });
   };

   $scope.confirmDish = function() {
     Dinner.setCurrentType("0");
     var result = Dinner.addDishToMenu($routeParams.dishId);
     if(!result){
       alert("Dish already exist in the menu.");
     }else{
       alert("Dish successfully added to the menu.");
     }
   };
});
