(function () {
    'use strict';

    angular
        .module('gsiteApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
            .state('feedback', {
                parent: 'manager',
                url: '/feedback',
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'gsiteApp.feedback.home.title'
                },
                views: {
                    'manager-content@manager': {
                        templateUrl: 'app/manager/feedback/feedbacks.html',
                        controller: 'FeedbackController',
                        controllerAs: 'vm'
                    }
                },
                resolve: {

                }
            })
            .state('feedback.new', {
                parent: 'feedback',
                url: '/new',
                data: {
                    authorities: ['ROLE_USER']
                },
                onEnter: ['$stateParams', '$state', '$mdDialog', function ($stateParams, $state, $mdDialog) {
                    $mdDialog.show({
                        templateUrl: 'app/manager/feedback/feedback-dialog.html',
                        controller: 'FeedbackDialogController',
                        controllerAs: 'vm',
                        clickOutsideToClose: true,
                        fullscreen: false,
                        resolve: {
                            entity: function () {
                                return {
                                    title: null,
                                    content: null,
                                    created: new Date(),
                                    user_id: null,
                                    id: null
                                };
                            }
                        }
                    }).then(function () {
                        $state.go('feedback', null, {
                            reload: 'feedback'
                        });
                    }, function () {
                        $state.go('feedback');
                    });
                }]
            })
            .state('feedback.detail', {
                parent: 'manager',
                url: '/feedback/{id}',
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'gsiteApp.feedback.detail.title'
                },
                views: {
                    'manager-content@manager': {
                        templateUrl: 'app/manager/feedback/feedback-detail.html',
                        controller: 'FeedbackDetailController',
                        controllerAs: 'vm'
                    }
                },
                resolve: {

                    entity: ['$stateParams', 'Feedback', function ($stateParams, Feedback) {
                        return Feedback.get($stateParams.id);
                    }],

                }
            })

            .state('feedback.edit', {
                parent: 'feedback',
                url: '/{id}/edit',
                data: {
                    authorities: ['ROLE_USER']
                },
                onEnter: ['$stateParams', '$state', '$mdDialog', function ($stateParams, $state, $mdDialog) {
                    $mdDialog.show({
                        templateUrl: 'app/manager/feedback/feedback-dialog.html',
                        controller: 'FeedbackDialogController',
                        controllerAs: 'vm',
                        clickOutsideToClose: true,
                        fullscreen: false,
                        resolve: {
                            entity: ['Feedback', function (Feedback) {
                                return Feedback.get($stateParams.id);
                            }]
                        }
                    }).then(function () {
                        $state.go('feedback', null, {
                            reload: 'feedback'
                        });
                    }, function () {
                        $state.go('^');
                    });
                }]
            })
            .state('feedback.delete', {
                parent: 'feedback',
                url: '/{id}/delete',
                data: {
                    authorities: ['ROLE_USER']
                },
                onEnter: ['$stateParams', '$state', '$mdDialog', 'Feedback', function ($stateParams, $state, $mdDialog, Feedback) {
                    var confirm = $mdDialog.confirm()
                        .title('You delete this feedback?')
                        .textContent('This feedback and its data will be lost forever!')
                        .ariaLabel('Lucky day')
                        .targetEvent(null)
                        .ok('Yes')
                        .cancel('Cancel');

                    $mdDialog.show(confirm).then(function () {
                        Feedback.del($stateParams.id);
                        $state.go('feedback', null, {
                            reload: 'feedback'
                        });
                    }, function () {
                        $state.go('feedback', null, {
                            reload: 'feedback'
                        });
                    });
                }]
            });
    }

})();