(function() {
    'use strict';
    angular
        .module('gsiteApp')
        .factory('Notification', Notification);

    Notification.$inject = ['$resource', 'DateUtils'];

    function Notification ($resource, DateUtils) {
        var resourceUrl = 'gsitemanager/' + 'api/notifications/:id';

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
            'update': { method:'PUT' }
        });
    }
})();
