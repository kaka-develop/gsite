(function () {
    'use strict';

    angular
        .module('gsiteApp')
        .controller('NotificationController', NotificationController);

    NotificationController.$inject = ['Notification', 'AlertService'];

    function NotificationController(Notification, AlertService) {
        var vm = this;

        vm.notifications = [];

        loadAll();

        function loadAll() {
            Notification.query({}, onSuccess, onError);


            function onSuccess(data) {
                vm.notifications = data;
            }

            function onError(error) {
                AlertService.error(error.data.message);
            }
        }


    }
})();
