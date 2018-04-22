(function() {
    'use strict';

    angular
        .module('gsiteApp')
        .factory('WebTemplateSearch', WebTemplateSearch);

    WebTemplateSearch.$inject = ['$resource'];

    function WebTemplateSearch($resource) {
        var resourceUrl =  'api/_search/web-templates/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true}
        });
    }
})();
