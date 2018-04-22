(function () {
    'use strict';

    angular
        .module('gsiteApp')
        .controller('MToolbarDialogController', MToolbarDialogController);

    MToolbarDialogController.$inject = ['$state','entity'];

    function MToolbarDialogController($state,entity) {
        var vm = this;

        vm.toolbar = entity;

    }
})();