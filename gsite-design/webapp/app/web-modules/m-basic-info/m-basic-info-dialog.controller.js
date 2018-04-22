(function () {
    'use strict';

    angular
        .module('gsiteApp')
        .controller('MBasicInfoDialogController', MBasicInfoDialogController);

    MBasicInfoDialogController.$inject = ['$state', '$scope', 'entity'];

    function MBasicInfoDialogController($state, $scope, entity) {
        var vm = this;
        vm.basicinfo = entity;

    }
})();