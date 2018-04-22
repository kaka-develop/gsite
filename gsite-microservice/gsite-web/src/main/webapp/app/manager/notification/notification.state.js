(function () {
    'use strict';

    angular
        .module('gsiteApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
            .state('notification', {
                parent: 'manager',
                url: '/notification',
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'gsiteApp.notification.home.title'
                },
                views: {
                    'manager-content@manager': {
                        templateUrl: 'app/manager/notification/notifications.html',
                        controller: 'NotificationController',
                        controllerAs: 'vm'
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('notification');
                        $translatePartialLoader.addPart('global');
                        return $translate.refresh();
                    }]
                }
            })
            .state('notification.detail', {
                parent: 'notification',
                url: '/notification/{id}',
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'gsiteApp.notification.detail.title'
                },
                views: {
                    'manager-content@manager': {
                        templateUrl: 'app/manager/notification/notification-detail.html',
                        controller: 'NotificationDetailController',
                        controllerAs: 'vm'
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('notification');
                        return $translate.refresh();
                    }],
                    entity: ['$stateParams', 'Notification', function ($stateParams, Notification) {
                        return Notification.get({id: $stateParams.id}).$promise;
                    }],
                    previousState: ["$state", function ($state) {
                        var currentStateData = {
                            name: $state.current.name || 'notification',
                            params: $state.params,
                            url: $state.href($state.current.name, $state.params)
                        };
                        return currentStateData;
                    }]
                }
            })
            .state('notification.new', {
                parent: 'notification',
                url: '/new',
                data: {
                    authorities: ['ROLE_USER']
                },
                onEnter: ['$stateParams', '$state', '$mdDialog', function ($stateParams, $state, $mdDialog) {
                    $mdDialog.show({
                        templateUrl: 'app/manager/notification/notification-dialog.html',
                        controller: 'NotificationDialogController',
                        controllerAs: 'vm',
                        clickOutsideToClose: true,
                        fullscreen: false,
                        resolve: {
                            entity: function () {
                                return {
                                    title: null,
                                    content: null,
                                    isRead: null,
                                    created: new Date(),
                                    sentUsers: [],
                                    id: null
                                };
                            }
                        }
                    }).then(function () {
                        $state.go('notification', null, {reload: 'notification'});
                    }, function () {
                        $state.go('notification');
                    });
                }]
            })
            .state('notification.edit', {
                parent: 'notification',
                url: '/{id}/edit',
                data: {
                    authorities: ['ROLE_USER']
                },
                onEnter: ['$stateParams', '$state', '$mdDialog', function ($stateParams, $state, $mdDialog) {
                    $mdDialog.show({
                        templateUrl: 'app/manager/notification/notification-dialog.html',
                        controller: 'NotificationDialogController',
                        controllerAs: 'vm',
                        clickOutsideToClose: true,
                        fullscreen: false,
                        resolve: {
                            entity: ['Notification', function (Notification) {
                                return Notification.get({id: $stateParams.id}).$promise;
                            }]
                        }
                    }).then(function () {
                        $state.go('notification', null, {reload: 'notification'});
                    }, function () {
                        $state.go('^');
                    });
                }]
            })
            .state('notification.delete', {
                parent: 'notification',
                url: '/{id}/delete',
                data: {
                    authorities: ['ROLE_USER']
                },
                onEnter: ['$stateParams', '$state', '$mdDialog', 'Notification', function ($stateParams, $state, $mdDialog, Notification) {
                    var confirm = $mdDialog.confirm()
                        .title('You delete this notification?')
                        .textContent('This notification and its data will be lost forever!')
                        .ariaLabel('Lucky day')
                        .targetEvent(null)
                        .ok('Yes')
                        .cancel('Cancel');

                    $mdDialog.show(confirm).then(function () {
                        Notification.delete({id: $stateParams.id});
                        $state.go('notification', null, {
                            reload: 'notification'
                        });
                    }, function () {
                        $state.go('^');
                    });
                }]
            });
    }

})();
