var app = angular.module('myApp', ['ngSanitize']);
app.controller('myCtrl', function($scope) {
    /*$scope.firstName = "John";
    $scope.lastName = "Doe";*/

    $scope.misc = {};
    $scope.data = {};

    $scope.initialDataOperation = function(){
      $scope.misc.valueRandom = $scope.valueRandom();
      $scope.data.numbersadd = [0,1,2,3,4,5,6,7,8,9];
      $scope.data.valueInitial = $scope.data.numbersadd[$scope.misc.valueRandom];
      $scope.misc.valueRandom = $scope.valueRandom();
      $scope.data.valueFinal = $scope.data.numbersadd[$scope.misc.valueRandom];

      $scope.data.answeroperation = $scope.data.valueInitial + $scope.data.valueFinal;
      $scope.data.operation = {
        valorInital: $scope.data.valueInitial,
        valorFinal: $scope.data.valueFinal,
        valorAnswer: $scope.data.answeroperation
      };

      $scope.data.answers = new Array();
      $scope.data.answers.push($scope.data.operation);
      while($scope.data.answers.length<4){
        var valueAux1 = $scope.valueRandom();
        var valueAux2 = $scope.valueRandom();
        $scope.misc.valuesAux = {
          valorInital: valueAux1,
          valorFinal: valueAux2,
          valueAnswer: valueAux1 + valueAux2
        };

        if($scope.data.answers.indexOf($scope.data.answeroperation)==-1){
          $scope.data.answers.push($scope.misc.valuesAux);
        }

      }

    }

    $scope.valueRandom = function(){
      return Math.floor((Math.random() * 10));
    }

    $scope.initialDataOperation();

    console.log('operation', $scope.data.answers);
});
