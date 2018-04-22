(function () {
    'use strict';

    angular
        .module('gsiteApp')
        .factory('LoginService', LoginService);

    LoginService.$inject = ['$mdDialog'];

    function LoginService($mdDialog) {
        var service = {
            open: open
        };

        var modalInstance = null;
        var resetModal = function () {
            modalInstance = null;
        };

        return service;

        function open() {
            if (modalInstance !== null) return;
            modalInstance = $mdDialog.show({
                animation: true,
                templateUrl: 'app/components/login/login.html',
                controller: 'LoginController',
                controllerAs: 'vm',
                targetEvent: null,
                clickOutsideToClose: true,
                fullscreen: false,
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('login');
                        return $translate.refresh();
                    }]
                }
            });
            modalInstance.then(
                resetModal,
                resetModal
            );
        }
    }
})();
