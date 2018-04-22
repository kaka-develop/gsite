(function () {
    'use strict';

    angular
        .module('gsiteApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('basic-template', {
            url: '/basic-template',
            data: {
                authorities: []
            },
            views: {
                'content@': {
                    templateUrl: 'app/templates/basic-template/basic-template.html',
                    controller: 'BasicTemplateController',
                    controllerAs: 'vm'
                },
                'm-home@basic-template': {
                    templateUrl: 'app/web-modules/m-home/m-home.html',
                    controller: 'MHomeController',
                    controllerAs: 'vm',
                    resolve: {
                        entity: [function () {
                            return null;
                        }]
                    }
                },
                'm-toolbar@basic-template': {
                    templateUrl: 'app/web-modules/m-toolbar/m-toolbar.html',
                    controller: 'MToolBarController',
                    controllerAs: 'vm',
                    resolve: {
                        entity: [function () {
                            return null;
                        }]
                    }
                },
                'm-sidenav@basic-template': {
                    templateUrl: 'app/web-modules/m-sidenav/m-sidenav.html',
                    controller: 'MSidenavController',
                    controllerAs: 'vm',
                    resolve: {
                        entity: [function () {
                            return null;
                        }]
                    }
                },
                'm-footer@basic-template': {
                    templateUrl: 'app/web-modules/m-footer/m-footer.html',
                    controller: 'MFooterController',
                    controllerAs: 'vm',
                    resolve: {
                        entity: [function () {
                            return null;
                        }]
                    }
                },
                'm-audio-player@basic-template': {
                    templateUrl: 'app/web-modules/m-audio-player/m-audio-player.html',
                    controller: 'MAudioPlayerController',
                    controllerAs: 'vm'
                }
            }, resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('template');
                    return $translate.refresh();
                }]
            }
        }).state('basic-template.info', {
            parent: 'basic-template',
            url: '/info',
            data: {
                authorities: []
            },
            views: {
                'm-home@basic-template': {
                    templateUrl: 'app/web-modules/m-basic-info/m-basic-info.html',
                    controller: 'MBasicInfoController',
                    controllerAs: 'vm',
                    resolve: {
                        entity: [function () {
                            return null;
                        }]
                    }
                }
            }
        }).state('basic-template.photo', {
            parent: 'basic-template',
            url: '/photos',
            data: {
                authorities: []
            },
            views: {
                'm-home@basic-template': {
                    templateUrl: 'app/web-modules/m-photo/m-photo.html',
                    controller: 'MPhotoController',
                    controllerAs: 'vm',
                    resolve: {
                        entity: [function () {
                            return null;
                        }]
                    }
                }
            }
        }).state('basic-template.song', {
            parent: 'basic-template',
            url: '/songs',
            data: {
                authorities: []
            },
            views: {
                'm-home@basic-template': {
                    templateUrl: 'app/web-modules/m-song/m-song.html',
                    controller: 'MSongController',
                    controllerAs: 'vm',
                    resolve: {
                        entity: [function () {
                            return null;
                        }]
                    }
                }
            }
        });
    }
})();
