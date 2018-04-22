(function () {
    'use strict';

    angular
        .module('gsiteApp')
        .controller('MBasicInfoController', MBasicInfoController);

    MBasicInfoController.$inject = ['entity'];

    function MBasicInfoController(entity) {
        var vm = this;

        vm.basicInfo = entity;

        if (vm.basicInfo == null)
            loadDefault();


        function loadDefault() {
            vm.basicInfo = {
                isEnable: true,
                firstName: 'first name',
                lastName: 'last name',
                email: 'email@gmail.com',
                age: 21,
                des: 'description'
            };
        }


    }
})();
