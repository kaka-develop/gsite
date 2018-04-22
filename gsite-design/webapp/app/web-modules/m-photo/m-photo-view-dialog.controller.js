(function () {
    'use strict';

    angular
        .module('gsiteApp')
        .controller('MPhotoViewDialogController', MPhotoViewDialogController);

    MPhotoViewDialogController.$inject = ['$state', 'entity'];

    function MPhotoViewDialogController($state, entity) {
        var vm = this;

        vm.photo = entity;
        if (vm.photo == null)
            loadDefault();


        function loadDefault() {
            vm.photo = {
                title: 'best photo',
                url: 'content/images/content/images/photos/kaka-photo.jpg'
            };
        }
    }
})();