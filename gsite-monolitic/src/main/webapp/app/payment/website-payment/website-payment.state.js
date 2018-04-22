(function () {
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
                authorities: ['ROLE_USER'],
                pageTitle: 'gsiteApp.website.detail.title'
            },
            params: {
                id: null
            },
            views: {
                'content@': {
                    templateUrl: 'app/payment/website-payment/website-payment.html',
                    controller: 'WebsitePaymentController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('website-payment');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'Website', function ($stateParams, Website) {
                    return Website.get({id: $stateParams.id}).$promise;
                }]
            }
        }).state('website-payment.pay', {
            parent: 'payment',
            url: '/website-payment/{id}',
            data: {
                authorities: ['ROLE_USER']
            },
            views: {
                'content@': {
                    controller: 'WebsitePaymentPayPalController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('website-payment');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'Website', function ($stateParams, Website) {
                    return Website.get({id: $stateParams.id}).$promise;
                }]
            }
        });
    }
})();
