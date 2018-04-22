(function () {
    'use strict';

    angular
        .module('gsiteApp')
        .controller('FooterController', FooterController);

    FooterController.$inject = ['$state'];

    function FooterController($state) {
        var vm = this;

        vm.title = 'GSite (Beta)';
    }
})();