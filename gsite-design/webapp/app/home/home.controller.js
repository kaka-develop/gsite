(function () {
    'use strict';

    angular
        .module('gsiteApp')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['$scope','TemplateService'];

    function HomeController($scope,TemplateService) {
        var vm = this;

        vm.webTemplates = [];
        vm.webTemplates = TemplateService.all();
    }
})();
