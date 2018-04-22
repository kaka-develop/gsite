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
                entity: ['$stateParams', 'MyNotificationService', function ($stateParams, MyNotificationService) {
                    return MyNotificationService.get($stateParams.id);
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
            onEnter: ['$stateParams', '$state','MyNotificationService', function ($stateParams, $state,MyNotificationService) {
                MyNotificationService.del($stateParams.id);
                $state.go('my-notification', null, { reload: 'my-notification' });
            }]
        });
    }
})();
