(function() {
    'use strict';

    angular
        .module('gsiteApp')
        .controller('ActivationController', ActivationController);

    ActivationController.$inject = ['$stateParams', 'LoginService'];

    function ActivationController ($stateParams, LoginService) {
        var vm = this;

        vm.success = true;
        vm.error = true;

    }
})();
