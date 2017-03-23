// Search controller that we use whenever we have a search inputs
// and search results
dinnerPlannerApp.controller('SearchController', ($scope, Dinner) => {
    // TODO in Lab 5: you will need to implement a method that searchers for dishes
    // including the case while the search is still running.
  $scope.search = function(query, type) {
    $scope.status = 'Searching...';
    Dinner.recipeSearch.get({ query, type }, (data) => {
      $scope.dishes = data.results;
      $scope.status = `Showing ${data.results.length} results`;
    }, (data) => {
      $scope.status = `There was an error: ${data}`;
    });
  };
});
