(function () {
    'use strict';

    angular
        .module('gsiteApp')
        .controller('CustomSidenavController', CustomSidenavController);

    CustomSidenavController.$inject = ['$state', '$scope', 'Principal', 'LoginService', '$location', '$anchorScroll'];

    function CustomSidenavController($state, $scope, Principal, LoginService, $location, $anchorScroll) {
        var vm = this;

        vm.isAuthenticated = Principal.isAuthenticated;

        vm.showLoginDialog = LoginService.open;
        vm.goFeatureSec = goFeatureSec;
        vm.goHomeSec = goHomeSec;
        vm.goTemplateSec = goTemplateSec;

        vm.username = null;
        vm.userEmail = null;
        vm.userImage = null;

        getUserInfo();

        function getUserInfo() {
            Principal.identity().then(function (user) {
                if (user == null)
                    return;
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
            } else
                $state.go('home');
        }

        function goTemplateSec() {
            if ($state.current.name == 'home') {
                $location.hash('templates');
                $anchorScroll();
            } else
                $state.go('template');
        }


    }
})();
