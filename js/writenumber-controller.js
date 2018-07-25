var app = angular.module('writenumber',[]);

app.controller('writecontroller',function($scope){
    console.log('Entro al controlador');

    $scope.numberwrite = function(){
        console.log('Entro a la función');
        
    }
    
});