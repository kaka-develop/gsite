(function () {
    'use strict';
    angular
        .module('gsiteApp')
        .factory('MyQuestionService', MyQuestionService);

    MyQuestionService.$inject = ['$rootScope','Question', 'Principal'];

    function MyQuestionService($rootScope,Question, Principal) {
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
            Question.myquestion({
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

        function add(question) {
            question.user_id = userId;
            Question.save(question, onSaveSuccess, onSaveError);

            function onSaveSuccess (result) {
                loadAll(userId);
            }

            function onSaveError (error) {
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
