(function () {
    'use strict';

    angular
        .module('gsiteApp')
        .factory('Storage', Storage);

    Storage.$inject = ['$http'];

    function Storage($http) {

        var storageToken = "sHqhTAgPouAAAAAAAAACZd2ylvKjki_lxskKjwGaWh3Y3GdF-6il8ytpoJYlDNNO";
        var uploadUrl = "https://content.dropboxapi.com/2/files/alpha/upload";
        var getUrl = "https://api.dropboxapi.com/2/files/get_temporary_link";
        var deleteUrl = "https://api.dropboxapi.com/2/files/delete";

        var service = {
            getToken: getToken,
            getUploadUrl: getUploadUrl,
            getLoadUrl: getLoadUrl,
            getDeleteUrl: getDeleteUrl
        };

        function getToken() {
            return storageToken;
        }

        function getUploadUrl() {
            return uploadUrl;
        }

        function getLoadUrl() {
            return getUrl;
        }

        function getDeleteUrl() {
            return deleteUrl;
        }


        return service;
    }
})();
