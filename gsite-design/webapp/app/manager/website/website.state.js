(function () {
    'use strict';

    angular
        .module('gsiteApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
            .state('website', {
                parent: 'manager',
                url: '/website',
                data: {
                    authorities: ['ROLE_MANAGER'],
                    pageTitle: 'gsiteApp.website.home.title'
                },
                views: {
                    'manager-content@manager': {
                        templateUrl: 'app/manager/website/websites.html',
                        controller: 'WebsiteController',
                        controllerAs: 'vm'
                    }
                },
                resolve: {

                }
            })
            .state('website.new', {
                parent: 'website',
                url: '/new',
                data: {
                    authorities: ['ROLE_MANAGER']
                },
                onEnter: ['$stateParams', '$state', '$mdDialog', function ($stateParams, $state, $mdDialog) {
                    $mdDialog.show({
                        templateUrl: 'app/manager/website/website-dialog.html',
                        controller: 'WebsiteDialogController',
                        controllerAs: 'vm',
                        clickOutsideToClose: true,
                        fullscreen: false,
                        resolve: {
                            entity: function () {
                                return {
                                    name: null,
                                    created: null,
                                    user_id: null,
                                    template: null,
                                    domain: null,
                                    id: null,
                                    sharedWebsites: []
                                };
                            }
                        }
                    }).then(function () {
                        $state.go('website', null, {
                            reload: 'website'
                        });
                    }, function () {
                        $state.go('website');
                    });
                }]
            })
            .state('website.detail', {
                parent: 'website',
                url: '/detail/{id}',
                data: {
                    authorities: ['ROLE_MANAGER']
                },
                views: {
                    'manager-content@manager': {
                        templateUrl: 'app/manager/website/website-detail.html',
                        controller: 'WebsiteDetailController',
                        controllerAs: 'vm'
                    }
                },
                resolve: {
                    entity: ['$stateParams', 'Website', function ($stateParams, Website) {
                        return Website.get($stateParams.id);
                    }]
                }
            })
            .state('website.edit', {
                parent: 'website',
                url: '/{id}/edit',
                data: {
                    authorities: ['ROLE_MANAGER']
                },
                onEnter: ['$stateParams', '$state', '$mdDialog', function ($stateParams, $state, $mdDialog) {
                    $mdDialog.show({
                        templateUrl: 'app/manager/website/website-dialog.html',
                        controller: 'WebsiteDialogController',
                        controllerAs: 'vm',
                        clickOutsideToClose: true,
                        fullscreen: false,
                        resolve: {
                            entity: ['$stateParams', 'Website', function ($stateParams, Website) {
                                return Website.get($stateParams.id);
                            }]
                        }
                    }).then(function () {
                        $state.go('website', null, {
                            reload: 'website'
                        });
                    }, function () {
                        $state.go('^');
                    });
                }]
            })
            .state('website.delete', {
                parent: 'website',
                url: '/{id}/delete',
                data: {
                    authorities: ['ROLE_MANAGER']
                },
                onEnter: ['$stateParams', '$state', '$mdDialog','Website', function ($stateParams, $state, $mdDialog,Website) {
                    var confirm = $mdDialog.confirm()
                        .title('You delete this website?')
                        .textContent('This website and its data will be lost forever!')
                        .ariaLabel('Lucky day')
                        .targetEvent(null)
                        .ok('Yes')
                        .cancel('Cancel');

                    $mdDialog.show(confirm).then(function () {
                        Website.del($stateParams.id);
                        $state.go('website', null, {
                            reload: 'website'
                        });
                    }, function () {
                        $state.go('website', null, {
                            reload: 'website'
                        });
                    });
                }]
            });
    }

})();