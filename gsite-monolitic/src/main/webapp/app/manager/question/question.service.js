(function() {
    'use strict';
    angular
        .module('gsiteApp')
        .factory('Question', Question);

    Question.$inject = ['$resource', 'DateUtils'];

    function Question ($resource, DateUtils) {
        var resourceUrl =  'api/questions/:id';

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
            'myquestion': {method: 'GET', url: 'api/myquestions',isArray: true},
            'faq': {method: 'GET', url: 'api/faq',isArray: true}
        });
    }
})();
