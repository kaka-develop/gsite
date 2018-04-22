(function () {
    'use strict';

    angular
        .module('gsiteApp')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$rootScope', '$state', 'Auth', '$mdDialog', 'Principal'];

    function LoginController($rootScope ,$state, Auth, $mdDialog, Principal) {
        var vm = this;

        vm.authenticationError = false;
        vm.closeLoginDialog = closeLoginDialog;
        vm.credentials = {};
        vm.login = login;
        vm.password = null;
        vm.register = register;
        vm.rememberMe = true;
        vm.requestResetPassword = requestResetPassword;

        vm.username = null;
        vm.isAuthenticated = false;
        vm.logout = logout;

        vm.isAuthenticated = Principal.isAuthenticated;


        function closeLoginDialog() {
            vm.credentials = {
                username: null,
                password: null,
                rememberMe: true
            };
            vm.authenticationError = false;
            $mdDialog.cancel('cancel');
        }


        if (vm.isAuthenticated())
            getUserInfo();

        function getUserInfo() {
            Principal.identity().then(function (user) {
                vm.username = user.login;
            });
        }


        function logout() {
            Auth.logout();
            $mdDialog.hide();
            $state.go('home');
        }

        function login(event) {
            event.preventDefault();
            Auth.login({
                username: vm.username,
                password: vm.password,
                rememberMe: vm.rememberMe
            }).then(function () {
                vm.authenticationError = false;
                $mdDialog.cancel();
                if ($state.current.name === 'register' || $state.current.name === 'activate' ||
                    $state.current.name === 'finishReset' || $state.current.name === 'requestReset') {
                    $state.go('home');
                }

                $rootScope.$broadcast('authenticationSuccess');

                // previousState was set in the authExpiredInterceptor before being redirected to login modal.
                // since login is successful, go to stored previousState and clear previousState
                if (Auth.getPreviousState()) {
                    var previousState = Auth.getPreviousState();
                    Auth.resetPreviousState();
                    $state.go(previousState.name, previousState.params);
                }
            }).catch(function () {
                vm.authenticationError = true;
            });
        }

        function register() {
            $mdDialog.cancel('cancel');
            $state.go('register');
        }

        function requestResetPassword() {
            $mdDialog.cancel('cancel');
            $state.go('requestReset');
        }
    }
})();
