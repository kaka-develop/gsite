(function() {
    'use strict';

    angular
        .module('gsiteApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('health', {
            parent: 'admin',
            url: '/health',
            data: {
                authorities: ['ROLE_ADMIN'],
                pageTitle: 'health.title'
            },
            views: {
                'admin-content@admin': {
                    templateUrl: 'app/admin/health/health.html',
                    controller: 'HealthCheckController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('health');
                    return $translate.refresh();
                }]
            }
        });
    }
})();
