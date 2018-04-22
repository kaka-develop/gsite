(function () {
    'use strict';

    angular
        .module('gsiteApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('my-notification', {
            parent: 'customer',
            url: '/my-notification',
            data: {
                authorities: [],
                pageTitle: 'gsiteApp.template.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/customer/my-notification/my-notifications.html',
                    controller: 'MyNotificationController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('my-notification');
                    return $translate.refresh();
                }]
            }
        }).state('my-notification.view', {
            parent: 'my-notification',
            url: '/my-notification/view/{id}',
            data: {
                authorities: [],
                pageTitle: 'gsiteApp.template.home.title'
            },
            params: {
                id: null
            },
            views: {
                'content@': {
                    templateUrl: 'app/customer/my-notification/my-notification-view.html',
                    controller: 'MyNotificationViewController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                entity: ['$stateParams', 'Notification', function ($stateParams, Notification) {
                    return Notification.get({id : $stateParams.id}).$promise;
                }]
            }
        }).state('my-notification.delete', {
            parent: 'my-notification',
            url: '/my-notification/delete/{id}',
            data: {
                authorities: []
            },
            params: {
                template_id: null
            },
            onEnter: ['$stateParams', '$state','Notification', function ($stateParams, $state,MyNotificationService) {
                MyNotificationService.del($stateParams.id);
                $state.go('my-notification');
            }]
        });
    }
})();
