dinnerPlannerApp.controller('OverviewCtrl', function ($scope,$routeParams,Dinner) {
  $scope.numberOfGuest = Dinner.getNumberOfGuests();
  $scope.fullMenuDetail = Dinner.getFullMenuDetail();

  $scope.updateOverview = function() {
    var numberOfGuests = Dinner.getNumberOfGuests();
    var i;
    $scope.detail = [];
    $scope.cost = 0;
    $scope.fullMenuDetail = Dinner.getFullMenuDetail();
    for (i = 0; i < $scope.fullMenuDetail.length; i++) {
      var detailInner = [];
      detailInner.push($scope.fullMenuDetail[i][3]);
      detailInner.push($scope.fullMenuDetail[i][1]);
      $scope.cost += $scope.fullMenuDetail[i][4] * numberOfGuests;
      detailInner.push($scope.fullMenuDetail[i][4] * numberOfGuests);
      $scope.detail.push(detailInner);
    }
  };
});
