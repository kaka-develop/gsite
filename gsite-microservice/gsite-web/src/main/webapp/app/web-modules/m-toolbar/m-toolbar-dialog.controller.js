(function () {
    'use strict';

    angular
        .module('gsiteApp')
        .controller('MToolbarDialogController', MToolbarDialogController);

    MToolbarDialogController.$inject = ['entity'];

    function MToolbarDialogController(entity) {
        var vm = this;

        vm.toolbar = entity;
    }
})();
