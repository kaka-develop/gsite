(function() {
    'use strict';

    angular
        .module('gsiteApp')
        .controller('SettingsController', SettingsController);

    SettingsController.$inject = ['$state','Principal', 'Auth', 'LanguageService', '$translate','AlertService'];

    function SettingsController ($state,Principal, Auth, LanguageService, $translate,AlertService) {
        var vm = this;

        vm.save = save;
        vm.settingsAccount = null;

        vm.cancel = cancel;
        function cancel() {
            $state.go('settings');
        }


        var copyAccount = function (account) {
            return {
                activated: account.activated,
                email: account.email,
                firstName: account.firstName,
                langKey: account.langKey,
                lastName: account.lastName,
                login: account.login
            };
        };

        Principal.identity().then(function(account) {
            vm.settingsAccount = copyAccount(account);
        });

        function save () {
            Auth.updateAccount(vm.settingsAccount).then(function() {
                AlertService.success("OK !");
                Principal.identity(true).then(function(account) {
                    vm.settingsAccount = copyAccount(account);
                });
                LanguageService.getCurrent().then(function(current) {
                    if (vm.settingsAccount.langKey !== current) {
                        $translate.use(vm.settingsAccount.langKey);
                    }
                });
            }).catch(function() {
                AlertService.error("Error !");
            });
        }
    }
})();
