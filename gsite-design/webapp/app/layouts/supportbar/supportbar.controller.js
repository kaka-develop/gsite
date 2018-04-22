(function () {
    'use strict';

    angular
        .module('gsiteApp')
        .controller('SupportBarController', SupportBarController);

    SupportBarController.$inject = ['$state'];

    function SupportBarController($state) {
        var vm = this;
        vm.currentState = $state.current.name;

    }
})();