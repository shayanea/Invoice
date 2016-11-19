app.factory('HeaderConfigService',function ($q,$injector) {

    var authInterceptorServiceFactory = {};

    var _responseError = function (rejection) {
        if(rejection.status === 401) {
            $injector.get('$state').transitionTo('login');
            return $q.reject(rejection);
        }
        else {
            return $q.reject(rejection);
        }
    }

    authInterceptorServiceFactory.responseError = _responseError;

    return authInterceptorServiceFactory;
});