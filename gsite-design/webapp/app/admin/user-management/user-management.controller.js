(function () {
    'use strict';

    angular
        .module('gsiteApp')
        .controller('UserManagementController', UserManagementController);

    UserManagementController.$inject = ['$state','User'];

    function UserManagementController($state, User) {
        var vm = this;

        vm.selected = [];

        vm.query = {
            order: 'name',
            limit: 5,
            page: 1
        };

        vm.users = [];
        vm.users = User.all();
    }
})();