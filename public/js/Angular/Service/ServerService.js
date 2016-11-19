'use strict';
app.factory('ServerData', ['$http', function($http) {
    var ServerData = {};
    ServerData.PostData = function (url,cust) {
        return $http({
		    url: url,
		    method: "POST",
            dataType: "json",
		    data: $.param(cust),
		    headers:{'Content-Type': 'application/x-www-form-urlencoded',"Accept": "application/json"}
		})
    };
    ServerData.GetData = function (url) {
        return $http({
            url: url,
            method: "GET",
            dataType: "json",
            headers:{'Content-Type': 'application/x-www-form-urlencoded',"Accept": "application/json"}
        })
    };
    ServerData.DeleteData = function (url,cust) {
        return $http({
            url: url,
            method: "DELETE",
            dataType: "json",
            data: $.param(cust),
            headers:{'Content-Type': 'application/x-www-form-urlencoded',"Accept": "application/json"}
        })
    };
    return ServerData;
}]);