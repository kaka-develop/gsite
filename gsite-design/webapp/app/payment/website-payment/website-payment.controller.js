(function () {
    'use strict';

    angular
        .module('gsiteApp')
        .controller('WebsitePaymentController', WebsitePaymentController);

    WebsitePaymentController.$inject = ['$scope','AlertService'];

    function WebsitePaymentController($scope,AlertService) {
        var vm = this;
        
        vm.card = {
            number: null,
            type: null,
            fullName: null,
            lastName: null,
            month: null,
            year: null,
            cvv: null
        };

        vm.submit = submit;
        vm.paypal = paypal;
        
        function submit() {
            AlertService.info("Pay with credit card");
        }

        function paypal() {
             AlertService.info("Pay with PayPal account");
        }
       
    }
})();
