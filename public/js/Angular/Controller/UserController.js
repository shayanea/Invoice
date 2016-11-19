'use strict';
app.controller('UserController',function($scope,UserService){
    UserService.get().then(function(response){
        $scope.user = response;
    });
})