app.controller('ProductController',function($scope,Item,$uibModal,ProductService){

    $scope.Products = Item.Data;
    
    $scope.AddNewProduct = function(){
        $uibModal.open({
            animation: true,
            windowClass: 'custome_modal',
            templateUrl: 'AddNewProduct.html',
            controller: 'AddNewProductController',
            keyboard: true,
            resolve:{
                Item : function(){
                    return null;
                }
            }
        }).result.then(function(response){
            if(response){
                ProductService.Get().then(function(response){
                    $scope.Products = response.Data;
                });
            }
        });
    };

    $scope.RemoveProduct = function(item, index){
        $uibModal.open({
            animation: true,
            windowClass: 'custome_modal',
            templateUrl: 'RemoveProduct.html',
            controller: 'RemoveProductController',
            keyboard: true,
            size:'sm',
            resolve:{
                Item : function(){
                    return item;
                }
            }
        }).result.then(function(response){
            if(response){
                $scope.Products.splice(index,1);
            }
        });
    };

    $scope.EditProduct = function(item, index){
        $uibModal.open({
            animation: true,
            windowClass: 'custome_modal',
            templateUrl: 'AddNewProduct.html',
            controller: 'AddNewProductController',
            keyboard: true,
            resolve:{
                Item : function(){
                    return item;
                }
            }
        }).result.then(function(response){
            if(response){
                ProductService.Get().then(function(response){
                    $scope.Products = response.Data;
                });
            }
        });
    };

    $scope.$on('SearchBar',function(event,data){
        $scope.Text = data;
    });

});

app.controller('AddNewProductController',function($scope,$uibModalInstance,ProductService,Item){

    if(Item !== null){
        $scope.product = Item;
    }

    $scope.Save = function(validation,item){
        if(validation){
            if(Item !== null){
                ProductService.Edit(item).then(function(response){
                    if(response.status == 200){
                        $uibModalInstance.close(true);
                    }
                    else if(response.status == 400){

                    }
                });
            }else{
                ProductService.Save(item).then(function(response){
                    if(response.status == 201){
                        $uibModalInstance.close(true);
                    }
                    else if(response.status == 400){

                    }
                });
            }
        }
    };

    $scope.Close = function(){
        $uibModalInstance.dismiss('cancel');
    };
});

app.controller('RemoveProductController',function($scope,$uibModalInstance,ProductService,Item){
    $scope.Remove = function(){
        ProductService.Remove(Item._id).then(function(response){
            if(response.status == 204){
                $uibModalInstance.close(true);
            }
        });
    };

    $scope.Close = function(){
        $uibModalInstance.dismiss('cancel');
    };
});