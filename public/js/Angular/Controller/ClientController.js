app.controller('ClientController',function($scope,$uibModal,Item,ClientService){
    $scope.Clients = Item.Data;

    $scope.AddNewClient = function(){
        $uibModal.open({
            animation: true,
            windowClass: 'custome_modal',
            templateUrl: 'AddNewClient.html',
            controller: 'AddNewClientController',
            keyboard: true,
            resolve:{
                Item : function(){
                    return null;
                }
            }
        }).result.then(function(response){
            if(response){
                ClientService.Get().then(function(response){
                    $scope.Clients = response.Data;
                });
            }
        });
    };

    $scope.RemoveClient = function(item,index){
        $uibModal.open({
            animation: true,
            windowClass: 'custome_modal',
            templateUrl: 'RemoveClient.html',
            controller: 'RemoveClientController',
            size:'sm',
            keyboard: true,
            resolve:{
                Item : function(){
                    return item;
                }
            }
        }).result.then(function(response){
            if(response){
                console.log(index);
                $scope.Clients.splice(index,1);
            }
        });
    };

    $scope.EditClient = function(item){
        $uibModal.open({
            animation: true,
            windowClass: 'custome_modal',
            templateUrl: 'AddNewClient.html',
            controller: 'AddNewClientController',
            keyboard: true,
            resolve:{
                Item : function(){
                    return item;
                }
            }
        }).result.then(function(response){
            if(response){
                ClientService.Get().then(function(response){
                    $scope.Clients = response.Data;
                });
            }
        });
    };

    $scope.$on('SearchBar',function(event,data){
        $scope.Text = data;
    });
});

app.controller('AddNewClientController',function($scope,$uibModalInstance,ClientService,Item){

    if(Item !== null){
        $scope.client = Item;
    }

    $scope.Save = function(validation,data){
        $scope.submitted = true;
        if(validation){
            if(Item !== null){
                ClientService.Edit(data).then(function(response){
                    if(response.status == 200){
                        $uibModalInstance.close(true);
                    }else if(response.status == 400){
                        
                    }
                });
            }else{
                ClientService.Save(data).then(function(response){
                    if(response.status == 201){
                        $uibModalInstance.close(true);
                    }else if(response.status == 400){

                    }
                });
            }
            
        }
    };

    $scope.Close = function(){
        $uibModalInstance.dismiss('cancel');
    };
});

app.controller('RemoveClientController',function($scope,$uibModalInstance,ClientService,Item){

    $scope.Remove = function(){
        ClientService.Remove(Item._id).then(function(response){
            if(response.status == 204){
                $uibModalInstance.close(true);
            }
        });
    };

    $scope.Close = function(){
        $uibModalInstance.dismiss('cancel');
    };
})