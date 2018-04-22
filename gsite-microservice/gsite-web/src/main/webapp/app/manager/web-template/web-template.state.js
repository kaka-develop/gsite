(function () {
    'use strict';

    angular
        .module('gsiteApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
            .state('web-template', {
                parent: 'manager',
                url: '/web-template',
                data: {
                    authorities: ['ROLE_MANAGER'],
                    pageTitle: 'gsiteApp.webTemplate.home.title'
                },
                views: {
                    'manager-content@manager': {
                        templateUrl: 'app/manager/web-template/web-templates.html',
                        controller: 'WebTemplateController',
                        controllerAs: 'vm'
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('webTemplate');
                        $translatePartialLoader.addPart('global');
                        return $translate.refresh();
                    }]
                }
            })
            .state('web-template.new', {
                parent: 'web-template',
                url: '/new',
                data: {
                    authorities: ['ROLE_MANAGER']
                },
                onEnter: ['$stateParams', '$state', '$mdDialog', function ($stateParams, $state, $mdDialog) {
                    $mdDialog.show({
                        templateUrl: 'app/manager/web-template/web-template-dialog.html',
                        controller: 'WebTemplateDialogController',
                        controllerAs: 'vm',
                        targetEvent: null,
                        clickOutsideToClose: true,
                        fullscreen: false,
                        resolve: {
                            entity: function () {
                                return {
                                    name: null,
                                    source: null,
                                    id: null,
                                    category: null,
                                    rating: 1,
                                    price: 0,
                                    image: null,
                                    created: new Date()
                                };
                            }
                        }
                    }).then(function () {
                        $state.go('web-template', null, {
                            reload: 'web-template'
                        });
                    }, function () {
                        $state.go('web-template');
                    });
                }]
            })
            .state('web-template.detail', {
                parent: 'manager',
                url: '/web-template/{id}',
                data: {
                    authorities: ['ROLE_MANAGER'],
                    pageTitle: 'gsiteApp.webTemplate.detail.title'
                },
                views: {
                    'manager-content@manager': {
                        templateUrl: 'app/manager/web-template/web-template-detail.html',
                        controller: 'WebTemplateDetailController',
                        controllerAs: 'vm'
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('webTemplate');
                        return $translate.refresh();
                    }],
                    entity: ['$stateParams', 'WebTemplate', function ($stateParams, WebTemplate) {
                        return WebTemplate.get({
                            id: $stateParams.id
                        }).$promise;
                    }],
                    previousState: ["$state", function ($state) {
                        var currentStateData = {
                            name: $state.current.name || 'web-template',
                            params: $state.params,
                            url: $state.href($state.current.name, $state.params)
                        };
                        return currentStateData;
                    }]
                }
            })
            .state('web-template.edit', {
                parent: 'web-template',
                url: '/{id}/edit',
                data: {
                    authorities: ['ROLE_MANAGER']
                },
                onEnter: ['$stateParams', '$state', '$mdDialog', function ($stateParams, $state, $mdDialog) {
                    $mdDialog.show({
                        templateUrl: 'app/manager/web-template/web-template-dialog.html',
                        controller: 'WebTemplateDialogController',
                        controllerAs: 'vm',
                        targetEvent: null,
                        clickOutsideToClose: true,
                        fullscreen: false,
                        resolve: {
                            entity: ['WebTemplate', function (WebTemplate) {
                                return WebTemplate.get({
                                    id: $stateParams.id
                                }).$promise;
                            }]
                        }
                    }).then(function () {
                        $state.go('web-template', null, {
                            reload: 'web-template'
                        });
                    }, function () {
                        $state.go('^');
                    });
                }]
            })
            .state('web-template.delete', {
                parent: 'web-template',
                url: '/{id}/delete',
                data: {
                    authorities: ['ROLE_MANAGER']
                },
                onEnter: ['$stateParams', '$state', '$mdDialog', 'WebTemplate', 'TemplateStorage', function ($stateParams, $state, $mdDialog, WebTemplate, TemplateStorage) {
                    var confirm = $mdDialog.confirm()
                        .title('You delete this template?')
                        .textContent('Notice! Cannot delete this template if having websites')
                        .ariaLabel('Lucky day')
                        .targetEvent(null)
                        .ok('Yes')
                        .cancel('Cancel');

                    $mdDialog.show(confirm).then(function () {
                        WebTemplate.get({
                            id: $stateParams.id
                        }, function (data) {
                            TemplateStorage.deleteTemplateImage(data.id, data.image);
                            WebTemplate.delete({
                                id: $stateParams.id
                            });
                            $state.go('web-template', null, {
                                reload: 'web-template'
                            });
                        });
                    }, function () {
                        $state.go('^');
                    });
                }]
            });
    }

})();
