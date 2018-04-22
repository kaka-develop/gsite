(function () {
    'use strict';

    angular
        .module('gsiteApp')
        .controller('AccountBarController', AccountBarController);

    AccountBarController.$inject = ['$state'];

    function AccountBarController($state) {
        var vm = this;
        vm.currentState = $state.current.name;

    }
})();