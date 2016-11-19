app.service('DashboardService',function(ServerData,appConfig){
    this.Get = function(){
        return ServerData.GetData(appConfig.api + 'dashboard')
        .then(function(response){
            return response.data;
        },function(err){
            console.log(err);
        });
    }
})