(function () {
    'use strict';

    angular
        .module('gsiteApp')
        .controller('MBasicInfoDialogController', MBasicInfoDialogController);

    MBasicInfoDialogController.$inject = ['entity'];

    function MBasicInfoDialogController( entity) {
        var vm = this;
        vm.basicinfo = entity;

    }
})();
