(function () {
    'use strict';
    angular
        .module('gsiteApp')
        .factory('MHomeService', MHomeService);

    MHomeService.$inject = [];

    function MHomeService() {

        var mainImageLink = null;
        var service = {
            loadImageLink: loadImageLink,
            getImageLink: getImageLink
        };

        function loadImageLink(link) {
            mainImageLink = link;
        }

        function getImageLink() {
            return mainImageLink;
        }

        return service;
    }
})();
