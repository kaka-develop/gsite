(function() {
    'use strict';

    angular
        .module('gsiteApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('app', {
            abstract: true,
            views: {
                'sidenav@': {
                    templateUrl: 'app/layouts/sidenav/sidenav.html',
                    controller: 'SidenavController',
                    controllerAs: 'vm',
                },
                'toolbar@': {
                    templateUrl: 'app/layouts/toolbar/toolbar.html',
                    controller: 'ToolbarController',
                    controllerAs: 'vm'
                },
                'quicktool@': {
                    templateUrl: 'app/layouts/quicktool/quicktool.html',
                    controller: 'QuickToolController',
                    controllerAs: 'vm'
                },
                'footer@': {
                    templateUrl: 'app/layouts/footer/footer.html',
                    controller: 'FooterController',
                    controllerAs: 'vm'
                },
                'custom-sidenav@': {
                    templateUrl: 'app/layouts/custom-sidenav/custom-sidenav.html',
                    controller: 'CustomSidenavController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                authorize: ['Auth',
                    function (Auth) {
                        return Auth.authorize();
                    }
                ],
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('global');
                }]
            }
        });
    }
})();
