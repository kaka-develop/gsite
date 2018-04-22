(function () {
    'use strict';

    angular
        .module('gsiteApp')
        .controller('MSidenavDialogController', MSidenavDialogController);

    MSidenavDialogController.$inject = ['entity'];

    function MSidenavDialogController(entity) {
        var vm = this;

        vm.sidenav = entity;
    }
})();
