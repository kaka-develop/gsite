(function () {
    'use strict';
    angular
        .module('gsiteApp')
        .factory('MyNotificationService', MyNotificationService);

    MyNotificationService.$inject = ['$rootScope','Principal','Notification'];

    function MyNotificationService($rootScope,Principal,Notification) {
        var instance = {
            all: all,
            del: del,
            subscribe: subscribe
        };

        var userId = null;

        var list = [];

        Principal.identity().then(function (account) {
            userId = account.id;
            loadAll(account.id);
        });


        function loadAll(userId) {
            Notification.mynotifications({
                userId: userId
            }, onSuccess, onError);

            function onSuccess(data) {
                list = data;
                notify();
            }

            function onError(error) {
                console.log(error);
            }
        }

        function all() {
            return list;
        }


        function del(id) {
            Notification.delete({id: id}, onSuccess, onError);
            function onSuccess(data) {
                notify();
            }
            function onError(error) {
                console.log(error);
            }
        }

        function subscribe(scope, callback) {
            var handler = $rootScope.$on('notifying-service-event', callback);
            scope.$on('$destroy', handler);
        }

        function notify() {
            $rootScope.$emit('notifying-service-event');
        }


        return instance;
    }
})();
