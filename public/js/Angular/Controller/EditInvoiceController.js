app.controller('EditInvoiceController',function($scope,$state,$stateParams,InvoiceService,$http,appConfig){
    if(typeof $stateParams.id == "undefinde"){
        $state.go('invoice');
    }else{
        InvoiceService.GetById($stateParams.id).then(function(response){
            $scope.invoice = response;
            $scope.invoice.product_list = JSON.parse(response.product_list);
            $scope.getTotal = function(){
                var total = 0;
                for(var i = 0; i < $scope.invoice.product_list.length; i++){
                    var product = $scope.invoice.product_list[i];
                    total += (product.price * product.number);
                }
                $scope.invoice.total = total;
                return total;
            };
        },function(err){
            console.log(err.data);
        });
    }

    $scope.custome = {
        'name':'',
        'price':0,
        'number':0
    };

    $scope.SuggestProductList = [];

    $scope.AddNewRow = function(){
        $scope.invoice.product_list.unshift({
            'name':'',
            'price':0,
            'number':0
        });
    };

    $scope.SearchName = function(data){
        $http.get(appConfig.api + 'suggestname?name=' + data)
        .then(function(response){
            $scope.SuggestName = response.data.Data;
            if($scope.SuggestName.length > 0){
                $scope.SuggestNameList = true;
            }
        },function(error){
            console.log(error);
        });
    };

    $scope.SelectName = function(data){
        $scope.invoice.client_name = data.name;
        $scope.invoice.client_id = data._id;
    };

    $scope.CloseList = function(index){
        $scope.SuggestNameList = !$scope.SuggestNameList;
    };

    $scope.SearchProduct = function(data,index){
        console.log(index);
        $http.get(appConfig.api + "suggestproduct?name=" + data)
        .then(function(response){
            $scope.SuggestProduct = response.data.Data;
            if(response.data.Data.length > 0){
                $scope.SuggestProductList[index] = true;
            }
        },function(error){
            console.log(error);
        });
    };

    $scope.SelectProduct = function(data,index){
        $scope.invoice.product_list[index] = data;
        $scope.invoice.product_list[index].number = 0;
    };

    $scope.CloseProductSuggest = function(index){
        $scope.SuggestProductList[index] = false;
    };

    $scope.EditInvoice = function(data,event,validation){
        $scope.submitted = true;
        if(validation){
            event.target.innerHTML = "درحال ذخیره";
            event.currentTarget.disabled = true;
            data.product_list = angular.toJson(data.product_list);
            InvoiceService.Edit(data)
            .then(function(response){
                if(response.status == 200){
                    $state.go('invoice');
                }
            },function(error){
                console.log(error.data);
            });
        }  
    };

});