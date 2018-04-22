(function () {
    'use strict';

    angular
        .module('gsiteApp')
        .factory('MyWebsiteStorage', MyWebsiteStorage);

    MyWebsiteStorage.$inject = ['$http','Storage'];

    function MyWebsiteStorage($http,Storage) {

        var storageToken = Storage.getToken();
        var uploadUrl = Storage.getUploadUrl();
        var getUrl = Storage.getLoadUrl();
        var deleteUrl = Storage.getDeleteUrl();

        var service = {
            uploadUserWebImage: uploadUserWebImage,
            getUserWebImage: getUserWebImage,
            getUserWebSong: getUserWebSong,
            uploadUserWebSong: uploadUserWebSong,
            deleteUserWebImage: deleteUserWebImage,
            deleteUserWebSong: deleteUserWebSong,
            deleteUserWebImageFolder: deleteUserWebImageFolder,
            loadImageForWebItem: loadImageForWebItem,
            loadSongForWebItem: loadSongForWebItem
        };

        function uploadUserWebImage(userId,webId,file,fileName) {
            var req = {
                method: 'POST',
                url: uploadUrl,
                headers: {
                    'Authorization': 'Bearer ' + storageToken,
                    'Content-Type': 'application/octet-stream',
                    'Dropbox-API-Arg': '{"path": "/api/images/' + userId + '/' + webId + '/'  + fileName + '", "autorename": false,"mode":{".tag":"overwrite"}}'
                },
                data: file
            }

            return $http(req);
        }

        function uploadUserWebSong(userId,webId,file,fileName) {
            var req = {
                method: 'POST',
                url: uploadUrl,
                headers: {
                    'Authorization': 'Bearer ' + storageToken,
                    'Content-Type': 'application/octet-stream',
                    'Dropbox-API-Arg': '{"path": "/api/songs/' + userId + '/' + webId + '/'  + fileName + '", "autorename": false,"mode":{".tag":"overwrite"}}'
                },
                data: file
            }

            return $http(req);
        }

        function getUserWebImage(userId,webId, fileName) {
            var req = {
                method: 'POST',
                url: getUrl,
                headers: {
                    'Authorization': 'Bearer ' + storageToken,
                    'Content-Type': 'application/json'
                },
                data: {
                    "path": "/api/images/" + userId + '/' + webId + '/' + fileName
                }
            }
            return $http(req);
        }

        function getUserWebSong(userId,webId, fileName) {
            var req = {
                method: 'POST',
                url: getUrl,
                headers: {
                    'Authorization': 'Bearer ' + storageToken,
                    'Content-Type': 'application/json'
                },
                data: {
                    "path": "/api/songs/" + userId + '/' + webId + '/' + fileName
                }
            }

            return $http(req);
        }

        function deleteUserWebImageFolder(userId,webId) {
            var req = {
                method: 'POST',
                url: deleteUrl,
                headers: {
                    'Authorization': 'Bearer ' + storageToken,
                    'Content-Type': 'application/json'
                },
                data: {
                    "path": "/api/images/" + userId + '/' + webId
                }
            }
            return  $http(req);
        }

        function deleteUserWebImage(userId,webId,fileName) {
            var req = {
                method: 'POST',
                url: deleteUrl,
                headers: {
                    'Authorization': 'Bearer ' + storageToken,
                    'Content-Type': 'application/json'
                },
                data: {
                    "path": "/api/images/" + userId + '/' + webId + '/' + fileName
                }
            }

            return $http(req);
        }

        function deleteUserWebSong(userId,webId,fileName) {
            var req = {
                method: 'POST',
                url: deleteUrl,
                headers: {
                    'Authorization': 'Bearer ' + storageToken,
                    'Content-Type': 'application/json'
                },
                data: {
                    "path": "/api/songs/" + userId + '/' + webId + '/' + fileName
                }
            }

            return $http(req);
        }

        function loadImageForWebItem(userId, webId, item, fileName) {
            var req = {
                method: 'POST',
                url: getUrl,
                headers: {
                    'Authorization': 'Bearer ' + storageToken,
                    'Content-Type': 'application/json'
                },
                data: {
                    "path": "/api/images/" + userId + '/' + webId + '/' + fileName
                }
            }
            $http(req).success(function (response) {
                item['tempLink'] = response.link;
            });
        }

        function loadSongForWebItem(userId, webId, item, fileName) {
            var req = {
                method: 'POST',
                url: getUrl,
                headers: {
                    'Authorization': 'Bearer ' + storageToken,
                    'Content-Type': 'application/json'
                },
                data: {
                    "path": "/api/songs/" + userId + '/' + webId + '/' + fileName
                }
            }
            $http(req).success(function (response) {
                item['tempLink'] = response.link;
            });
        }


        return service;
    }
})();
