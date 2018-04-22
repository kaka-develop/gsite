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
                authorities: ["ROLE_USER"],
                pageTitle: 'gsiteApp.template.home.title'
            },
            views: {
                'support-content@support': {
                    templateUrl: 'app/customer/support/my-question/my-questions.html',
                    controller: 'MyQuestionController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                mainTranslatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate,$translatePartialLoader) {
                    $translatePartialLoader.addPart('my-question');
                    return $translate.refresh();
                }]
            }
        }).state('my-question.new', {
            parent: 'my-question',
            url: '/my-question/new',
            data: {
                authorities: ["ROLE_USER"]
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
                    $state.go('my-question', null);
                }, function () {
                    $state.go('my-question', null);
                });
            }]
        });
    }
})();
