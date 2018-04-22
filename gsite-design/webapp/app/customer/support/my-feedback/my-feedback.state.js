(function () {
    'use strict';

    angular
        .module('gsiteApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('my-feedback', {
            parent: 'support',
            url: '/my-feedback',
            data: {
                authorities: [],
                pageTitle: 'gsiteApp.template.home.title'
            },
            views: {
                'support-content@support': {
                    templateUrl: 'app/customer/support/my-feedback/my-feedbacks.html',
                    controller: 'MyFeedbackController',
                    controllerAs: 'vm'
                }
            }
        }).state('my-feedback.new', {
            parent: 'my-feedback',
            url: '/my-feedback/new',
            data: {
                authorities: []
            },
            params: {
                template_id: null
            },
            onEnter: ['$state', '$mdDialog', function ($state, $mdDialog) {
                $mdDialog.show({
                    templateUrl: 'app/customer/support/my-feedback/my-feedback-dialog.html',
                    controller: 'MyFeedbackDialogController',
                    controllerAs: 'vm',
                    parent: 'my-feedback',
                    targetEvent: null,
                    clickOutsideToClose: true,
                    fullscreen: false
                }).then(function (answer) {
                    // $state.go('my-feedback', null, {reload: 'my-feedback'});
                }, function () {
                    $state.go('my-feedback', null, { reload: 'my-feedback' });
                });
            }]
        });
    }
})();
