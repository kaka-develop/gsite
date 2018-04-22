(function() {
    'use strict';

    angular
        .module('gsiteApp')
        .controller('UserManagementDetailController', UserManagementDetailController);

    UserManagementDetailController.$inject = ['$stateParams', 'entity'];

    function UserManagementDetailController ($stateParams, entity) {
        var vm = this;

        vm.user = entity;
    }
})();
