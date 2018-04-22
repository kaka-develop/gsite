(function () {
    'use strict';

    angular
        .module('gsiteApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
            .state('user-management', {
                parent: 'admin',
                url: '/user-management?page&sort',
                data: {
                    authorities: ['ROLE_ADMIN'],
                    pageTitle: 'userManagement.home.title'
                },
                views: {
                    'admin-content@admin': {
                        templateUrl: 'app/admin/user-management/user-management.html',
                        controller: 'UserManagementController',
                        controllerAs: 'vm'
                    }
                },
                params: {
                    page: {
                        value: '1',
                        squash: true
                    },
                    sort: {
                        value: 'id,asc',
                        squash: true
                    }
                },
                resolve: {
                    pagingParams: ['$stateParams', 'PaginationUtil', function ($stateParams, PaginationUtil) {
                        return {
                            page: PaginationUtil.parsePage($stateParams.page),
                            sort: $stateParams.sort,
                            predicate: PaginationUtil.parsePredicate($stateParams.sort),
                            ascending: PaginationUtil.parseAscending($stateParams.sort)
                        };
                    }],
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('user-management');
                        return $translate.refresh();
                    }]

                }
            })
            .state('user-management.new', {
                parent: 'user-management',
                url: '/new',
                data: {
                    authorities: ['ROLE_ADMIN']
                },
                onEnter: ['$stateParams', '$state', '$mdDialog', function ($stateParams, $state, $mdDialog) {
                    $mdDialog.show({
                        templateUrl: 'app/admin/user-management/user-management-dialog.html',
                        controller: 'UserManagementDialogController',
                        controllerAs: 'vm',
                        clickOutsideToClose: true,
                        fullscreen: false,
                        resolve: {
                            entity: [function () {
                                var user = {
                                    id: null,
                                    login: null,
                                    firstName: null,
                                    lastName: null,
                                    email: null,
                                    activated: false,
                                    langKey: 'en',
                                    authorities: [],
                                    createdBy: null,
                                    createdDate: new Date(),
                                    modifiedBy: null,
                                    modifiedDate: null
                                };
                                return user;
                            }]
                        }
                    }).then(function (answer) {
                        $state.go('user-management', null, {
                            reload: 'user-management'
                        });
                    }, function () {
                        $state.go('user-management');
                    });
                }]
            }).state('user-management-detail', {
                parent: 'admin',
                url: '/user/:login',
                data: {
                    authorities: ['ROLE_ADMIN'],
                    pageTitle: 'user-management.detail.title'
                },
                views: {
                    'admin-content@admin': {
                        templateUrl: 'app/admin/user-management/user-management-detail.html',
                        controller: 'UserManagementDetailController',
                        controllerAs: 'vm'
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('user-management');
                        return $translate.refresh();
                    }]
                }
            })
            .state('user-management.edit', {
                parent: 'user-management',
                url: '/{login}/edit',
                data: {
                    authorities: ['ROLE_ADMIN']
                },
                onEnter: ['$stateParams', '$state', '$mdDialog', function ($stateParams, $state, $mdDialog) {
                    $mdDialog.show({
                        templateUrl: 'app/admin/user-management/user-management-dialog.html',
                        controller: 'UserManagementDialogController',
                        controllerAs: 'vm',
                        clickOutsideToClose: true,
                        fullscreen: false,
                        resolve: {
                            entity: ['User', function (User) {
                                return User.get({
                                    login: $stateParams.login
                                });
                            }]
                        }
                    }).then(function (answer) {
                        $state.go('user-management', null, {
                            reload: true
                        });
                    }, function () {
                        $state.go('^');
                    });
                }]
            })
            .state('user-management.delete', {
                parent: 'user-management',
                url: '/{login}/delete',
                data: {
                    authorities: ['ROLE_ADMIN']
                },
                onEnter: ['$stateParams', '$state', '$mdDialog', 'User', function ($stateParams, $state, $mdDialog, User) {
                    var confirm = $mdDialog.confirm()
                        .title('You delete this user?')
                        .textContent('Notice! Cannot delete this user if having websites.')
                        .ariaLabel('Lucky day')
                        .targetEvent(null)
                        .ok('Yes')
                        .cancel('Cancel');

                    $mdDialog.show(confirm).then(function () {
                        User.delete({
                            login: $stateParams.login
                        });
                        $state.go('user-management', null, {
                            reload: 'user-management'
                        });
                    }, function () {
                        $state.go('^');
                    });
                }]
            });
    }
})();
