(function() {
    'use strict';

    angular
        .module('gsiteApp')
        .controller('UserManagementDetailController', UserManagementDetailController);

    UserManagementDetailController.$inject = ['$stateParams', 'User'];

    function UserManagementDetailController ($stateParams, User) {
        var vm = this;

        vm.load = load;
        vm.user = {};
        vm.setActivated = setActivated;
        vm.setLanguage = setLanguage;

        vm.load($stateParams.login);


        function load (login) {
            User.get({login: login}, function(result) {
                vm.user = result;
            });
        }

        function setActivated(user,activated) {
            user.activated = activated;
            User.update(user);
        }

        function setLanguage(user,langKey) {
            user.langKey = langKey;
            User.update(vm.user);
        }
    }
})();
