(function () {
    'use strict';

    angular
        .module('gsiteApp')
        .controller('MSidenavListDialogController', MSidenavListDialogController);

    MSidenavListDialogController.$inject = ['$state', 'entity'];

    function MSidenavListDialogController($state, entity) {
        var vm = this;
        vm.list = entity;
        vm.choice = null;
        vm.icons = [];

        vm.submit = submit;
        vm.deleteChoice = deleteChoice;

        vm.icons = ['home','library_music','music_note', 'photo_library','photo'];

        function submit() {
            if (getIndex(vm.choice) < 0)
                vm.list.choices.push(vm.choice);
        }

        function getIndex(choice){
            return vm.list.choices.indexOf(choice);
        }

        function deleteChoice(index){
            vm.list.choices.splice(index,1);
        }
        
    }
})();