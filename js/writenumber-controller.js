var app = angular.module('writenumber', ['signature']);

app.controller('writecontroller', function ($scope) {

    console.log('Entro al controlador');

    $scope.boundingBox = {
        width: 700,
        height: 300
    };

});