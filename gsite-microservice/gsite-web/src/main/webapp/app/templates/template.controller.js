(function () {
    'use strict';

    angular
        .module('gsiteApp')
        .controller('TemplateController', TemplateController);

    TemplateController.$inject = ['$scope', '$timeout','TemplateSearch', '$stateParams'];

    function TemplateController($scope, $timeout,TemplateSearch, $stateParams) {
        var vm = this;
        vm.currentPage = 0;

        vm.webTemplates = [];


        vm.currentSearch = 'name';
        vm.currentSort = 'name';
        vm.changeSearchType = changeSearchType;
        vm.changeSortType = changeSortType;

        loadTemplates();

        function loadTemplates() {
            vm.webTemplates = TemplateSearch.getTemplates();
        }

        TemplateSearch.subscribe($scope, function somethingChanged() {
            loadTemplates();
        });

        function changeSearchType() {
            TemplateSearch.setSearchType(vm.currentSearch);
        }

        function changeSortType() {
            TemplateSearch.setSortType(vm.currentSort);
        }

    }
})();
