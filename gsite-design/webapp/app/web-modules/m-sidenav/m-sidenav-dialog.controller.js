(function () {
    'use strict';

    angular
        .module('gsiteApp')
        .controller('MSidenavDialogController', MSidenavDialogController);

    MSidenavDialogController.$inject = ['$state','entity'];

    function MSidenavDialogController($state,entity) {
        var vm = this;

        vm.sidenav = entity;
    }
})();