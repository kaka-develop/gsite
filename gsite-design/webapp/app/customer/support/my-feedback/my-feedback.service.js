(function () {
    'use strict';
    angular
        .module('gsiteApp')
        .factory('MyFeedbackService', MyFeedbackService);

    MyFeedbackService.$inject = [];

    function MyFeedbackService() {
        var instance = {
            all: all,
            get: get,
            del: del,
            add: add
        };

        var list = [
            {
                id: '2sa12a3',
                title: 'Performance',
                content: 'It is really fast'
            },
            {
                id: '35sa21s',
                title: 'Experience',
                content: 'Have great time'
            }
        ];

        var hashMap = {};
        hashMap[list[0].id] = list[0];
        hashMap[list[1].id] = list[1];

        function all() {
            return list;
        }

        function get(id) {
            return hashMap[id];
        }

        function del(id) {
            var index = getIndex(id);
            list.splice(index, 1);
            delete hashMap[id];
        }

        function getIndex(id) {
            var entity = hashMap[id];
            return list.indexOf(entity);
        }

        function add(entity){
            list.push(entity);
            hashMap[entity.id] = entity;
        }

        return instance;
    }
})();