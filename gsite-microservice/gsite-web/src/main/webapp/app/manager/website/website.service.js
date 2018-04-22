(function() {
    'use strict';
    angular
        .module('gsiteApp')
        .factory('Website', Website);

    Website.$inject = ['$resource', 'DateUtils'];

    function Website ($resource, DateUtils) {
        var resourceUrl =  'gsitemanager/' +'api/websites/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    if (data) {
                        data = angular.fromJson(data);
                        data.created = DateUtils.convertDateTimeFromServer(data.created);
                    }
                    return data;
                }
            },
            'update': { method:'PUT' },
            'domain': {method: 'GET', url: 'gsitemanager/' +'api/websites/domain'}
        });
    }
})();
