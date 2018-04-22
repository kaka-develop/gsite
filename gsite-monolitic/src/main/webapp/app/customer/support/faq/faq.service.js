(function () {
    'use strict';
    angular
        .module('gsiteApp')
        .factory('FAQService', FAQService);

    FAQService.$inject = ['$rootScope','Question'];

    function FAQService($rootScope,Question) {
        var instance = {
            all: all,
            subscribe: subscribe
        };

        var list = [];

        loadAll();


        function loadAll() {
            Question.faq({}, onSuccess, onError);

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
