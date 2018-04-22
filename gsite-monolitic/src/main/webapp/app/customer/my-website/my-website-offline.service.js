(function () {
    'use strict';
    angular
        .module('gsiteApp')
        .factory('MyWebsiteOffline', MyWebsiteOffline);

    MyWebsiteOffline.$inject = ['$rootScope', '$state', 'MyWebsite', 'Principal', 'Website', 'MyWebsiteStorage'];

    function MyWebsiteOffline($rootScope, $state, MyWebsite, Principal, Website, MyWebsiteStorage) {
        var service = {
            subscribe: subscribe,
            all: all,
            updateWeb: updateWeb,
            deleteWeb: deleteWeb,
            refuse: refuse,
            loadAll: loadAll,
            reloadAll: reloadAll
        };
        var userLogin = null;
        var userEmail = null;
        var websites = [];

        function all() {
            return websites;
        }

        checkUser();

        function checkUser() {
            Principal.identity().then(function (account) {
                if (account) {
                    userLogin = account.login;
                    userEmail = account.email;
                    loadAll();
                }
            });
        }


        function reloadAll() {
            websites = [];
            checkUser();
        }

        function loadAll() {
            websites = [];
            MyWebsite.query({
                user_id: userLogin
            }, onSuccess);

            MyWebsite.share({
                user_email: userEmail
            }, onSuccess);
        }

        function onSuccess(result) {
            loadImages(result);
            websites = websites.concat(result);
            notify();
        }

        function loadImages(list) {
            for (var i = 0; i < list.length; i++) {
                var web = list[i];
                if (web.custom.homepage.mainImage != 'none') {
                    MyWebsiteStorage.loadImageForWebItem(userLogin, web.id, web, "mainImage.jpg");
                }
            }

        }

        function updateWeb(website) {
            MyWebsite.update(website, success);
            function success() {
                loadAll();
                $state.go("my-website");
            }
        }

        function deleteWeb(id) {
            Website.delete({
                id: id
            }, success);

            function success() {
                loadAll();
                $state.go("my-website");
                MyWebsiteStorage.deleteUserWebImageFolder(userLogin, id);
            }
        }

        function refuse(id) {
            Website.get({
                id: id
            }, function (web) {
                var index = web.sharedUsers.indexOf(userEmail);
                web.sharedUsers.splice(index, 1);
                Website.update(web, onRefuseSuccess);
            });
        }

        function onRefuseSuccess(result) {
            notify();
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

