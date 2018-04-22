(function() {
    'use strict';
    angular
        .module('gsiteApp')
        .factory('Feedback', Feedback);

    Feedback.$inject = ['$resource', 'DateUtils'];

    function Feedback ($resource, DateUtils) {
        var resourceUrl =  'gsitemanager/' +'api/feedbacks/:id';

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
