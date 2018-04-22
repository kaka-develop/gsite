(function () {
    'use strict';

    angular
        .module('gsiteApp')
        .controller('ToolbarController', ToolbarController);

    ToolbarController.$inject = ['$state', '$timeout', 'ToolbarService', 'LanguageService', 'LoginService', 'Principal', 'TemplateSearch'];

    function ToolbarController($state, $timeout, ToolbarService, LanguageService, LoginService, Principal, TemplateSearch) {

        var vm = this;
        vm.toggleSidenav = ToolbarService.toggleSidenav();
        vm.showLoginDialog = LoginService.open;
        vm.isAuthenticated = Principal.isAuthenticated;
        vm.search = search;
        vm.predicate = 'name';

        vm.changeEnglish = changeEnglish;
        vm.changeVietnam = changeVietnam;

        function search() {
            $timeout(function () {
                angular.element('#searchInput').focus();
            });

            TemplateSearch.search(vm.searchText);
            checkState();
        }

        function checkState() {
            if ($state.current.name != 'template')
                $state.go('template');
        }

        function changeEnglish() {
            LanguageService.changeLanguage('en');
        }

        function changeVietnam() {
            LanguageService.changeLanguage('vi');
        }
    }

})();
