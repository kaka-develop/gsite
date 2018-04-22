(function() {
    'use strict';

    angular
        .module('gsiteApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('faq', {
            parent: 'support',
            url: '/faq',
            data: {
                authorities: [],
                pageTitle: 'gsiteApp.template.home.title'
            },
            views: {
                'support-content@support': {
                    templateUrl: 'app/customer/support/faq/faqs.html',
                    controller: 'FAQController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('user-management');
                    return $translate.refresh();
                }]
            }
        });
    }
})();
