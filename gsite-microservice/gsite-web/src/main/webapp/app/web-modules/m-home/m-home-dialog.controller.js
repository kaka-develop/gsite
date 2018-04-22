(function () {
    'use strict';

    angular
        .module('gsiteApp')
        .controller('MHomeDialogController', MHomeDialogController);

    MHomeDialogController.$inject = [ 'entity', 'Principal', 'MyWebsiteStorage','webId'];

    function MHomeDialogController( entity, Principal, MyWebsiteStorage, webId) {
        var vm = this;

        vm.homepage = entity;
        var fileName = 'mainImage.jpg';
        var userId = null;

        vm.loading = false;

        vm.upload = upload;

        Principal.identity().then(function (user) {
            userId = user.id;
            getMainImage();
        });


        function upload(file) {
            if (file != null) {
                vm.loading = true;
                MyWebsiteStorage.uploadUserWebImage(userId, webId, file, fileName).then(onSuccess, onError);
            }

            function onSuccess(response) {
                vm.loading = false;
                vm.homepage.mainImage = fileName;
            }

            function onError(response) {
                vm.loading = false;
                console.log(response);
            }
        }

        function getMainImage() {
            if (vm.homepage.mainImage == null)
                return;
            if(vm.homepage.tempImageLink != null)
                return;

            MyWebsiteStorage.getUserWebImage(userId, webId, fileName).then(onSuccess, onError);
            function onSuccess(response) {
                vm.homepage.tempImageLink = response.data.link;
            }

            function onError(response) {
                console.log(response);
            }
        }


    }
})();
