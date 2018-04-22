(function() {
    'use strict';

    angular
        .module('gsiteApp')
        .controller('FAQController', FAQController);

    FAQController.$inject = ['$scope','FAQService'];

    function FAQController ($scope,FAQService) {
        var vm = this;

        vm.faqs = [];

        vm.faqs = FAQService.all();

        FAQService.subscribe($scope, function somethingChanged() {
            vm.faqs = FAQService.all();
        });
    }
})();
