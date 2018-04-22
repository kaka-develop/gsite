(function () {
    'use strict';
    angular
        .module('gsiteApp')
        .factory('WebTemplate', WebTemplate);

    WebTemplate.$inject = [];

    function WebTemplate() {
        var instance = {
            all: all,
            get: get,
            del: del,
            update: update,
            save: save
        };

        var list = [
            {
                id: 'web-01',
                name: 'basic one',
                rating: 3,
                category: 'sport',
                source: 'basic-template',
                created: '2017-01-03'
            },
            {
                id: 'web-02',
                name: 'latest one',
                rating: 2,
                category: 'sport',
                source: 'latest-template',
                created: '2017-01-03'
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