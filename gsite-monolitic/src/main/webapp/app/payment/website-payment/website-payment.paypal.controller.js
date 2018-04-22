(function () {
    'use strict';

    angular
        .module('gsiteApp')
        .controller('WebsitePaymentPayPalController', WebsitePaymentPayPalController);

    WebsitePaymentPayPalController.$inject = ['$state', '$stateParams', 'WebsitePayment', '$location', 'MyWebsite'];

    function WebsitePaymentPayPalController( $state, $stateParams, WebsitePayment, $location, MyWebsite) {
        var vm = this;

        var payment = $location.search();

        var webId = $stateParams.id;

        WebsitePayment.execute({
            paymentID: payment.paymentId, payerID: payment.PayerID
        }, null, onExecuteSuccess, onExecuteError);


        function onExecuteSuccess(data) {
            MyWebsite.paid({id: webId},null, onSuccess);

            function onSuccess() {
                $state.go('my-website', null, {reload: 'my-website'});
            }
        }

        function onExecuteError() {
            $state.go('website-payment', {id: webId}, {reload: 'website-payment'});
        }

    }
})();
