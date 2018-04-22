(function () {
    'use strict';

    angular
        .module('gsiteApp')
        .controller('MyNotificationViewController', MyNotificationViewController);

    MyNotificationViewController.$inject = ['entity'];

    function MyNotificationViewController(entity) {
        var vm = this;

        vm.notification = entity;
        vm.notification.isRead = true;
    }
})();
