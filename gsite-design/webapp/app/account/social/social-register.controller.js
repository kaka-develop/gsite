(function() {
    'use strict';

    angular
        .module('gsiteApp')
        .controller('SocialRegisterController', SocialRegisterController);

    SocialRegisterController.$inject = [ '$stateParams'];

    function SocialRegisterController ($stateParams) {
        var vm = this;

        vm.success = true;
        vm.error = true;
        vm.provider = 'google';
   

    }
})();
