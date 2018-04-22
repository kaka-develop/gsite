(function () {
    'use strict';

    angular
        .module('gsiteApp')
        .controller('ToolbarController', ToolbarController);

    ToolbarController.$inject = ['$state', 'ToolbarService', '$log','LoginService'];

    function ToolbarController($state, ToolbarService, $log,LoginService) {
        var vm = this;
        vm.toggleSidenav = ToolbarService.toggleSidenav();
        vm.showLoginDialog = LoginService.open();
    }

})();