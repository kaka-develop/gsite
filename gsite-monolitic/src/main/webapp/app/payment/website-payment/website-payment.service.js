(function () {
    'use strict';
    angular
        .module('gsiteApp')
        .factory('WebsitePayment', WebsitePayment);

    WebsitePayment.$inject = ['$resource', 'DateUtils'];

    function WebsitePayment($resource, DateUtils) {
        var resourceUrl = 'api/website-payment/';

        return $resource(resourceUrl, {}, {
            'create': {method: 'POST', url: 'api/website-payment/create'},
            'execute': {method: 'POST', url: 'api/website-payment/execute'},
            'card': {method: 'POST', url: 'api/website-payment/credit-card'}
        });
    }
})();

