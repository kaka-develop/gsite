(function () {
    'use strict';

    angular
        .module('gsiteApp')
        .controller('MPhotoDialogController', MPhotoDialogController);

    MPhotoDialogController.$inject = ['entity', 'Principal', 'MyWebsiteStorage', 'webId'];

    function MPhotoDialogController(entity, Principal, MyWebsiteStorage, webId) {
        var vm = this;

        vm.photo = entity;

        vm.submit = submit;
        vm.deleteItem = deleteItem;

        var userLogin = null;
        vm.loading = false;
        vm.photoFile = null;

        vm.item = {
            title: null,
            artist: null,
            url: null
        };

        vm.upload = upload;

        Principal.identity().then(function (user) {
            userLogin = user.login;
        });

        function reset() {
            vm.item = {
                name: null,
                des: null,
                url: null
            };
            vm.photoFile = null;
            vm.loading = false;
        }


        function submit() {
            if (!isExisted(vm.item)) {
                uploadPhoto();
            }
        }

        function isExisted(item) {
            for (var i = 0; i < vm.photo.items.length; i++) {
                var photo = vm.photo.items[i];
                if (photo.name == item.name)
                    return true;
            }
            return false;
        }

        function deleteItem(index) {
            var fileName = vm.photo.items[index].url;
            vm.loading = true;
            MyWebsiteStorage.deleteUserWebImage(userLogin, webId, fileName).then(onSuccess, onError);

            function onSuccess(response) {
                vm.photo.items.splice(index, 1);
                reset();
            }

            function onError(response) {
                reset();
            }


        }


        function upload(file) {
            if (file != null) {
                vm.item.url = file.name;
                vm.item.name = file.name.split('.')[0];
            }
        }

        function uploadPhoto() {
            if (vm.photoFile != null) {
                vm.loading = true;
                MyWebsiteStorage.uploadUserWebImage(userLogin, webId, vm.photoFile, vm.item.url).then(onSuccess, onError);
            }

            function onSuccess(response) {
                vm.photo.items.push(vm.item);
                reset();
            }

            function onError(response) {
                reset();
            }
        }

    }
})();
