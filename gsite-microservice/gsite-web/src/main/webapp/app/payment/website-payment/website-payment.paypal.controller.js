(function () {
    'use strict';

    angular
        .module('gsiteApp')
        .controller('WebsitePaymentPayPalController', WebsitePaymentPayPalController);

    WebsitePaymentPayPalController.$inject = ['$state', '$stateParams', 'WebsitePayment', '$location', 'MyWebsite','Principal','MyWebsiteOffline'];

    function WebsitePaymentPayPalController( $state, $stateParams, WebsitePayment, $location, MyWebsite,Principal,MyWebsiteOffline) {
        var vm = this;

        var payment = $location.search();

        var webId = $stateParams.id;

        WebsitePayment.execute({
            paymentID: payment.paymentId, payerID: payment.PayerID
        }, null, onExecuteSuccess, onExecuteError);


        function onExecuteSuccess(data) {
            MyWebsite.paid({id: webId},null, onSuccess);

            function onSuccess() {
                loadWebsites();
                $state.go('my-website', null, {reload: 'my-website'});
            }
        }

        function onExecuteError() {
            $state.go('website-payment', {id: webId}, {reload: 'website-payment'});
        }


        function loadWebsites() {
            Principal.identity().then(function (account) {
                MyWebsiteOffline.checkUser(account.id,account.email);
            });
        }
    }
})();
