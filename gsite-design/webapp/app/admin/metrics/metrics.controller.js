(function () {
    'use strict';

    angular
        .module('gsiteApp')
        .controller('MetricsMonitoringController', MetricsMonitoringController);

    MetricsMonitoringController.$inject = ['$scope', '$state', 'MetricsService'];

    function MetricsMonitoringController($scope, $state, MetricsService) {
        var vm = this;

        vm.metrics = {};
        vm.refresh = refresh;
        vm.refreshThreadDumpData = refreshThreadDumpData;
        vm.servicesStats = {};
        vm.updatingMetrics = true;

        vm.refresh();



        function refresh() {

        }

        function refreshThreadDumpData() {

        }


    }
})();