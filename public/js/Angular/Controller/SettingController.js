app.controller('SettingController',function($scope,SettingService,$state){

    $scope.UpdateSetting = function(data){
        SettingService.Update(data).then(function(response){
            if(response.status == 204){
                $state.go('dashboard');
            }
        });
    };

});