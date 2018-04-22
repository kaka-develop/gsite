(function () {
    'use strict';

    angular
        .module('gsiteApp')
        .controller('MSongDialogController', MSongDialogController);

    MSongDialogController.$inject = ['$state', '$scope', 'entity'];

    function MSongDialogController($state, $scope, entity) {
        var vm = this;
        vm.song = entity;

        vm.submit = submit;
        vm.deleteItem = deleteItem;

        vm.stream = 'url';

        function submit() {
            if (getIndex(vm.item) < 0)
                vm.song.items.push(vm.item);
        }

        function getIndex(choice) {
            return vm.song.items.indexOf(vm.item);
        }

        function deleteItem(index) {
            vm.song.items.splice(index, 1);
        }
    }
})();