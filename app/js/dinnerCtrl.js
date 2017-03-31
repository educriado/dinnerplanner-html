// Dinner controller that we use whenever we have view that needs to
// display or modify the dinner menu
dinnerPlannerApp.controller('DinnerCtrl', function ($scope,Dinner) {

  $scope.numberOfGuests = Dinner.getNumberOfGuests();

  $scope.setNumberOfGuest = function(number){
    if(number >= 4){
      Dinner.setNumberOfGuests(number);
      $scope.updateLeftMenu();
    } else{
      alert("Number of guests cannot be less than 4.");
    }
  };

  $scope.getNumberOfGuests = function() {
    return Dinner.getNumberOfGuests();
  };

  // TODO in Lab 5: Implement the methods to get the dinner menu
  // add dish to menu and get total menu price

  // $scope.checkCookie = function() {
  //   Dinner.getFullMenuDetailonLoad();
  // };

  $scope.updateLeftMenu = function() {
    var numberOfGuest = Dinner.getNumberOfGuests();
    $scope.detail = [];
    $scope.cost = 0;
    $scope.fullMenuDetail = Dinner.getFullMenuDetail();
    for (i = 0; i < $scope.fullMenuDetail.length; i++) {
      var detailInner = [];
      detailInner.push($scope.fullMenuDetail[i][0]);
      detailInner.push($scope.fullMenuDetail[i][1] * numberOfGuest);
      $scope.cost += $scope.fullMenuDetail[i][1] * numberOfGuest;
      detailInner.push($scope.fullMenuDetail[i][2]);
      $scope.detail.push(detailInner);
    }
  };

  $scope.removeDish = function(event) {
    var r = confirm("Do you want to remove this dish?");
    if(r === true){
      Dinner.removeDishFromMenu(event.currentTarget.id);
      $scope.updateLeftMenu();
    }
  };


});
