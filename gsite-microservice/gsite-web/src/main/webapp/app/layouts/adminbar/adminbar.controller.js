(function () {
    'use strict';

    angular
        .module('gsiteApp')
        .controller('AdminBarController', AdminBarController);

    AdminBarController.$inject = ['$state'];

    function AdminBarController($state) {
        var vm = this;
        vm.currentState = $state.current.name;
    }
})();