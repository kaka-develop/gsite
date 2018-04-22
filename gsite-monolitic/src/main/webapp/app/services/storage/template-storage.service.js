(function () {
    'use strict';

    angular
        .module('gsiteApp')
        .factory('TemplateStorage', TemplateStorage);

    TemplateStorage.$inject = ['$http','Storage'];

    function TemplateStorage($http,Storage) {

        var storageToken = Storage.getToken();
        var uploadUrl = Storage.getUploadUrl();
        var getUrl = Storage.getLoadUrl();
        var deleteUrl = Storage.getDeleteUrl();

        var service = {
            uploadTemplateImage: uploadTemplateImage,
            getTemplateImage: getTemplateImage,
            deleteTemplateImage: deleteTemplateImage,
            loadImageForWebTemplateItem: loadImageForWebTemplateItem
        };

        function uploadTemplateImage(templateId,file,fileName) {
            var req = {
                method: 'POST',
                url: uploadUrl,
                headers: {
                    'Authorization': 'Bearer ' + storageToken,
                    'Content-Type': 'application/octet-stream',
                    'Dropbox-API-Arg': '{"path": "/api/images/templates/' + templateId + '/'  + fileName + '", "autorename": false,"mode":{".tag":"overwrite"}}'
                },
                data: file
            }

            return $http(req);
        }

        function getTemplateImage(templateId,fileName) {
            var req = {
                method: 'POST',
                url: getUrl,
                headers: {
                    'Authorization': 'Bearer ' + storageToken,
                    'Content-Type': 'application/json'
                },
                data: {
                    "path": "/api/images/templates/" + templateId + '/'  + fileName
                }
            }

            return $http(req);
        }

        function deleteTemplateImage(templateId,fileName) {
            var req = {
                method: 'POST',
                url: deleteUrl,
                headers: {
                    'Authorization': 'Bearer ' + storageToken,
                    'Content-Type': 'application/json'
                },
                data: {
                    "path": "/api/images/templates/" + templateId + '/'  + fileName
                }
            }

            return $http(req);
        }

        function loadImageForWebTemplateItem(templateId,item,fileName) {
            var req = {
                method: 'POST',
                url: getUrl,
                headers: {
                    'Authorization': 'Bearer ' + storageToken,
                    'Content-Type': 'application/json'
                },
                data: {
                    "path": "/api/images/templates/" + templateId + '/'  + fileName
                }
            }
            $http(req).success(function (response) {
                item['tempLink'] = response.link;
            });
        }


        return service;
    }
})();
