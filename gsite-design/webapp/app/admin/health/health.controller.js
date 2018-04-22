(function () {
    'use strict';

    angular
        .module('gsiteApp')
        .controller('HealthCheckController', HealthCheckController);

    HealthCheckController.$inject = ['HealthService', '$mdDialog', '$state'];

    function HealthCheckController(HealthService, $mdDialog, $state) {
        var vm = this;

        vm.updatingHealth = true;
        vm.getLabelClass = getLabelClass;
        vm.refresh = refresh;
        vm.showHealth = showHealth;
        vm.baseName = HealthService.getBaseName;
        vm.subSystemName = HealthService.getSubSystemName;

        vm.refresh();

        function getLabelClass(statusState) {
            if (statusState === 'UP') {
                return 'label-success';
            } else {
                return 'label-danger';
            }
        }

        function refresh() {

        }



        function showHealth(health) {
            $mdDialog.show({
                templateUrl: 'app/admin/health/health.modal.html',
                controller: 'HealthModalController',
                controllerAs: 'vm',
                clickOutsideToClose: true,
                fullscreen: false,
                resolve: {

                }
            });
        }

    }
})();