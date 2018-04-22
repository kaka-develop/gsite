(function () {
    'use strict';

    angular
        .module('gsiteApp')
        .controller('FAQController', FAQController);

    FAQController.$inject = ['$scope', 'FAQService'];

    function FAQController($scope, FAQService) {
        var vm = this;

        vm.faqs = [];

        loadAll();

        function loadAll() {
            vm.faqs = FAQService.all();
        }

        FAQService.subscribe($scope, function somethingChanged() {
            loadAll();
        });
    }
})();
