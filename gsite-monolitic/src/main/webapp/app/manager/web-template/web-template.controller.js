(function () {
    'use strict';

    angular
        .module('gsiteApp')
        .controller('WebTemplateController', WebTemplateController);

    WebTemplateController.$inject = [ 'WebTemplate', 'AlertService'];

    function WebTemplateController( WebTemplate, AlertService) {
        var vm = this;

        vm.webTemplates = [];

        loadAll();
        function loadAll() {
            WebTemplate.query({}, onSuccess, onError);

            function onSuccess(data) {
                vm.webTemplates = data;
            }

            function onError(error) {
                AlertService.error(error.data.message);
            }
        }

    }
})();
