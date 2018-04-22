(function () {
    'use strict';

    angular
        .module('gsiteApp')
        .factory('TemplateSearch', TemplateSearch);

    TemplateSearch.$inject = ['$rootScope', 'WebTemplate','TemplateStorage'];

    function TemplateSearch($rootScope, WebTemplate,TemplateStorage) {
        var searchType = 'name';
        var sortType = 'name';
        var searchText = null;
        var templates = [];

        var instance = {
            subscribe: subscribe,
            search: search,
            getTemplates: getTemplates,
            setSortType: setSortType,
            setSearchType: setSearchType
        };

        loadAll();

        function getTemplates() {
            return templates;
        }

        function setSortType(type) {
            sortType = type;
        }

        function setSearchType(type) {
            searchType = type;
        }

        function search(text) {
            if (text) {
                WebTemplate.search({
                    query: text,
                    field: searchType,
                    sort: sort
                }, onSuccess);
                searchText = text;
            } else
                loadAll();
        }


        function loadAll() {
            WebTemplate.query({
                sort: sort()
            }, onSuccess);
        }

        function sort() {
            var result = [sortType + ',' + ('asc')];
            if (sortType !== 'id') {
                result.push('id');
            }
            return result;
        }

        function onSuccess(data) {
            templates = data;
            loadImages(templates);
            notify();
        }

        function loadImages(webTemplates) {
            for (var i = 0; i < webTemplates.length; i++) {
                var template  = webTemplates[i];
                if(template.image  != null){
                    TemplateStorage.loadImageForWebTemplateItem(template.id,template,"mainImage.jpg");
                }
            }

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
