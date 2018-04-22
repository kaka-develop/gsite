(function () {
    'use strict';
    angular
        .module('gsiteApp')
        .factory('MHomeService', MHomeService);

    MHomeService.$inject = [];

    function MHomeService() {

        var mainImageLink = null;
        var webId = null;
        var service = {
            setWebId: setWebId,
            getWebId: getWebId,
            loadImageLink: loadImageLink,
            getImageLink: getImageLink
        };

        function setWebId(id) {

        }

        function getWebId() {
            return webId;
        }

        function loadImageLink(link) {
            mainImageLink = link;
        }

        function getImageLink() {
            return mainImageLink;
        }

        return service;
    }
})();
