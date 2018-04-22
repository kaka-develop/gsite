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
                                    id: null
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
            }).state('web-template.detail', {
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
                    entity: ['$stateParams', 'WebTemplate', function ($stateParams, WebTemplate) {
                        return WebTemplate.get($stateParams.id);
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
                            entity: ['$stateParams', 'WebTemplate', function ($stateParams, WebTemplate) {
                                return WebTemplate.get($stateParams.id);
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
                onEnter: ['$stateParams', '$state', '$mdDialog','WebTemplate', function ($stateParams, $state, $mdDialog,WebTemplate) {
                    var confirm = $mdDialog.confirm()
                        .title('You delete this template?')
                        .textContent('This template and its data will be lost forever!')
                        .ariaLabel('Lucky day')
                        .targetEvent(null)
                        .ok('Yes')
                        .cancel('Cancel');

                    $mdDialog.show(confirm).then(function () {
                        WebTemplate.del($stateParams.id);
                        $state.go('web-template', null, {
                            reload: 'web-template'
                        });
                    }, function () {
                        $state.go('web-template', null, {
                            reload: 'web-template'
                        });
                    });
                }]
            });
    }

})();