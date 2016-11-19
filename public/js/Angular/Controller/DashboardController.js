app.controller('DashboardController',function($scope,Item){
    
    $scope.Stats = Item.Stats;

    $scope.Invoices = Item.Data;
});