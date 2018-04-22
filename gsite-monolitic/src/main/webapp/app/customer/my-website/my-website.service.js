(function () {
    'use strict';
    angular
        .module('gsiteApp')
        .factory('MyWebsite', MyWebsite);

    MyWebsite.$inject = ['$resource'];

    function MyWebsite($resource) {
        var resourceUrl = 'api/mywebsites/:id';

        return $resource(resourceUrl, {}, {
            'query': {method: 'GET', isArray: true},
            'share': {method: 'GET', isArray: true, url: 'api/mywebsites/share'},
            'create': {method: 'POST', url: 'api/mywebsites/create'},
            'delete': {method: 'DELETE', url: 'api/mywebsites/delete'},
            'update': {method: 'PUT', url: 'api/mywebsites/update'},
            'paid': {method: 'POST', url: 'api/mywebsites/paid'},
            'getUnpaid': {method: 'GET', url: 'api/mywebsites/unpaid', isArray: true}
        });
    }
})();

