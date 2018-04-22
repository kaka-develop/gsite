(function () {
    'use strict';

    angular
        .module('gsiteApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
            .state('question', {
                parent: 'manager',
                url: '/question',
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'gsiteApp.question.home.title'
                },
                views: {
                    'manager-content@manager': {
                        templateUrl: 'app/manager/question/questions.html',
                        controller: 'QuestionController',
                        controllerAs: 'vm'
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('question');
                        $translatePartialLoader.addPart('global');
                        return $translate.refresh();
                    }]
                }
            })
            .state('question.new', {
                parent: 'question',
                url: '/new',
                data: {
                    authorities: ['ROLE_USER']
                },
                onEnter: ['$stateParams', '$state', '$mdDialog', function ($stateParams, $state, $mdDialog) {
                    $mdDialog.show({
                        templateUrl: 'app/manager/question/question-dialog.html',
                        controller: 'QuestionDialogController',
                        controllerAs: 'vm',
                        clickOutsideToClose: true,
                        fullscreen: false,
                        resolve: {
                            entity: function () {
                                return {
                                    content: null,
                                    answer: null,
                                    created: new Date(),
                                    user_id: null,
                                    isFrequent: false,
                                    id: null
                                };
                            }
                        }
                    }).then(function () {
                        $state.go('question', null, {
                            reload: 'question'
                        });
                    }, function () {
                        $state.go('question');
                    });
                }]
            }).state('question.detail', {
                parent: 'manager',
                url: '/question/{id}',
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'gsiteApp.question.detail.title'
                },
                views: {
                    'manager-content@manager': {
                        templateUrl: 'app/manager/question/question-detail.html',
                        controller: 'QuestionDetailController',
                        controllerAs: 'vm'
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('question');
                        return $translate.refresh();
                    }],
                    entity: ['$stateParams', 'Question', function ($stateParams, Question) {
                        return Question.get({
                            id: $stateParams.id
                        }).$promise;
                    }],
                    previousState: ["$state", function ($state) {
                        var currentStateData = {
                            name: $state.current.name || 'question',
                            params: $state.params,
                            url: $state.href($state.current.name, $state.params)
                        };
                        return currentStateData;
                    }]
                }
            })
            .state('question.edit', {
                parent: 'question',
                url: '/{id}/edit',
                data: {
                    authorities: ['ROLE_USER']
                },
                onEnter: ['$stateParams', '$state', '$mdDialog', function ($stateParams, $state, $mdDialog) {
                    $mdDialog.show({
                        templateUrl: 'app/manager/question/question-dialog.html',
                        controller: 'QuestionDialogController',
                        controllerAs: 'vm',
                        clickOutsideToClose: true,
                        fullscreen: false,
                        resolve: {
                            entity: ['Question', function (Question) {
                                return Question.get({
                                    id: $stateParams.id
                                }).$promise;
                            }]
                        }
                    }).then(function () {
                        $state.go('question', null, {
                            reload: 'question'
                        });
                    }, function () {
                        $state.go('^');
                    });
                }]
            })
            .state('question.delete', {
                parent: 'question',
                url: '/{id}/delete',
                data: {
                    authorities: ['ROLE_USER']
                },
                onEnter: ['$stateParams', '$state', '$mdDialog', 'Question', function ($stateParams, $state, $mdDialog, Question) {
                    var confirm = $mdDialog.confirm()
                        .title('You delete this question?')
                        .textContent('This question and its data will be lost forever!')
                        .ariaLabel('Lucky day')
                        .targetEvent(null)
                        .ok('Yes')
                        .cancel('Cancel');

                    $mdDialog.show(confirm).then(function () {
                        Question.delete({id: $stateParams.id});
                        $state.go('question', null, {
                            reload: 'question'
                        });
                    }, function () {
                        $state.go('^');
                    });
                }]
            });
    }

})();
