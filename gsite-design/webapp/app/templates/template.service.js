(function () {
    'use strict';
    angular
        .module('gsiteApp')
        .factory('TemplateService', TemplateService);

    TemplateService.$inject = [];

    function TemplateService() {
        var instance = {
            all: all,
            get: get,
            del: del
        };

        var list = [
            {
                id: 'da121sas',
                name: 'Basic one',
                des: 'he titles of Washed Out breakthrough song and the first',
                price: 0,
                source: 'basic-template',
                image: 'temp-default',
                template_id: 'da121sas'
            },
            {
                id: 'da121sas',
                name: 'Latest one',
                des: 'he titles of Washed Out breakthrough song and the first',
                price: 0,
                source: 'latest-template',
                image: 'temp-default',
                template_id: 'da121sas'
            },
            {
                name: 'Beautiful one',
                price: 5,
                des: 'he titles of Washed Out breakthrough song and the first',
                source: 'beautiful-template',
                image: 'temp-default',
                template_id: 'da121sas'
            }
        ];

        var hashMap = {};
        hashMap[list[0].id] = list[0];
        hashMap[list[1].id] = list[1];
        hashMap[list[2].id] = list[2];

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