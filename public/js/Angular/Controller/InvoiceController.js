app.controller('InvoiceController',function($scope,Item,$state,$uibModal){
    $scope.Invoices = Item;

    $scope.AddNewInvoice = function(){
        $state.go('addinvoice');
    };

    $scope.RemoveInvoice = function(item,index){
        $uibModal.open({
            animation: true,
            windowClass: 'custome_modal',
            templateUrl: 'RemoveInvoice.html',
            controller: 'RemoveInvoiceController',
            size:'sm',
            keyboard: true,
            resolve:{
                Item : function(){
                    return item;
                }
            }
        }).result.then(function(response){
            if(response){
                $scope.Invoices.splice(index,1);
            }
        });
    };

    $scope.$on('SearchBar',function(event,data){
        $scope.Text = data;
    })
});

app.controller('RemoveInvoiceController',function($scope,Item,InvoiceService,$uibModalInstance){

    $scope.Remove = function(){
        InvoiceService.Remove(Item._id).then(function(response){
            if(response.status == 204){
                $uibModalInstance.close(true);
            }
        },function(err){
            console.log(err);
        });
    };

    $scope.Close = function(){
        $uibModalInstance.dismiss('cancel');
    };
})