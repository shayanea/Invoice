app.service('ClientService',function(ServerData,appConfig,$http){
    this.Save = function(data){
        return ServerData.PostData(appConfig.api + "clients/add",data)
		.then(function (response){
			return response;
		},function (error){
			return error.data;
		});
    },
    this.Get = function(){
        return ServerData.GetData(appConfig.api + "clients")
		.then(function (response){
			return response.data;
		},function (error){
			return error.data;
		});
    },
    this.Remove = function(data){
        return $http.delete(appConfig.api + "clients/remove?id=" + data)
        .then(function(response){
            return response;
        }, function(error){
            return error.data;
        });
    },
    this.Edit = function(data){
        return $http.patch(appConfig.api + "clients/edit",data)
        .then(function(response){
            return response;
        }, function(error){
            return error.data;
        });
    }
})