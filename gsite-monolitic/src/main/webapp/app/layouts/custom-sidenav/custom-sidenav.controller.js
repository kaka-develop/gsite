(function () {
    'use strict';

    angular
        .module('gsiteApp')
        .controller('CustomSidenavController', CustomSidenavController);

    CustomSidenavController.$inject = ['$state', '$scope', 'Principal', 'ProfileService', 'LoginService', '$location', '$anchorScroll'];

    function CustomSidenavController($state, $scope, Principal, ProfileService, LoginService, $location, $anchorScroll) {
        var vm = this;

        vm.isAuthenticated = Principal.isAuthenticated;

        vm.showLoginDialog = LoginService.open;
        vm.goFeatureSec = goFeatureSec;
        vm.goHomeSec = goHomeSec;
        vm.goTemplateSec = goTemplateSec;

        vm.username = null;
        vm.userEmail = null;
        vm.userImage = null;

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
            $location.hash('features');
            $anchorScroll();
        }

        function goHomeSec() {
            if ($state.current.name == 'home') {
                $location.hash('home');
                $anchorScroll();
            }
            else
                $state.go('home');
        }

        function goTemplateSec() {
            if ($state.current.name == 'home') {
                $location.hash('templates');
                $anchorScroll();
            }
            else
                $state.go('template');
        }


    }
})();
