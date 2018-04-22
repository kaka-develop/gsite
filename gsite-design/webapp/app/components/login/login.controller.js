(function() {
    'use strict';

    angular
        .module('gsiteApp')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$scope','LoginService'];

    function LoginController ($scope,LoginService) {
        var vm = this;
        vm.closeLoginDialog = LoginService.close();
    }
})();
