(function() {
    'use strict';

    angular
        .module('gsiteApp')
        .controller('RegisterController', RegisterController);

    RegisterController.$inject = ['$scope','LoginService'];

    function RegisterController ($scope,LoginService) {
        var vm = this;
        vm.showLoginDialog = LoginService.open();
    }
})();
