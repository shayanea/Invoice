'use strict';
app.controller('RegisterController',function($scope,$auth,$state){
	$scope.Register = function(user,validation){
    $scope.submitted = true;
    if(validation){
      $auth.signup(user)
      .then(function() {
        $state.go('login')
      })
      .catch(function(error) {
        if(error.status == 400){
            $scope.Error = {
                Visisbility : true,
                Text : error.data.message
            }
        } 
      });
    }
	};
});