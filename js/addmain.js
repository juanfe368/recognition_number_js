/*angular.module('myApp', 'customInterpolationApp')*/
var app = angular.module("myApp", []);
/*app.controller("myCtrl", function($scope) {
    $scope.records = [
        "Alfreds Futterkiste",
        "Berglunds snabbköp",
        "Centro comercial Moctezuma",
        "Ernst Handel",
    ]
});*/
app.factory('MyTimer', function($interval){
    return function(delay){
        var initialMs= (new Date()).getTime();
        var result = {totalMilliseconds:0, counts:0};
        $interval(function() {
            result.totalMilliseconds = (new Date()).getTime() - initialMs;
            result.counts++;
        }, delay);
        return result;
    };
 });

app.controller('myCtrl', function($scope, MyTimer) {

    $scope.misc = {};
    $scope.data = {
      answeruser: "",
      turnuser: 0,
      answercorrect: 0,
      answerinccorect: 0
    };

    $scope.initialDataOperation = function(){
      $scope.misc.valueRandom = $scope.valueRandom();
      $scope.data.numbersadd = [0,1,2,3,4,5,6,7,8,9];
      $scope.data.valueInitial = $scope.data.numbersadd[$scope.misc.valueRandom];
      $scope.misc.valueRandom = $scope.valueRandom();
      $scope.data.valueFinal = $scope.data.numbersadd[$scope.misc.valueRandom];

      $scope.data.answeroperation = $scope.data.valueInitial + $scope.data.valueFinal;

      $scope.data.operation = [];
      $scope.data.operation = {valorInital:$scope.data.valueInitial, valorFinal:$scope.data.valueFinal, valueAnswer:$scope.data.answeroperation};

      $scope.data.answers = new Array();
      $scope.data.posAnswer = Math.floor((Math.random() * 4));
      $scope.data.answers[$scope.data.posAnswer] = $scope.data.operation.valueAnswer;
      var countPos = 0;
      while(countPos<4){
        var valueAux1 = $scope.valueRandom();
        var valueAux2 = $scope.valueRandom();
        $scope.misc.valuesAux = {
          valorInital: valueAux1,
          valorFinal: valueAux2,
          valueAnswer: valueAux1 + valueAux2
        };
        if($scope.data.answers.indexOf($scope.misc.valuesAux.valueAnswer)<0){
          if($scope.data.answers[countPos]==null||$scope.data.answers[countPos]==""){
            $scope.data.answers[countPos] = $scope.misc.valuesAux.valueAnswer;
            countPos++;
          }
          else{
            countPos++;
          }
        }
        //countPos++;
      }
    }

    $scope.valueRandom = function(){
      return Math.floor((Math.random() * 10));
    }

    $scope.chooseAnswer = function(answeruser){
      //console.log('answeruser:',$scope.data.answeruser);
      $scope.data.answeruser = answeruser;
      console.log('answeruser:',$scope.data.answeruser);
      console.log('valueAnswer:',$scope.data.operation.valueAnswer);

      if($scope.data.answeruser==$scope.data.operation.valueAnswer){
        $scope.data.answercorrect++;
        console.log('La respuesta es correcta:',$scope.data.answeruser);
      }
      else{
        $scope.data.answerinccorect++;
        console.log('La respuesta es incorrecta:',$scope.data.answeruser);
      }
      $scope.data.turnuser++;
      if($scope.data.turnuser==4){
        console.log('Respuestas Correctas: ',$scope.data.answercorrect);
        console.log('Respuestas incorrectas: ',$scope.data.answerinccorect);
        console.log('Fin del juego');
      }
      else{
        $scope.data.answeruser = "";
        $scope.initialDataOperation();
      }
    }

    $scope.startGame = function(){
      $scope.t = MyTimer(1000);
      console.log('time',$scope.t.counts);
    }

    $scope.initialDataOperation();
});
