(function () {
    'use strict';
    angular
        .module('gsiteApp')
        .factory('User', User);

    User.$inject = [];

    function User() {
        var instance = {
            all: all,
            get: get,
            del: del,
            update: update,
            save: save
        };

        var list = [
            {
                id: 'user-01',
                login: 'google',
                firstName: 'Young',
                lastName: 'Kaka',
                email: 'kaka01@gmail.com',
                activated: true,
                lang: 'en',
                authorities: ['ROLE_USER','ROLE_ADMIN'],
                createdBy: 'System',
                createdDate: '2016-02-03',
                modifiedBy: 'System',
                modifiedDate: '2017-01-03'
            },
            {
                id: 'user-02',
                login: 'google',
                email: 'kaka01@gmail.com',
                activated: true,
                lang: 'en',
                authorities: ['ROLE_USER'],
                createdDate: '2016-02-03',
                lastModifiedBy: '',
                lastModifiedDate: '2017-01-03'
            }
        ];
        var hashMap = {};
        hashMap[list[0].id] = list[0];
        hashMap[list[1].id] = list[1];

        function all() {
            var items = [];
            for(var key in hashMap){
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

        function update(item){
            hashMap[item.id] = item;
        }

        return instance;
    }
})();