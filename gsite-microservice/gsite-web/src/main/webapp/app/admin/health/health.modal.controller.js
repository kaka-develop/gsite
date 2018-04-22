(function() {
    'use strict';

    angular.module('gsiteApp')
        .controller('HealthModalController', HealthModalController);

    HealthModalController.$inject = ['$mdDialog', 'currentHealth', 'baseName', 'subSystemName'];

    function HealthModalController ($mdDialog, currentHealth, baseName, subSystemName) {
        var vm = this;

        vm.cancel = cancel;
        vm.currentHealth = currentHealth;
        vm.baseName = baseName;
        vm.subSystemName = subSystemName;

        function cancel() {
            $mdDialog.cancel('cancel');
        }
    }
})();
