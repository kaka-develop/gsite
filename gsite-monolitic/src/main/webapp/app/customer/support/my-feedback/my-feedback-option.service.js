(function () {
    'use strict';
    angular
        .module('gsiteApp')
        .factory('MyFeedbackOptionService', MyFeedbackOptionService);

    MyFeedbackOptionService.$inject = [];

    function MyFeedbackOptionService() {
        var instance = {
            all: all,
            get: get,
            del: del,
            add: add
        };

        var list = [
            {
                title: 'Performance',
                options: ['It is quite fast','Sometime slow','It is okay']
            },
             {
                title: 'Experience',
                options: ['It is quite convenient','Sometime it is laggy','It is okay']
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