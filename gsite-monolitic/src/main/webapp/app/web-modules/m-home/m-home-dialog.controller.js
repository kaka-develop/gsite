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
        var userLogin = null;

        vm.loading = false;

        vm.upload = upload;

        Principal.identity().then(function (user) {
            userLogin = user.login;
            getMainImage();
        });


        function upload(file) {
            if (file != null) {
                vm.loading = true;
                MyWebsiteStorage.uploadUserWebImage(userLogin, webId, file, fileName).then(onSuccess, onError);
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
            if (vm.homepage.mainImage == 'none')
                return;
            if(vm.homepage.tempImageLink != null)
                return;

            MyWebsiteStorage.getUserWebImage(userLogin, webId, fileName).then(onSuccess, onError);
            function onSuccess(response) {
                vm.homepage.tempImageLink = response.data.link;
            }

            function onError(response) {
                console.log(response);
            }
        }


    }
})();
