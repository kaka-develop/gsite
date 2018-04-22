(function () {
    'use strict';

    angular
        .module('gsiteApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('view-website', {
            url: '/ai',
            data: {
                authorities: []
            },
            params: {
                website: null
            },
            views: {
                'content@': {
                    templateUrl: function ($stateParams) {
                        return 'app/templates/' + $stateParams.website.template + '/' + $stateParams.website.template + '.html';
                    },
                    controller: 'MyWebsiteViewController',
                    controllerAs: 'vm',
                    resolve: {
                        entity: function ($stateParams) {
                            return $stateParams.website;
                        }
                    }
                },
                'm-home@view-website': {
                    templateUrl: function ($stateParams) {
                        if ($stateParams.website.custom.homepage.isEnable)
                            return 'app/web-modules/m-home/m-home.html';
                        else
                            return null;
                    },
                    controller: 'MHomeController',
                    controllerAs: 'vm',
                    resolve: {
                        entity: function ($stateParams) {
                            return $stateParams.website;
                        }
                    }
                },
                'm-toolbar@view-website': {
                    templateUrl: function ($stateParams) {
                        if ($stateParams.website.custom.toolbar.isEnable)
                            return 'app/web-modules/m-toolbar/m-toolbar.html';
                        else
                            return null;
                    },
                    controller: 'MToolBarController',
                    controllerAs: 'vm',
                    resolve: {
                        entity: function ($stateParams) {
                            return $stateParams.website;
                        }
                    }
                },
                'm-sidenav@view-website': {
                    templateUrl: function ($stateParams) {
                        if ($stateParams.website.custom.sidenav.isEnable)
                            return 'app/web-modules/m-sidenav/m-sidenav.html';
                        else
                            return null;
                    },
                    controller: 'MSidenavController',
                    controllerAs: 'vm',
                    resolve: {
                        entity: function ($stateParams) {
                            return $stateParams.website;
                        }
                    }
                },
                'm-footer@view-website': {
                    templateUrl: function ($stateParams) {
                        if ($stateParams.website.custom.footer.isEnable)
                            return 'app/web-modules/m-footer/m-footer.html';
                        else
                            return null;
                    },
                    controller: 'MFooterController',
                    controllerAs: 'vm',
                    resolve: {
                        entity: function ($stateParams) {
                            return $stateParams.website;
                        }
                    }
                },
                'm-audio-player@view-website': {
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
        }).state('view-website.info', {
            parent: 'view-website',
            url: '/info',
            data: {
                authorities: []
            },
            views: {
                'm-home@view-website': {
                    templateUrl: 'app/web-modules/m-basic-info/m-basic-info.html',
                    controller: 'MBasicInfoController',
                    controllerAs: 'vm',
                    resolve: {
                        entity: function ($stateParams) {
                            return $stateParams.website.custom.basicInfo;
                        }
                    }
                }
            }
        }).state('view-website.photo', {
            parent: 'view-website',
            url: '/photos',
            data: {
                authorities: []
            },
            views: {
                'm-home@view-website': {
                    templateUrl: 'app/web-modules/m-photo/m-photo.html',
                    controller: 'MPhotoController',
                    controllerAs: 'vm',
                    resolve: {
                    }
                }
            }
        }).state('view-website.song', {
            parent: 'view-website',
            url: '/songs',
            data: {
                authorities: []
            },
            views: {
                'm-home@view-website': {
                    templateUrl: 'app/web-modules/m-song/m-song.html',
                    controller: 'MSongController',
                    controllerAs: 'vm',
                    resolve: {

                    }
                }
            }
        });
    }
})();
