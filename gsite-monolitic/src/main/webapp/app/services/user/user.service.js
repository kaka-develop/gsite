(function () {
    'use strict';

    angular
        .module('gsiteApp')
        .factory('User', User);

    User.$inject = ['$resource'];

    function User($resource) {
        var service = $resource('api/users/:login', {}, {
            'query': {method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    data = angular.fromJson(data);
                    return data;
                }
            },
            'save': {method: 'POST'},
            'update': {method: 'PUT'},
            'delete': {method: 'DELETE'},
            'email': {
                method: 'GET',
                url: 'api/users/email',
                transformResponse: function (data) {
                    if(data)
                     data = angular.fromJson(data);
                    return data;
                }
            }
        });

        return service;
    }
})();
