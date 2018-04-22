(function () {
    'use strict';
    angular
        .module('gsiteApp')
        .factory('MyNotificationService', MyNotificationService);

    MyNotificationService.$inject = ['$rootScope', 'Principal', '$resource'];

    function MyNotificationService($rootScope, Principal, $resource) {
        var resourceUrl = 'gsitecustomer/' + 'api/mynotifications';
        var resource = $resource(resourceUrl, {}, {
            'all': {
                method: 'GET',
                isArray: true
            },
            'delete':{method: 'DELETE'}
        });

        var instance = {
            all: all,
            del: del,
            subscribe: subscribe
        };

        var userEmail = null;

        var list = [];

        Principal.identity().then(function (account) {
            userEmail = account.email;
            loadAll(account.email);
        });


        function loadAll(userEmail) {
            resource.all({
                userEmail: userEmail
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
            resource.delete({
                id: id,
                userEmail: userEmail
            }, onSuccess, onError);

            function onSuccess(data) {
                loadAll(userEmail);
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
