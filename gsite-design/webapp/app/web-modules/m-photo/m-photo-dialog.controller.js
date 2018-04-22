(function () {
    'use strict';

    angular
        .module('gsiteApp')
        .controller('MPhotoDialogController', MPhotoDialogController);

    MPhotoDialogController.$inject = ['$state', 'entity'];

    function MPhotoDialogController($state, entity) {
        var vm = this;

        vm.photo = entity;

        vm.submit = submit;
        vm.deleteItem = deleteItem;

        vm.stream = 'url';

        function submit() {
            if (getIndex(vm.item) < 0)
                vm.photo.items.push(vm.item);
        }

        function getIndex(choice) {
            return vm.photo.items.indexOf(vm.item);
        }

        function deleteItem(index) {
            vm.photo.items.splice(index, 1);
        }
    }
})();