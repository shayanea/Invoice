'use strict';
app.controller('LoginController',function($scope,$state,$auth,$timeout){
    $scope.Login = function(user,validation,event){
        $scope.submitted = true;
        $scope.Error = {
            Visisbility : false,
            Text : ""
        }
        if(validation){
            event.target.innerHTML = "درحال بررسی";
            event.currentTarget.disabled = true;
            $auth.login(user)
            .then(function() {
                $state.go('dashboard');
            })
            .catch(function(error) {
                if(error.status == 400 || error.status == 404){
                    $scope.Error = {
                        Visisbility : true,
                        Text : error.data.message
                    };
                    event.target.innerHTML = "ورود";
                    event.currentTarget.disabled = false;
                }   
            });
        }
    };
});