'use strict';
var app = angular.module('Dashboard', ["ui.router","ui.bootstrap","ngStorage","satellizer","ngMessages","ng-inputdecimalseparator"
,"ngAnimate","angular-loading-bar","angular-click-outside","ngFileUpload"]);

app.
config(['$stateProvider','$urlRouterProvider','appConfig','$locationProvider', function($stateProvider,$urlRouterProvider,appConfig,$locationProvider) {

    $urlRouterProvider.otherwise("/");

	$stateProvider
    .state('login', {
        title: 'ورود کاربران',
        url: '/login',
        templateUrl: appConfig.template + "/login.tpl.html",
        controller: "LoginController"
    })

    .state('register', {
        title: 'ثبت نام کاربران',
        url: '/register',
        templateUrl: appConfig.template + "/register.tpl.html",
        controller: "RegisterController"
    })

    .state('dashboard', {
        title: 'پیشخوان',
        url: '/',
        templateUrl: appConfig.template + "/dashboard.tpl.html",
        controller: "DashboardController",
        data: {requiredLogin: true},
        resolve:{
            Item:function(DashboardService){
                return DashboardService.Get();
            }
        }
    })
    
    .state('client', {
        title: 'لیست مشتریان',
        url: '/client',
        templateUrl: appConfig.template + "/client.tpl.html",
        controller: "ClientController",
        data: {requiredLogin: true},
        resolve:{
            Item:function(ClientService){
                return ClientService.Get();
            }
        }
    })

    .state('product', {
        title: 'لیست محصولات',
        url: '/product',
        templateUrl: appConfig.template + "/product.tpl.html",
        controller: "ProductController",
        data: {requiredLogin: true},
        resolve:{
            Item:function(ProductService){
                return ProductService.Get();
            }
        }
    })

    .state('invoice', {
        title: 'لیست فاکتور ها',
        url: '/invoice',
        templateUrl: appConfig.template + "/invoice.tpl.html",
        controller: "InvoiceController",
        data: {requiredLogin: true},
        resolve:{
            Item:function(InvoiceService){
                return InvoiceService.Get();
            }
        }
    })

    .state('addinvoice', {
        title: 'درج فاکتور جدید',
        url: '/addinvoice',
        templateUrl: appConfig.template + "/addinvoice.tpl.html",
        controller: "AddInvoiceController",
        data: {requiredLogin: true}
    })

    .state('editinvoice', {
        title: 'تدوین فاکتور',
        url: '/editinvoice/:id',
        templateUrl: appConfig.template + "/editinvoice.tpl.html",
        controller: "EditInvoiceController",
        data: {requiredLogin: true}
    })

    .state('setting', {
        title: 'تدوین فاکتور',
        url: '/setting/:id',
        templateUrl: appConfig.template + "/setting.tpl.html",
        controller: "SettingController",
        data: {requiredLogin: true}
    })

    $locationProvider.html5Mode(true);
}])

// APP DETAIL
.constant("appConfig", {
    appversion:'0.0.1',
    appproducer:'Shayan Araghi',
    template: "template",
    api: "http://localhost:3000/api/"
})

// CHECK IF USER NOT AUTH GO TO LOGIN
.config(function ($httpProvider) {
    $httpProvider.interceptors.push('HeaderConfigService');
})

// SATELLIZER CONFIG
.config(function($authProvider,appConfig){
    $authProvider.loginUrl    = appConfig.api + 'auth/login';
    $authProvider.signupUrl   = appConfig.api +  'auth/register';
    $authProvider.tokenHeader = 'Authorization';
    $authProvider.storageType = 'sessionStorage';
    $authProvider.tokenName   = 'Token';
})

// WHEN APP RUN CHECK FOR STATE AND RUN SPECIFIC FUNCTION
.run(function($rootScope,$state,$log,$uibModalStack,$auth,$timeout){

    $log.info("Angluarjs App Is Running");

    // SHOW CONTENT WHEN EVERY THING IS LOADED
    $timeout(function(){
        $rootScope.ContentLoaded = true;
    },1000)

    $rootScope.$on('$stateChangeStart',function(event, toState, toParams, fromState, fromParams){

        // CHECK WHICH PAGE IS REQUIRED FOR AUTH
        var requiredLogin = false;
        if (toState.data && toState.data.requiredLogin)
            requiredLogin = true;
        
        if (requiredLogin && !$auth.isAuthenticated()) {
            event.preventDefault();
            $state.go('login');
        }

        // BROADCAST THAT USER IS AUTH
        $rootScope.$broadcast('CheckAuth',$auth.isAuthenticated());
    });

    $rootScope.$on('$stateChangeSuccess',function(e, toState, toParams, fromState, fromParams, options){

        // WHEN COME TO LOGIN STATE LOG OUT USER
        $rootScope.PageTitle = toState.title;
        if(toState.name == "login"){
            $auth.logout();
        }
    });

});
