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
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('feedback');
                        $translatePartialLoader.addPart('global');
                        return $translate.refresh();
                    }]
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
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('feedback');
                        return $translate.refresh();
                    }],
                    entity: ['$stateParams', 'Feedback', function ($stateParams, Feedback) {
                        return Feedback.get({
                            id: $stateParams.id
                        }).$promise;
                    }],
                    previousState: ["$state", function ($state) {
                        var currentStateData = {
                            name: $state.current.name || 'feedback',
                            params: $state.params,
                            url: $state.href($state.current.name, $state.params)
                        };
                        return currentStateData;
                    }]
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
                                return Feedback.get({
                                    id: $stateParams.id
                                }).$promise;
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
                        Feedback.delete({id: $stateParams.id});
                        $state.go('feedback', null, {
                            reload: 'feedback'
                        });
                    }, function () {
                        $state.go('^');
                    });
                }]
            });
    }

})();
