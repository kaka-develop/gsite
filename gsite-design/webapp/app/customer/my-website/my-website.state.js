(function () {
    'use strict';

    angular
        .module('gsiteApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('my-website', {
            parent: 'customer',
            url: '/mywebsites?page&sort&search',
            data: {
                authorities: [],
                pageTitle: 'gsiteApp.my-website.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/customer/my-website/my-websites.html',
                    controller: 'MyWebsiteController',
                    controllerAs: 'vm'
                }
            }
        }).state('my-website.new', {
            parent: 'my-website',
            url: '/mywebsites/new/{template_id}',
            data: {
                authorities: []
            },
            params: {
                template_id: null
            },
            onEnter: ['$stateParams', '$state', '$mdDialog', function ($stateParams, $state, $mdDialog) {
                $mdDialog.show({
                    templateUrl: 'app/customer/my-website/my-website-dialog.html',
                    controller: 'MyWebsiteDialogController',
                    controllerAs: 'vm',
                    parent: 'my-website',
                    targetEvent: null,
                    clickOutsideToClose: true,
                    fullscreen: false,
                    resolve: {
                        entity: function () {
                            return {
                                name: null,
                                created: new Date(),
                                user_id: null,
                                template_id: null,
                                domain: null,
                                id: null,
                                isPaid: false
                            };
                        }
                    }
                }).then(function (answer) {
                    //$state.go('my-website', null, {reload: 'my-website'});
                }, function () {
                    $state.go('my-website', null, { reload: 'my-website' });
                });
            }]
        }).state('my-website.delete', {
            parent: 'my-website',
            url: '/mywebsites/delete/{id}',
            data: {
                authorities: []
            },
            params: {
                template_id: null
            },
            onEnter: ['$stateParams', '$state', '$mdDialog', 'MyWebsiteService', function ($stateParams, $state, $mdDialog, MyWebsiteService) {
                var confirm = $mdDialog.confirm()
                    .title('You delete this website?')
                    .textContent('This website and its template will be lost forever!')
                    .ariaLabel('Lucky day')
                    .targetEvent(null)
                    .ok('Yes')
                    .cancel('Cancel');

                $mdDialog.show(confirm).then(function () {
                    MyWebsiteService.del($stateParams.id);
                    $state.go('my-website', null, { reload: 'my-website' });
                }, function () {
                    $state.go('my-website', null, { reload: 'my-website' });
                });

            }]
        }).state('my-website.share', {
            parent: 'my-website',
            url: '/mywebsites/share/{id}',
            data: {
                authorities: []
            },
            params: {
                id: null
            },
            onEnter: ['$stateParams', '$state', '$mdBottomSheet', 'MyWebsiteService', function ($stateParams, $state, $mdBottomSheet, MyWebsiteService) {
                $mdBottomSheet.show({
                    templateUrl: 'app/customer/my-website/my-website-share.html',
                    controller: 'MyWebsiteShareController',
                    controllerAs: 'vm',
                    clickOutsideToClose: true,
                    resolve: {
                        entity: ['$stateParams', 'MyWebsiteService', function ($stateParams, MyWebsiteService) {
                            return MyWebsiteService.get($stateParams.id);
                        }]
                    }
                }).then(function (clickedItem) {
                    //console.log(clickedItem);
                }, function () {
                    $state.go('my-website', null, { reload: 'my-website' });
                });
            }]
        }).state('my-website.mail', {
            parent: 'my-website',
            url: '/mywebsites/mail/{id}',
            data: {
                authorities: []
            },
            params: {
                id: null
            },
            views: {
                'content@': {
                    templateUrl: 'app/customer/my-website/my-website-mail.html',
                    controller: 'MyWebsiteMailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                entity: ['$stateParams', 'MyWebsiteService', function ($stateParams, MyWebsiteService) {
                    return MyWebsiteService.get($stateParams.id);
                }]
            }
        }).state('my-website.customize', {
            parent: 'my-website',
            url: '/mywebsites/custom/{id}',
            data: {
                authorities: []
            },
            params: {
                id: null
            },
            views: {
                'content@': {
                    templateUrl: 'app/customer/my-website/my-website-custom.html',
                    controller: 'MyWebsiteCustomController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                entity: ['$stateParams', 'MyWebsiteService', function ($stateParams, MyWebsiteService) {
                    return MyWebsiteService.get($stateParams.id);
                }]
            }
        });


        $stateProvider.state('my-website-view', {
            url: '/mywebsites/view/{id}',
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
                'm-home@my-website-view': {
                    templateUrl:
                    function ($stateParams) {
                        if ($stateParams.website.custom.homepage.isEnable)
                            return 'app/web-modules/m-home/m-home.html';
                        else
                            return null;
                    },
                    controller: 'MHomeController',
                    controllerAs: 'vm',
                    resolve: {
                        entity: function ($stateParams) {
                            return $stateParams.website.custom.homepage;
                        },
                        song: function ($stateParams) {
                            return $stateParams.website.custom.song;
                        },
                        photo: function ($stateParams) {
                            return $stateParams.website.custom.photo;
                        }
                    }
                },
                'm-toolbar@my-website-view': {
                    templateUrl:
                    function ($stateParams) {
                        if ($stateParams.website.custom.toolbar.isEnable)
                            return 'app/web-modules/m-toolbar/m-toolbar.html';
                        else
                            return null;
                    },
                    controller: 'MToolBarController',
                    controllerAs: 'vm',
                    resolve: {
                        entity: function ($stateParams) {
                            return $stateParams.website.custom.toolbar;
                        }
                    }
                },
                'm-sidenav@my-website-view': {
                    templateUrl:
                    function ($stateParams) {
                        if ($stateParams.website.custom.sidenav.isEnable)
                            return 'app/web-modules/m-sidenav/m-sidenav.html';
                        else
                            return null;
                    },
                    controller: 'MSidenavController',
                    controllerAs: 'vm',
                    resolve: {
                        entity: function ($stateParams) {
                            return $stateParams.website.custom.sidenav;
                        }
                    }
                },
                'm-sidenav-list@my-website-view': {
                    templateUrl:
                    function ($stateParams) {
                        if ($stateParams.website.custom.sidenav.list.isEnable)
                            return 'app/web-modules/m-sidenav-list/m-sidenav-list.html';
                        else
                            return null;
                    },
                    controller: 'MSidenavListController',
                    controllerAs: 'vm',
                    resolve: {
                        entity: function ($stateParams) {
                            return $stateParams.website.custom.sidenav.list;
                        }
                    }
                },
                'm-footer@my-website-view': {
                    templateUrl:
                    function ($stateParams) {
                        if ($stateParams.website.custom.footer.isEnable)
                            return 'app/web-modules/m-footer/m-footer.html';
                        else
                            return null;
                    },
                    controller: 'MFooterController',
                    controllerAs: 'vm',
                    resolve: {
                        entity: function ($stateParams) {
                            return $stateParams.website.custom.footer;
                        }
                    }
                },
                'm-audio-player@my-website-view': {
                    templateUrl: 'app/web-modules/m-audio-player/m-audio-player.html',
                    controller: 'MAudioPlayerController',
                    controllerAs: 'vm'
                }
            }
        }).state('my-website-view.info', {
            parent: 'my-website-view',
            url: '/info',
            data: {
                authorities: []
            },
            views: {
                'm-home@my-website-view': {
                    templateUrl: 'app/web-modules/m-basic-info/m-basic-info.html',
                    controller: 'MBasicInfoController',
                    controllerAs: 'vm',
                    resolve: {
                        entity: function ($stateParams) {
                            return $stateParams.website.custom.basicinfo;
                        }
                    }
                }
            }
        }).state('my-website-view.photo', {
            parent: 'my-website-view',
            url: '/photos',
            data: {
                authorities: []
            },
            views: {
                'm-home@my-website-view': {
                    templateUrl: 'app/web-modules/m-photo/m-photo.html',
                    controller: 'MPhotoController',
                    controllerAs: 'vm',
                    resolve: {
                          entity: function ($stateParams) {
                            return $stateParams.website.custom.photo;
                        }
                    }
                }
            }
        }).state('my-website-view.song', {
            parent: 'my-website-view',
            url: '/songs',
            data: {
                authorities: []
            },
            views: {
                'm-home@my-website-view': {
                    templateUrl: 'app/web-modules/m-song/m-song.html',
                    controller: 'MSongController',
                    controllerAs: 'vm',
                    resolve: {
                         entity: function ($stateParams) {
                            return $stateParams.website.custom.song;
                        }
                    }
                }
            }
        });
    }
})();
