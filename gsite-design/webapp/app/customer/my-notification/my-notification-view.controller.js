(function () {
    'use strict';

    angular
        .module('gsiteApp')
        .controller('MyNotificationViewController', MyNotificationViewController);

    MyNotificationViewController.$inject = ['$scope','entity'];

    function MyNotificationViewController($scope, entity) {
        var vm = this;
        
        vm.notification = entity;
        vm.notification.isRead = true;
    }
})();
