(function() {
    'use strict';

    angular
        .module('gsiteApp')
        .factory('Mail', Mail);

    Mail.$inject = ['$resource'];

    function Mail ($resource) {
        var service = $resource('api/mail', {}, {
            'share': { method: 'GET',
                url: 'api/mail/share'}
        });
        return service;
    }
})();
