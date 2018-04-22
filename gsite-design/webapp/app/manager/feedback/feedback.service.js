(function () {
    'use strict';
    angular
        .module('gsiteApp')
        .factory('Feedback', Feedback);

    Feedback.$inject = [];

    function Feedback() {
        var instance = {
            all: all,
            get: get,
            del: del,
            update: update,
            save: save
        };
        var list = [
            {
                id: '2sa12a3',
                title: 'Performance',
                content: 'It is really fast',
                created: '2017-02-03',
                user_id: 'u-01'
            },
            {
                id: '35sa21s',
                title: 'Experience',
                content: 'Have great time',
                created: '2017-02-03',
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