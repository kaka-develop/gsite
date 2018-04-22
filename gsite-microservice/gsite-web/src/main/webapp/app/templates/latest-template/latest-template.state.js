(function () {
    'use strict';

    angular
        .module('gsiteApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('latest-template', {
            url: '/latest-template',
            data: {
                authorities: []
            },
            views: {
                'content@': {
                    templateUrl: 'app/templates/latest-template/latest-template.html',
                    controller: 'LatestTemplateController',
                    controllerAs: 'vm'
                },
                'm-home@latest-template': {
                    templateUrl: 'app/web-modules/m-home/m-home.html',
                    controller: 'MHomeController',
                    controllerAs: 'vm',
                    resolve: {
                        entity: [function () {
                            return null;
                        }]
                    }
                },
                'm-toolbar@latest-template': {
                    templateUrl: 'app/web-modules/m-toolbar/m-toolbar.html',
                    controller: 'MToolBarController',
                    controllerAs: 'vm',
                    resolve: {
                        entity: [function () {
                            return null;
                        }]
                    }
                },
                'm-sidenav@latest-template': {
                    templateUrl: 'app/web-modules/m-sidenav/m-sidenav.html',
                    controller: 'MSidenavController',
                    controllerAs: 'vm',
                    resolve: {
                        entity: [function () {
                            return null;
                        }]
                    }
                },
                'm-footer@latest-template': {
                    templateUrl: 'app/web-modules/m-footer/m-footer.html',
                    controller: 'MFooterController',
                    controllerAs: 'vm',
                    resolve: {
                        entity: [function () {
                            return null;
                        }]
                    }
                },
                'm-audio-player@latest-template': {
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
        }).state('latest-template.info', {
            parent: 'latest-template',
            url: '/info',
            data: {
                authorities: []
            },
            views: {
                'm-home@latest-template': {
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
        }).state('latest-template.photo', {
            parent: 'latest-template',
            url: '/photos',
            data: {
                authorities: []
            },
            views: {
                'm-home@latest-template': {
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
        }).state('latest-template.song', {
            parent: 'latest-template',
            url: '/songs',
            data: {
                authorities: []
            },
            views: {
                'm-home@latest-template': {
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
