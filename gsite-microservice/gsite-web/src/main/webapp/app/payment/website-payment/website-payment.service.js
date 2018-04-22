(function () {
    'use strict';
    angular
        .module('gsiteApp')
        .factory('WebsitePayment', WebsitePayment);

    WebsitePayment.$inject = ['$resource', 'DateUtils'];

    function WebsitePayment($resource, DateUtils) {
        var resourceUrl = 'gsitecustomer' +  '/api/website-payment/';

        return $resource(resourceUrl, {}, {
            'create': {method: 'POST', url: 'gsitecustomer' +'/api/website-payment/create'},
            'execute': {method: 'POST', url: 'gsitecustomer' +'/api/website-payment/execute'},
            'card': {method: 'POST', url: 'gsitecustomer' +'/api/website-payment/credit-card'}
        });
    }
})();

