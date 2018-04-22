(function () {
    'use strict';

    angular
        .module('gsiteApp')
        .controller('MPhotoController', MPhotoController);

    MPhotoController.$inject = ['MPhotoService'];

    function MPhotoController(MPhotoService) {
        var vm = this;

        vm.photos = MPhotoService.getList();

        vm.viewAt = viewAt;


        function viewAt(index) {
            MPhotoService.viewAt(index);
        }
    }
})();
