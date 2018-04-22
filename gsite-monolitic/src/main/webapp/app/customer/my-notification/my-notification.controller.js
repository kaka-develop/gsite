(function() {
    'use strict';

    angular
        .module('gsiteApp')
        .controller('MyNotificationController', MyNotificationController);

    MyNotificationController.$inject = ['$scope','MyNotificationService'];

    function MyNotificationController ($scope, MyNotificationService) {
        var vm = this;
        vm.notifications = [];

        vm.notifications = MyNotificationService.all();

        MyNotificationService.subscribe($scope, function somethingChanged() {
            vm.notifications = MyNotificationService.all();
        });
    }
})();
