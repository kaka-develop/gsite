(function () {
    'use strict';

    angular
        .module('gsiteApp')
        .controller('MSongDialogController', MSongDialogController);

    MSongDialogController.$inject = ['entity', 'Principal', 'MyWebsiteStorage', 'webId'];

    function MSongDialogController(entity, Principal, MyWebsiteStorage, webId) {
        var vm = this;
        vm.song = entity;

        vm.submit = submit;
        vm.deleteItem = deleteItem;
        var userId = null;
        vm.loading = false;
        vm.songFile = null;

        vm.item = {
            title: null,
            artist: null,
            date: new Date(),
            url: null
        };

        vm.upload = upload;

        Principal.identity().then(function (user) {
            userId = user.id;
        });

        function reset() {
            vm.item = {
                title: null,
                artist: null,
                url: null
            };
            vm.songFile = null;
            vm.loading = false;
        }

        function submit(item) {
            if (!isExisted(item)) {
                uploadSong();
            }
        }

        function isExisted(item) {
            for (var i = 0; i < vm.song.items.length; i++) {
                var song = vm.song.items[i];
                if (song.title == item.title)
                    return true;
            }
            return false;
        }

        function deleteItem(index) {
            var fileName = vm.song.items[index].url;
            vm.loading = true;
            MyWebsiteStorage.deleteUserWebSong(userId, webId, fileName).then(onSuccess, onError);
            function onSuccess(response) {
                vm.song.items.splice(index, 1);
                reset();
            }

            function onError(response) {
                reset();
            }

        }

        function upload(file) {
            if (file != null) {
                vm.item.url = file.name;
                vm.item.title = file.name.split('.')[0];
            }
        }

        function uploadSong() {
            if (vm.songFile != null) {
                vm.loading = true;
                vm.song.items.push(vm.item);
                MyWebsiteStorage.uploadUserWebSong(userId, webId, vm.songFile, vm.item.url).then(onSuccess, onError);
            }

            function onSuccess(response) {
                reset();
            }

            function onError(response) {
                reset();
            }
        }
    }
})();
