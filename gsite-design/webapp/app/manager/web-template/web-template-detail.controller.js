(function() {
    'use strict';

    angular
        .module('gsiteApp')
        .controller('WebTemplateDetailController', WebTemplateDetailController);

    WebTemplateDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'entity', 'WebTemplate'];

    function WebTemplateDetailController($scope, $rootScope, $stateParams, entity, WebTemplate) {
        var vm = this;

        vm.webTemplate = entity;
     

    }
})();
