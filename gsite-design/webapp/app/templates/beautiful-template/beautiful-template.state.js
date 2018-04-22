(function () {
    'use strict';

    angular
        .module('gsiteApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('beautiful-template', {
            url: '/beautiful-template',
            data: {
                authorities: []
            },
            views: {
                'content@': {
                    templateUrl: 'app/templates/beautiful-template/beautiful-template.html',
                    controller: 'BeautifulTemplateController',
                    controllerAs: 'vm'
                },
                'm-home@beautiful-template': {
                    templateUrl: 'app/web-modules/m-home/m-home.html',
                    controller: 'MHomeController',
                    controllerAs: 'vm',
                    resolve: {
                        entity: [function () {
                            return null;
                        }],
                        song: [function () {
                            return null;
                        }],
                        photo: [function () {
                            return null;
                        }]
                    }
                },
                'm-toolbar@beautiful-template': {
                    templateUrl: 'app/web-modules/m-toolbar/m-toolbar.html',
                    controller: 'MToolBarController',
                    controllerAs: 'vm',
                    resolve: {
                        entity: [function () {
                            return null;
                        }]
                    }
                },
                'm-sidenav@beautiful-template': {
                    templateUrl: 'app/web-modules/m-sidenav/m-sidenav.html',
                    controller: 'MSidenavController',
                    controllerAs: 'vm',
                    resolve: {
                        entity: [function () {
                            return null;
                        }]
                    }
                },
                'm-sidenav-list@beautiful-template': {
                    templateUrl: 'app/web-modules/m-sidenav-list/m-sidenav-list.html',
                    controller: 'MSidenavListController',
                    controllerAs: 'vm',
                    resolve: {
                        entity: [function () {
                            return null;
                        }]
                    }
                },
                'm-footer@beautiful-template': {
                    templateUrl: 'app/web-modules/m-footer/m-footer.html',
                    controller: 'MFooterController',
                    controllerAs: 'vm',
                    resolve: {
                        entity: [function () {
                            return null;
                        }]
                    }
                },
                'm-audio-player@beautiful-template': {
                    templateUrl: 'app/web-modules/m-audio-player/m-audio-player.html',
                    controller: 'MAudioPlayerController',
                    controllerAs: 'vm'
                }
            }
        }).state('beautiful-template.info', {
            parent: 'beautiful-template',
            url: '/info',
            data: {
                authorities: []
            },
            views: {
                'm-home@beautiful-template': {
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
        }).state('beautiful-template.photo', {
            parent: 'beautiful-template',
            url: '/photos',
            data: {
                authorities: []
            },
            views: {
                'm-home@beautiful-template': {
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
        }).state('beautiful-template.song', {
            parent: 'beautiful-template',
            url: '/songs',
            data: {
                authorities: []
            },
            views: {
                'm-home@beautiful-template': {
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
