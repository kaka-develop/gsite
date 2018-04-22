(function () {
    'use strict';

    angular
        .module('gsiteApp')
        .controller('FeedbackController', FeedbackController);

    FeedbackController.$inject = ['Feedback', 'AlertService'];

    function FeedbackController(Feedback,  AlertService) {
        var vm = this;

        vm.feedbacks = [];

        loadAll();

        function loadAll() {
            Feedback.query({}, onSuccess, onError);


            function onSuccess(data) {
                vm.feedbacks = data;
            }

            function onError(error) {
                AlertService.error(error.data.message);
            }
        }


    }
})();
