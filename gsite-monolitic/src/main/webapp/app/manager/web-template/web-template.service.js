(function() {
    'use strict';
    angular
        .module('gsiteApp')
        .factory('WebTemplate', WebTemplate);

    WebTemplate.$inject = ['$resource'];

    function WebTemplate ($resource) {
        var resourceUrl =  'api/web-templates/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    if (data) {
                        data = angular.fromJson(data);
                    }
                    return data;
                }
            },
            'update': { method:'PUT' },
            'search': {method: 'GET', url: 'api/_search/web-templates/:id', isArray: true}
        });
    }
})();
