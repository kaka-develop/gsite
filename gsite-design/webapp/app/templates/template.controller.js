(function () {
    'use strict';

    angular
        .module('gsiteApp')
        .controller('TemplateController', TemplateController);

    TemplateController.$inject = ['$scope','TemplateService'];

    function TemplateController($scope,TemplateService) {
        var vm = this;
        vm.currentPage = 0;

        vm.webTemplates = [];

        vm.webTemplates = TemplateService.all();

        // paging
        vm.paging = {
            total: 3,
            current: 1,
            onPageChanged: loadPages,
        };

        function loadPages() {
            vm.currentPage = vm.paging.current;
        }

    }
})();
