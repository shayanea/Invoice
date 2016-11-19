app.service('SettingService',function($http,appConfig){
    this.Update = function(data){
        return $http.patch(appConfig.api + "setting/edit",data)
        .then(function(response){
            return response;
        }, function(error){
            return error.data;
        });
    }
});