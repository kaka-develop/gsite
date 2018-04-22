(function () {
    'use strict';
    angular
        .module('gsiteApp')
        .factory('TemplateService', TemplateService);

    TemplateService.$inject = ['$rootScope','WebTemplate','TemplateStorage'];

    function TemplateService($rootScope,WebTemplate,TemplateStorage) {
        var instance = {
            all: all,
            subscribe: subscribe
        };

        var templates = [];

        loadAll();

        function all() {
            return templates;
        }

        function loadAll() {
            WebTemplate.query({}, onSuccess);
        }

        function onSuccess(data) {
            templates = data;
            notify();
            loadImages(templates);

        }

        function loadImages(webTemplates) {
            for (var i = 0; i < webTemplates.length; i++) {
                var template = webTemplates[i];
                if (template.image != null) {
                    TemplateStorage.loadImageForWebTemplateItem(template.id, template, "mainImage.jpg");
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
