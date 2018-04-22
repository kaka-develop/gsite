(function () {
    'use strict';
    angular
        .module('gsiteApp')
        .factory('MyWebsiteOffline', MyWebsiteOffline);

    MyWebsiteOffline.$inject = ['$rootScope', '$state', 'MyWebsite', 'MyWebsiteStorage'];

    function MyWebsiteOffline($rootScope, $state, MyWebsite, MyWebsiteStorage) {
        var service = {
            subscribe: subscribe,
            all: all,
            allSharedWebsites: allSharedWebsites,
            update: update,
            updateWebViewAll: updateWebViewAll,
            deleteWeb: deleteWeb,
            refuse: refuse,
            loadAll: loadAll,
            checkUser: checkUser
        };
        var userId = null;
        var userEmail = null;
        var websites = [];
        var sharedWebsites = [];


        function all() {
            return websites;
        }

        function allSharedWebsites() {
            return sharedWebsites;
        }


        function checkUser(accountId, email) {
            userId = accountId;
            userEmail = email;
            loadAll();
        }


        function loadAll() {
            MyWebsite.query({
                user_id: userId
            }, onAllSuccess);

            function onAllSuccess(result) {
                loadImages(result);
                websites = result;
                notify();
            }

            MyWebsite.share({
                user_email: userEmail
            }, onShareSuccess);

            function onShareSuccess(result) {
                loadImages(result);
                sharedWebsites = result;
                notify();
            }
        }

        function loadImages(list) {
            for (var i = 0; i < list.length; i++) {
                var web = list[i];
                if (web.custom.homepage != null && web.custom.homepage.mainImage != null) {
                    MyWebsiteStorage.loadImageForWebItem(web.user_id, web.id, web, "mainImage.jpg");
                }
            }

        }

        function updateWebViewAll(website) {
            MyWebsite.update(website, success);
            function success() {
                loadAll();
                $state.go("my-website");
            }
        }

        function update(website) {
            MyWebsite.update(website, success);
            function success() {
                loadAll();
            }
        }

        function deleteWeb(id) {
            MyWebsite.delete({
                id: id
            }, success);

            function success() {
                loadAll();
                $state.go("my-website");
                MyWebsiteStorage.deleteUserWebImageFolder(userId, id);
            }
        }

        function refuse(id) {
            MyWebsite.get({
                id: id
            }, function (web) {
                var index = web.sharedUsers.indexOf(userEmail);
                web.sharedUsers.splice(index, 1);
                MyWebsite.update(web, onRefuseSuccess);
            });
        }

        function onRefuseSuccess(result) {
            loadAll();
        }


        function subscribe(scope, callback) {
            var handler = $rootScope.$on('notifying-service-event', callback);
            scope.$on('$destroy', handler);
        }

        function notify() {
            $rootScope.$emit('notifying-service-event');
        }


        return service;
    }
})();

