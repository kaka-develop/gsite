(function () {
    'use strict';

    angular
        .module('gsiteApp')
        .controller('WebsitePaymentController', WebsitePaymentController);

    WebsitePaymentController.$inject = ['entity','$state','WebsitePayment','$window','MyWebsite','AlertService'];

    function WebsitePaymentController( entity, $state, WebsitePayment, $window, MyWebsite, AlertService) {
        var vm = this;

        if(entity == null) {
            $state.go("template");
            return;
        }
        vm.website = entity;

        vm.buyNow = buyNow;
        vm.buyWithCard = buyWithCard;
        vm.card = {
            number: null,
            type: null,
            firstName: null,
            lastName: null,
            month: null,
            year: null,
            cvv: null
        };

        function buyNow() {
            vm.isPaying = true;
            WebsitePayment.create({
                webId: vm.website.id
            },null, onSuccess);

            function onSuccess(data) {
                $window.location.href  = data.approval_link;
            }
        }

        function buyWithCard() {
            vm.isPaying = true;
            WebsitePayment.card({
                webId: vm.website.id,
                number: vm.card.number,
                type: vm.card.type,
                firstName: vm.card.firstName,
                lastName: vm.card.lastName,
                month: vm.card.month,
                year: vm.card.year,
                cvv: vm.card.cvv
            },null,onExecuteSuccess, onExecuteError);

        }

        function onExecuteSuccess() {
            MyWebsite.paid({id: vm.website.id},null, onSuccess);
            function onSuccess() {
                $state.go('my-website', null, {reload: 'my-website'});
            }
        }

        function onExecuteError() {
            vm.isPaying = false;
            AlertService.error("PayPal with timeout. Press buy button again!");
        }


    }
})();
