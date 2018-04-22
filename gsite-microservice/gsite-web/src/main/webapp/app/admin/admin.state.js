(function () {
    'use strict';

    angular
        .module('gsiteApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('admin', {
            abstract: true,
            parent: 'app',
            views: {
                'adminbar@admin': {
                    templateUrl: 'app/layouts/adminbar/adminbar.html',
                    controller: 'AdminBarController',
                    controllerAs: 'vm'
                },
                'content@': {
                    templateUrl: 'app/admin/admin.html'
                }
            }
        });
    }
})();
