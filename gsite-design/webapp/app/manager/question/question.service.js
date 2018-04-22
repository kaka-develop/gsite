(function () {
    'use strict';
    angular
        .module('gsiteApp')
        .factory('Question', Question);

    Question.$inject = [];

    function Question() {
        var instance = {
            all: all,
            get: get,
            del: del,
            update: update,
            save: save
        };

        var list = [
            {
                id: '2as121a',
                title: 'What is the best feature ?',
                answer: 'Share web management',
                created: '2017-02-13',
                user_id: 'u-01'
            },
            {
                id: '2as121a',
                title: 'How I can create beautiful website ?',
                answer: 'Just get the beautiful template',
                created: '2017-02-13',
                user_id: 'u-02'
            }
        ];


        var hashMap = {};
        hashMap[list[0].id] = list[0];
        hashMap[list[1].id] = list[1];

        function all() {
            var items = [];
            for (var key in hashMap) {
                items.push(hashMap[key]);
            }
            return items;
        }

        function get(id) {
            return hashMap[id];
        }

        function del(id) {
            delete hashMap[id];
        }

        function add(item) {
            var size = Object.keys(hashMap).length;
            item.id = 'user-' + size;
            hashMap[item.id] = item;
        }

        function save(item) {
            add(item);
        }

        function update(item) {
            hashMap[item.id] = item;
        }

        return instance;
    }
})();