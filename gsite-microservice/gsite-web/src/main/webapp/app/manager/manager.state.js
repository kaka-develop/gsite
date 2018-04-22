(function () {
    'use strict';

    angular
        .module('gsiteApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('manager', {
            abstract: true,
            parent: 'app',
            views: {
                'managerbar@manager': {
                    templateUrl: 'app/layouts/managerbar/managerbar.html',
                    controller: 'ManagerBarController',
                    controllerAs: 'vm'
                },
                'content@': {
                    templateUrl: 'app/manager/manager.html',
                }

            }
        });
    }
})();
