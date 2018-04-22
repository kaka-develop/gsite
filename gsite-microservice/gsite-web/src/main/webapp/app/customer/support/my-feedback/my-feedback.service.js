(function () {
    'use strict';
    angular
        .module('gsiteApp')
        .factory('MyFeedbackService', MyFeedbackService);

    MyFeedbackService.$inject = ['$rootScope', '$resource', 'Principal'];

    function MyFeedbackService($rootScope, $resource, Principal) {

        var resourceUrl = 'gsitecustomer/' +'api/myfeedbacks';
        var resource = $resource(resourceUrl, {}, {
            'all': {
                method: 'GET',
                isArray: true
            },
            'create': {method: 'POST'},
        });

        var instance = {
            all: all,
            add: add,
            subscribe: subscribe
        };

        var userId = null;

        var list = [];

        Principal.identity().then(function (account) {
            userId = account.id;
            loadAll(account.id);
        });


        function loadAll(userId) {
            resource.all({
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

        function add(feedback) {
            feedback.user_id = userId;
            resource.create(feedback, onSaveSuccess, onSaveError);

            function onSaveSuccess(result) {
                loadAll(userId);
            }

            function onSaveError(error) {
                console.log(error);
            }
        }

        function all() {
            return list;
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
