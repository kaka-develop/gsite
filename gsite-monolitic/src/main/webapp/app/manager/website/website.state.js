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
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('website');
                        $translatePartialLoader.addPart('global');
                        return $translate.refresh();
                    }]
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
                                    id: null,
                                    name: null,
                                    des: null,
                                    domain: null,
                                    template: null,
                                    created: new Date(),
                                    user_id: null,
                                    paid: false,
                                    sharedUsers: [],
                                    custom: {
                                        toolbar: {
                                            isEnable: true,
                                            title: "Person",
                                            textColor: '#FFFFFF'
                                        },
                                        homepage: {
                                            isEnable: true,
                                            name: "name",
                                            fullName: "Full name",
                                            avatar: null,
                                            mainImage: 'none'
                                        },
                                        sidenav: {
                                            isEnable: true,
                                            title: "Sidenav",
                                            textColor: '#FFFFFF',
                                            backgroundColor: 'white'
                                        },
                                        footer: {
                                            isEnable: true
                                        },
                                        basicinfo: {
                                            isEnable: true,
                                            firstName: 'First name',
                                            lastName: 'Last name',
                                            email: 'email',
                                            age: 21,
                                            des: 'description'
                                        },
                                        song: {
                                            isEnable: true,
                                            items: []
                                        },
                                        photo: {
                                            isEnable: true,
                                            items: []
                                        }
                                    }
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
                parent: 'manager',
                url: '/website/{id}',
                data: {
                    authorities: ['ROLE_MANAGER'],
                    pageTitle: 'gsiteApp.website.detail.title'
                },
                views: {
                    'manager-content@manager': {
                        templateUrl: 'app/manager/website/website-detail.html',
                        controller: 'WebsiteDetailController',
                        controllerAs: 'vm'
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('website');
                        return $translate.refresh();
                    }],
                    entity: ['$stateParams', 'Website', function ($stateParams, Website) {
                        return Website.get({
                            id: $stateParams.id
                        }).$promise;
                    }],
                    previousState: ["$state", function ($state) {
                        var currentStateData = {
                            name: $state.current.name || 'website',
                            params: $state.params,
                            url: $state.href($state.current.name, $state.params)
                        };
                        return currentStateData;
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
                            entity: ['Website', function (Website) {
                                return Website.get({
                                    id: $stateParams.id
                                }).$promise;
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
                onEnter: ['$stateParams', '$state', '$mdDialog', 'Website', function ($stateParams, $state, $mdDialog, Website) {
                    var confirm = $mdDialog.confirm()
                        .title('You delete this website?')
                        .textContent('This website and its data will be lost forever!')
                        .ariaLabel('Lucky day')
                        .targetEvent(null)
                        .ok('Yes')
                        .cancel('Cancel');

                    $mdDialog.show(confirm).then(function () {
                        Website.delete({id: $stateParams.id});
                        $state.go('website', null, {
                            reload: 'website'
                        });
                    }, function () {
                        $state.go('^');
                    });
                }]
            });
    }

})();
