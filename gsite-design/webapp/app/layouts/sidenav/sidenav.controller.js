(function () {
    'use strict';

    angular
        .module('gsiteApp')
        .controller('SidenavController', SidenavController);

    SidenavController.$inject = ['$state','ToolbarService','LoginService'];

    function SidenavController($state,ToolbarService,LoginService) {
        var vm = this;
        
        vm.toggleSidenav = ToolbarService.toggleSidenav();
        vm.showLoginDialog = LoginService.open();

    }
})();