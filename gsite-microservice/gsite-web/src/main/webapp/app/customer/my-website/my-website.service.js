(function () {
    'use strict';
    angular
        .module('gsiteApp')
        .factory('MyWebsite', MyWebsite);

    MyWebsite.$inject = ['$resource'];

    function MyWebsite($resource) {
        var resourceUrl = 'gsitecustomer/' +  'api/mywebsites/:id';

        return $resource(resourceUrl, {}, {
            'query': {method: 'GET', isArray: true},
            'get': {method: 'GET'},
            'share': {method: 'GET', isArray: true, url:  'gsitecustomer/' +'api/mywebsites/share'},
            'create': {method: 'POST', url:  'gsitecustomer/' +'api/mywebsites/create'},
            'delete': {method: 'DELETE', url:  'gsitecustomer/' +'api/mywebsites/delete'},
            'update': {method: 'PUT', url:  'gsitecustomer/' +'api/mywebsites/update'},
            'paid': {method: 'POST', url:  'gsitecustomer/' +'api/mywebsites/paid'},
            'getUnpaid': {method: 'GET', url:  'gsitecustomer/' + 'api/mywebsites/unpaid', isArray: true}
        });
    }
})();

