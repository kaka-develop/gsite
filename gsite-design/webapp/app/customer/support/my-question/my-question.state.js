(function () {
    'use strict';

    angular
        .module('gsiteApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('my-question', {
            parent: 'support',
            url: '/my-question',
            data: {
                authorities: [],
                pageTitle: 'gsiteApp.template.home.title'
            },
            views: {
                'support-content@support': {
                    templateUrl: 'app/customer/support/my-question/my-questions.html',
                    controller: 'MyQuestionController',
                    controllerAs: 'vm'
                }
            }
        }).state('my-question.new', {
            parent: 'my-question',
            url: '/my-question/new',
            data: {
                authorities: []
            },
            params: {
                template_id: null
            },
            onEnter: ['$state', '$mdDialog', function ($state, $mdDialog) {
                $mdDialog.show({
                    templateUrl: 'app/customer/support/my-question/my-question-dialog.html',
                    controller: 'MyQuestionDialogController',
                    controllerAs: 'vm',
                    parent: 'my-question',
                    targetEvent: null,
                    clickOutsideToClose: true,
                    fullscreen: false
                }).then(function (answer) {
                    //$state.go('my-question', null, {reload: 'my-question'});
                }, function () {
                    $state.go('my-question', null, {
                        reload: 'my-question'
                    });
                });
            }]
        });
    }
})();