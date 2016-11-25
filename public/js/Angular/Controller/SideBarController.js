app.controller('SideBarController',function($scope,UserService,$auth,$state,appConfig,$uibModal,$rootScope){
    
    // CHECK IF USER IS AUTH GET USER DATA AND MENU HEIGHT
    $scope.$on('CheckAuth',function(event, data){
        $scope.UserIsLogin = data;
        if(data){
            UserService.get().then(function(response){
                $scope.user = response.Data;
                if(typeof response.Data.image == "undefined"){
                    $scope.user.image = "default_user.jpg";
                }
            });
        }
    });

    // MENU TEMPLATE
    $scope.MenuSrc = appConfig.template + "/menu.tpl.html";

    // TOOLBAR TEMPLATE
    $scope.ToolbarSrc = appConfig.template + "/toolbar.tpl.html";
    
    // LOGOUT USER
    $scope.logout = function(){
        $auth.logout();
        $state.go('login');
    };

    $scope.Search = function(data){
        $rootScope.$broadcast('SearchBar',data);
    };

    $scope.Profile = function(){
        $uibModal.open({
            animation: true,
            windowClass: 'custome_modal',
            templateUrl: 'Profile.html',
            controller: 'ProfileController',
            keyboard: true,
            size:'sm',
            resolve:{
                Item : function(){
                    return $scope.user;
                }
            }
        }).result.then(function(response){
            if(response){
                UserService.get().then(function(response){
                    $scope.user = response.Data;
                });
            }
        });
    };
    
}); 

app.controller('ProfileController',function($scope,Upload,$uibModalInstance,appConfig,Item){
    $scope.profile = Item;
    
    $scope.Submit = function(item,validation,event){
        Upload.upload({
            url: appConfig.api + 'profile/upload',
            data: {file: $scope.file, fname: item.fname, lname: item.lname}
        }).then(function (resp) {
           if(resp.status == 204){
               $uibModalInstance.close(true);
           }
        }, function (resp) {
            console.log('Error status: ' + resp.status);
        }, function (evt) {
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
        });
    };

    $scope.uploadFiles = function(file, errFiles){
    	if(typeof errFiles[0] !== "undefined"){
	    	if(errFiles[0].$error === "pattern"){
	    		$scope.Error = "(پسوند معتبر png/jpg/jpeg)پسوند فایل نامعتبر است.";
                console.log(errFiles[0].$error);
	    	}
	    	else if( errFiles[0].$error === "maxSize"){
	    		$scope.Error = "سایز فایل بیش از اندازه است.";
                console.log(errFiles[0].$error);
	    	}
    	}else{
    		if(file !== null){
                $scope.file = file;
    		}
    	}
    };

    $scope.Close = function(){
        $uibModalInstance.dismiss('cancel');
    }
});