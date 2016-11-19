app.service('InvoiceService',function(ServerData,appConfig,$http){
    this.Get = function(){
        return ServerData.GetData(appConfig.api + "invoice")
        .then(function(response){
            return response.data.Data;
        },function(error){
            return error.data;
        });
    },
    this.GetById = function(data){
        return ServerData.GetData(appConfig.api + "invoice/get?id=" + data)
        .then(function(response){
            return response.data.Data;
        },function(error){
            return error.data;
        });
    },
    this.Save = function(data){
        return ServerData.PostData(appConfig.api + "invoice/add",data)
        .then(function(response){
            return response;
        },function(error){
            return error.data;
        });
    },
    this.Edit = function(data){
        return $http.patch(appConfig.api + "invoice/edit",data)
        .then(function(response){
            return response.data;
        },function(error){
            return error.data;
        });
    },
    this.Remove = function(data){
        return $http.delete(appConfig.api + "invoice/remove?id=" + data)
        .then(function(response){
            return response;
        },function(error){
            return error.data;
        })
    }
});