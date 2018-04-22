(function() {
    'use strict';

    angular
        .module('gsiteApp')
        .controller('WebsiteDetailController', WebsiteDetailController);

    WebsiteDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'entity', 'Website'];

    function WebsiteDetailController($scope, $rootScope, $stateParams, entity, Website) {
        var vm = this;

        vm.website = entity;
        
    }
})();
