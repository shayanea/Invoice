'use strict';
app.service('UserService',function(ServerData,appConfig){
	this.get = function(){
		return ServerData.GetData(appConfig.api + "profile")
		.then(function (response){
			return response.data;
		},function (error){
			return error.data;
		});
	},
    this.update = function(data){
        return ServerData.PostData(appConfig.api + "profile/edit",data)
        .then(function (response){
            return response.data;
        },function(error){ 
            return error.data;
        });
    }
});