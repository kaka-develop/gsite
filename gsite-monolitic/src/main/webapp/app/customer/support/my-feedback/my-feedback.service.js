(function () {
    'use strict';
    angular
        .module('gsiteApp')
        .factory('MyFeedbackService', MyFeedbackService);

    MyFeedbackService.$inject = ['$rootScope','Feedback', 'Principal'];

    function MyFeedbackService($rootScope,Feedback, Principal) {
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
            Feedback.myfeedback({
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
            Feedback.save(feedback, onSaveSuccess, onSaveError);

            function onSaveSuccess (result) {
                loadAll(userId);
            }

            function onSaveError (error) {
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
