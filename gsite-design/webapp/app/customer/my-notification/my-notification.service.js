(function () {
    'use strict';
    angular
        .module('gsiteApp')
        .factory('MyNotificationService', MyNotificationService);

    MyNotificationService.$inject = [];

    function MyNotificationService() {
        var instance = {
            all: all,
            get: get,
            del: del
        };

        var list = [
            {
                id: 'sad12sa1',
                title: 'Best off',
                content: '3 days for free templates. Check it out immediately',
                isRead: false
            },
            {
                id: 'sad12sab51',
                title: 'New templates',
                content: 'A awesome template just comes out. It is free',
                isRead: true
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
            var web = hashMap[id];
            return list.indexOf(web);
        }

        return instance;
    }
})();