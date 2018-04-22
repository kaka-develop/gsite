(function () {
    'use strict';

    angular
        .module('gsiteApp')
        .controller('MFooterDialogController', MFooterDialogController);

    MFooterDialogController.$inject = ['$state', 'entity'];

    function MFooterDialogController($state, entity) {
        var vm = this;

        vm.footer = entity;
        vm.item = null;

        vm.submit = submit;
        vm.deleteItem = deleteItem;


        function submit() {
            if (getIndex(vm.choice) < 0)
                vm.footer.items.push(vm.item);
        }

        function getIndex(item) {
            return vm.footer.items.indexOf(item);
        }

        function deleteItem(index) {
            vm.footer.items.splice(index, 1);
        }
    }
})();