(function () {
    'use strict';

    angular
        .module('gsiteApp')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['$scope', 'Principal', 'LoginService', '$state', 'TemplateService'];

    function HomeController($scope, Principal, LoginService, $state, TemplateService) {
        var vm = this;

        vm.account = null;
        vm.isAuthenticated = null;
        vm.login = LoginService.open;
        vm.register = register;

        $scope.$on('authenticationSuccess', function () {
            getAccount();
        });


        getAccount();

        function getAccount() {
            Principal.identity().then(function (account) {
                vm.account = account;
                vm.isAuthenticated = Principal.isAuthenticated;
            });
        }

        vm.webTemplates = [];


        loadAllTemplates();

        TemplateService.subscribe($scope, function somethingChanged() {
            loadAllTemplates();
        });

        function loadAllTemplates() {
            var templates = TemplateService.all();
            if (templates.length > 3)
                vm.webTemplates = templates.slice(0, 3)
            else
                vm.webTemplates = templates;
        }

        function register() {
            $state.go('register');
        }
    }
})();
