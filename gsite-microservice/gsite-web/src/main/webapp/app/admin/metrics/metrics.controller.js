(function() {
    'use strict';

    angular
        .module('gsiteApp')
        .controller('MetricsMonitoringController', MetricsMonitoringController);

    MetricsMonitoringController.$inject = ['$scope','MetricsService'];

    function MetricsMonitoringController ($scope, MetricsService) {
        var vm = this;

        vm.metrics = {};
        vm.refresh = refresh;
        vm.servicesStats = {};
        vm.updatingMetrics = true;

        vm.refresh();

        $scope.$watch('vm.metrics', function (newValue) {
            vm.servicesStats = {};
            angular.forEach(newValue.timers, function (value, key) {
                if (key.indexOf('web.rest') !== -1 || key.indexOf('service') !== -1) {
                    vm.servicesStats[key] = value;
                }
            });

        });

        function refresh () {
            vm.updatingMetrics = true;
            MetricsService.getMetrics().then(function (promise) {
                vm.metrics = promise;
                vm.updatingMetrics = false;
            }, function (promise) {
                vm.metrics = promise.data;
                vm.updatingMetrics = false;
            });
        }



    }
})();
