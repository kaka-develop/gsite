(function () {
    'use strict';

    angular
        .module('gsiteApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('support', {
            abstract: true,
            parent: 'customer',
            views: {
                'supportbar@support': {
                    templateUrl: 'app/layouts/supportbar/supportbar.html',
                    controller: 'SupportBarController',
                    controllerAs: 'vm'
                },
                'content@': {
                    templateUrl: 'app/customer/support/support.html',
                }
            }
        });
    }
})();