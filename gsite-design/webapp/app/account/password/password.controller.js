(function() {
    'use strict';

    angular
        .module('gsiteApp')
        .controller('PasswordController', PasswordController);

    PasswordController.$inject = ['$state'];

    function PasswordController ($state) {
        var vm = this;
    }
})();
