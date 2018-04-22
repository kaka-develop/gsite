(function() {
    'use strict';

    angular.module('gsiteApp')
        .controller('HealthModalController', HealthModalController);

    HealthModalController.$inject = ['$mdDialog'];

    function HealthModalController ($mdDialog) {
        var vm = this;

        vm.cancel = cancel;
    

        function cancel() {
           $mdDialog.cancel();
        }
    }
})();
