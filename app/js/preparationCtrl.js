dinnerPlannerApp.controller('PreparationCtrl', function ($scope,$routeParams,Dinner) {
  $scope.numberOfGuest = Dinner.getNumberOfGuests();
  $scope.fullMenuDetail = Dinner.getFullMenuDetail();

  $scope.updatePreparation = function() {
    var numberOfGuests = Dinner.getNumberOfGuests();
    var i;
    $scope.detail = [];
    $scope.fullMenuDetail = Dinner.getFullMenuDetail();
    for (i = 0; i < $scope.fullMenuDetail.length; i++) {
      var detailInner = [];
      detailInner.push($scope.fullMenuDetail[i][3]);
      detailInner.push($scope.fullMenuDetail[i][1]);
      var instruction = "";
      for(var key in $scope.fullMenuDetail[i][5]){
        instruction += $scope.fullMenuDetail[i][5][key].step;
      }
      detailInner.push(instruction);
      $scope.detail.push(detailInner);
    }
  };
});
