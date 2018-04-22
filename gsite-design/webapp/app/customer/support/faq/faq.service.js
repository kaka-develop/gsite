(function () {
    'use strict';
    angular
        .module('gsiteApp')
        .factory('FAQService', FAQService);

    FAQService.$inject = [];

    function FAQService() {
        var instance = {
            all: all,
            get: get
        };

        var list = [
            {
                id: '2as121a',
                title: 'What is the best feature ?',
                answer: 'Share web management'
            },
            {
                id: '2as121a',
                title: 'How I can create beautiful website ?',
                answer: 'Just get the beautiful template'
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

        return instance;
    }
})();