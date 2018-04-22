(function() {
    'use strict';

    angular
        .module('gsiteApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('template', {
            parent: 'app',
            url: '/template?text&type',
            data: {
                authorities: []
            },
            params: {
              text: null
            },
            views: {
                'content@': {
                    templateUrl: 'app/templates/templates.html',
                    controller: 'TemplateController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('template');
                    return $translate.refresh();
                }]
            }
        });
    }
})();
