(function () {
    'use strict';

    angular
        .module('gsiteApp')
        .controller('UserManagementController', UserManagementController);

    UserManagementController.$inject = ['Principal', 'User', 'AlertService', 'LanguageService'];

    function UserManagementController(Principal, User, AlertService, LanguageService) {
        var vm = this;

        vm.authorities = ['ROLE_USER', 'ROLE_MANAGER', 'ROLE_ADMIN'];
        vm.currentAccount = null;
        vm.languages = null;
        vm.loadAll = loadAll;
        vm.setActive = setActive;
        vm.users = [];
        vm.clear = clear;


        vm.loadAll();

        LanguageService.getAll().then(function (languages) {
            vm.languages = languages;
        });
        Principal.identity().then(function (account) {
            vm.currentAccount = account;
        });

        function setActive(user, isActivated) {
            user.activated = isActivated;
            User.update(user);
        }

        function loadAll() {
            User.query({}, onSuccess, onError);
        }

        function onSuccess(data) {
            vm.users = data;
        }

        function onError(error) {
            AlertService.error(error.data.message);
        }

        function clear() {
            vm.user = {
                id: null, login: null, firstName: null, lastName: null, email: null,
                activated: null, langKey: null, createdBy: null, createdDate: null,
                lastModifiedBy: null, lastModifiedDate: null, resetDate: null,
                resetKey: null, authorities: null
            };
        }

    }
})();
