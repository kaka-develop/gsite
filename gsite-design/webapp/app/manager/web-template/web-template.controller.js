(function() {
    'use strict';

    angular
        .module('gsiteApp')
        .controller('WebTemplateController', WebTemplateController);

    WebTemplateController.$inject = ['$scope', '$state', 'WebTemplate', 'AlertService', ];

    function WebTemplateController ($scope, $state, WebTemplate, AlertService ) {
        var vm = this;

        vm.webTemplates = [];
        vm.loadPage = loadPage;
        vm.page = 0;
        vm.links = {
            last: 0
        };
        vm.predicate = 'id';
        vm.reset = reset;
        vm.reverse = true;

        loadAll();

        function loadAll () {
            vm.webTemplates = WebTemplate.all();
        }

        function reset () {
           
        }

        function loadPage(page) {
           
        }
    }
})();
