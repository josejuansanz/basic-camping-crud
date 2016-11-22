export class MainController {
  constructor ($scope, $http, $timeout, webDevTec, toastr) {
    'ngInject';


    $scope.getCampings = function() {
      $http.get('http://localhost:9001/v1/camping')
        .success(function (response) {
          $scope.campings = response;
          console.log(response);
        });
    };

    $scope.createCamping = function() {
      $http.post('http://localhost:9001/v1/camping', $scope.newCamping, {headers: {'Content-Type': 'application/json'}})
        .success(function(response) {
          console.log(response);
          $scope.getCampings();
        });
    };

    $scope.updateCamping = function(camping) {
      $http.put('http://localhost:9001/v1/camping/' + camping._id, camping, {headers: {'Content-Type': 'application/json'}})
        .success(function(response) {
          console.log(response);
          $scope.getCampings();
        });
    };

    $scope.deleteCamping = function(camping) {
      $http.delete('http://localhost:9001/v1/camping/' + camping._id)
        .success(function(response) {
          console.log(response);
          $scope.getCampings();
        });
    };

    $scope.getCampings();

  }

}
