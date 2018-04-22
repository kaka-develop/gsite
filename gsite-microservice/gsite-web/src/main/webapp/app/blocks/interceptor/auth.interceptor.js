(function () {
    'use strict';

    angular
        .module('gsiteApp')
        .factory('authInterceptor', authInterceptor);

    authInterceptor.$inject = ['$rootScope', '$q', '$location', '$localStorage', '$sessionStorage'];

    function authInterceptor($rootScope, $q, $location, $localStorage, $sessionStorage) {
        var service = {
            request: request
        };

        return service;


        function request(config) {
            function isExternal(config) {
                if (config.url.indexOf('dropboxapi') > 0)
                    return true;
                return false;
            }

            /*jshint camelcase: false */
            config.headers = config.headers || {};
            var token = $localStorage.authenticationToken || $sessionStorage.authenticationToken;
            if (token && !isExternal(config)) {
                config.headers.Authorization = 'Bearer ' + token;
            }
            return config;
        }


    }
})();
