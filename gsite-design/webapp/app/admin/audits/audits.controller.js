(function () {
    'use strict';

    angular
        .module('gsiteApp')
        .controller('AuditsController', AuditsController);

    AuditsController.$inject = ['$filter','$state', 'AuditsService'];

    function AuditsController($filter,$state, AuditsService) {
        var vm = this;

        vm.audits = null;
        vm.fromDate = null;
        vm.links = null;
        vm.loadPage = loadPage;
        vm.onChangeDate = onChangeDate;
        vm.page = 1;
        vm.previousMonth = previousMonth;
        vm.toDate = null;
        vm.today = today;
        vm.totalItems = null;

        vm.today();
        vm.previousMonth();
        vm.onChangeDate();

        function onChangeDate() {

        }

        // Date picker configuration
        function today() {
            // Today + 1 day - needed if the current day must be included

        }

        function previousMonth() {

        }

        function loadPage(page) {

        }
    }
})();