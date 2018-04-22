(function() {
    'use strict';

    angular
        .module('gsiteApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('website-payment', {
            parent: 'payment',
            url: '/payment/website/{id}',
            data: {
                authorities: [],
                pageTitle: 'gsiteApp.website.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/payment/website-payment/website-payment.html',
                    controller: 'WebsitePaymentController',
                    controllerAs: 'vm'
                }
            }
        });
    }
})();
