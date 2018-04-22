(function () {
    'use strict';

    angular
        .module('gsiteApp')
        .controller('SidenavController', SidenavController);

    SidenavController.$inject = ['$state','$scope', 'ToolbarService', 'LoginService', 'Principal', 'ProfileService', 'LanguageService', '$location', '$anchorScroll'];

    function SidenavController($state, $scope,ToolbarService, LoginService, Principal, ProfileService, LanguageService, $location, $anchorScroll) {
        var vm = this;

        vm.toggleSidenav = ToolbarService.toggleSidenav();
        vm.showLoginDialog = LoginService.open;


        vm.isAuthenticated = Principal.isAuthenticated;

        vm.showLoginDialog = LoginService.open;
        vm.goFeatureSec = goFeatureSec;
        vm.goHomeSec = goHomeSec;
        vm.changeLanguage = changeLanguage;

        vm.username = null;
        vm.userEmail = null;

        ProfileService.getProfileInfo().then(function (response) {
            vm.inProduction = response.inProduction;
            vm.swaggerEnabled = response.swaggerEnabled;
        });

        function getUserInfo() {
            Principal.identity().then(function (user) {
                vm.userEmail = user.email;
                vm.userImage = user.imageURL;

                if (user.displayName != null)
                    vm.username = user.displayName;
                else if (user.firstName == null)
                    vm.username = user.login;
                else
                    vm.username = user.firstName + ' ' + user.lastName;

            });
        }

        Principal.subscribe($scope, function somethingChanged() {
            if (vm.isAuthenticated())
                getUserInfo();
        });


        function goFeatureSec() {
            vm.toggleSidenav();
            if ($state.current.name == 'home') {
                $location.hash('features');
                $anchorScroll();
            } else
                $state.go('home');

        }

        function goHomeSec() {
            vm.toggleSidenav();
            if ($state.current.name == 'home') {
                $location.hash('home');
                $anchorScroll();
            }
            else
                $state.go('home');
        }


        function changeLanguage() {
            LanguageService.changeLanguage(vm.langKey);
        }
    }
})();
