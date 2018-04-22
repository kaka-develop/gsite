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
                                    title: null,
                                    answer: null,
                                    created: new Date(),
                                    user_id: null,
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

                    entity: ['$stateParams', 'Question', function ($stateParams, Question) {
                        return Question.get($stateParams.id);
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
                                return Question.get($stateParams.id);
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
                        Question.del($stateParams.id);
                        $state.go('question', null, {
                            reload: 'question'
                        });
                    }, function () {
                        $state.go('question', null, {
                            reload: 'question'
                        });
                    });
                }]
            });
    }

})();