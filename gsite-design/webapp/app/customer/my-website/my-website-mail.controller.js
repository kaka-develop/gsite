(function() {
    'use strict';

    angular
        .module('gsiteApp')
        .controller('MyWebsiteMailController', MyWebsiteMailController);

    MyWebsiteMailController.$inject = ['$scope','AlertService','entity'];

    function MyWebsiteMailController ($scope,AlertService, entity) {
        var vm = this;
        
        vm.website = entity;
        vm.emails = [];
        vm.sendEmail = sendEmail;
        vm.deleteEmail = deleteEmail;

        vm.emails = vm.website.sharedUsers;

        function sendEmail(email) {
            if(getIndex(email) < 0){
                vm.emails.push(email);
                AlertService.success("Send successfully!")
            }else
            AlertService.error("Email is already sent!")
        }

        function getIndex(email){
            return vm.emails.indexOf(email);
        }

        function deleteEmail(index){
            return vm.emails.splice(index,1);
        }

    }
})();
