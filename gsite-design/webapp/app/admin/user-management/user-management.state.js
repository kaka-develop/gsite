(function () {
    'use strict';

    angular
        .module('gsiteApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('user-management', {
            parent: 'admin',
            url: '/user-management',
            data: {
                authorities: [],
                pageTitle: 'user-management.title'
            },
            views: {
                'admin-content@admin': {
                    templateUrl: 'app/admin/user-management/user-management.html',
                    controller: 'UserManagementController',
                    controllerAs: 'vm'
                }
            }
        }).state('user-management-detail', {
            parent: 'admin',
            url: '/user/{id}',
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
                entity: ['$stateParams', 'User', function ($stateParams, User) {
                    return User.get($stateParams.id);
                }]
            }
        }).state('user-management.new', {
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
                                lang: 'en',
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
                    //$state.go('user-management', null, {reload: 'user-management'});
                }, function () {
                    $state.go('user-management', null, {
                        reload: 'user-management'
                    });
                });
            }]
        }).state('user-management.edit', {
            parent: 'user-management',
            url: '/edit/{id}',
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
                            return User.get($stateParams.id);
                        }]
                    }
                }).then(function (answer) {
                    //$state.go('user-management', null, {reload: 'user-management'});
                }, function () {
                    $state.go('user-management', null, {
                        reload: 'user-management'
                    });
                });
            }]
        }).state('user-management.delete', {
            parent: 'user-management',
            url: '/delete/{id}',
            data: {
                authorities: ['ROLE_ADMIN']
            },
            onEnter: ['$stateParams', '$state', '$mdDialog', 'User', function ($stateParams, $state, $mdDialog, User) {
                var confirm = $mdDialog.confirm()
                    .title('You delete this user?')
                    .textContent('This user and its data will be lost forever!')
                    .ariaLabel('Lucky day')
                    .targetEvent(null)
                    .ok('Yes')
                    .cancel('Cancel');

                $mdDialog.show(confirm).then(function () {
                    User.del($stateParams.id);
                    $state.go('user-management', null, {
                        reload: 'user-management'
                    });
                }, function () {
                    $state.go('user-management', null, {
                        reload: 'user-management'
                    });
                });

            }]
        });
    }
})();