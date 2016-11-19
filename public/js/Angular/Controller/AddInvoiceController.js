app.controller('AddInvoiceController',function($scope,$http,appConfig,$state,InvoiceService){
    
    $scope.Date = moment().format('jYYYY/jMM/jDD');

    $scope.custome = {
        'name':'',
        'price':0,
        'number':0
    };

    $scope.invoice = {};

    $scope.invoice.product_list = [];

    $scope.SuggestProductList = [];

    $scope.invoice.product_list.push($scope.custome);

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

    $scope.getTotal = function(){
        var total = 0;
        for(var i = 0; i < $scope.invoice.product_list.length; i++){
            var product = $scope.invoice.product_list[i];
            total += (product.price * product.number);
        }
        $scope.invoice.total = total;
        return total;
    };

    $scope.AddNewInvoice = function(data,event,validation){
        $scope.submitted = true;
        if(validation){
            event.target.innerHTML = "درحال ذخیره";
            event.currentTarget.disabled = true;
            data.product_list = angular.toJson(data.product_list);
            InvoiceService.Save(data)
            .then(function(response){
                if(response.status == 201){
                    $state.go('invoice');
                }
            },function(error){
                console.log(error.data);
            });
        }  
    };

});