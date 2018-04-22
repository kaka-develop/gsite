(function () {
    'use strict';

    angular
        .module('gsiteApp')
        .controller('ManagerBarController', ManagerBarController);

    ManagerBarController.$inject = ['$state'];

    function ManagerBarController($state) {
        var vm = this;
        vm.currentState = $state.current.name;

    }
})();