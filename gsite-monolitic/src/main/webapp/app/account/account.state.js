(function () {
    'use strict';

    angular
        .module('gsiteApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('account', {
            abstract: true,
            parent: 'app',
            views: {
                'accountbar@account': {
                    templateUrl: 'app/layouts/accountbar/accountbar.html',
                    controller: 'AccountBarController',
                    controllerAs: 'vm'
                },
                'content@': {
                    templateUrl: 'app/account/account.html',
                }
            }
        });
    }
})();
