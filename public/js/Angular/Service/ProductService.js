app.service('ProductService',function(ServerData,appConfig,$http){
    this.Save = function(data){
        return ServerData.PostData(appConfig.api + "product/add",data)
		.then(function (response){
			return response;
		},function (error){
			return error.data;
		});
    },
    this.Get = function(data){
        return ServerData.GetData(appConfig.api + "product")
		.then(function (response){
			return response.data;
		},function (error){
			return error.data;
		});
    },
    this.Remove = function(data){
        return $http.delete(appConfig.api + "product/remove?id=" + data)
        .then(function(response){
            return response;
        }, function(error){
            return error.data;
        });
    },
    this.Edit = function(data){
        return $http.patch(appConfig.api + "product/edit",data)
        .then(function(response){
            return response;
        }, function(error){
            return error.data;
        });
    }
});