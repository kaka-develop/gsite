(function () {
    'use strict';

    angular
        .module('gsiteApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
            .state('my-website', {
                parent: 'customer',
                url: '/my-website',
                data: {
                    authorities: ['ROLE_USER']
                },
                views: {
                    'content@': {
                        templateUrl: 'app/customer/my-website/my-websites.html',
                        controller: 'MyWebsiteController',
                        controllerAs: 'vm'
                    }
                },
                resolve: {
                    mainTranslatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('my-website');
                        return $translate.refresh();
                    }]
                }
            }).state('my-website.new', {
                parent: 'my-website',
                url: '/new/{template}',
                data: {
                    authorities: ['ROLE_USER']
                },
                params: {
                    template: null
                },
                onEnter: ['$stateParams', '$state', '$mdDialog', function ($stateParams, $state, $mdDialog) {
                    $mdDialog.show({
                        templateUrl: 'app/customer/my-website/my-website-dialog.html',
                        controller: 'MyWebsiteDialogController',
                        controllerAs: 'vm',
                        targetEvent: null,
                        clickOutsideToClose: true,
                        fullscreen: false,
                        resolve: {
                            entity: [function () {
                                var entity =  {
                                    id: null,
                                    name: null,
                                    des: null,
                                    domain: null,
                                    template: $stateParams.template,
                                    created: new Date(),
                                    user_id: null,
                                    paid: false,
                                    sharedUsers: [],
                                    custom: {
                                        toolbar: {
                                            isEnable: true,
                                            title: "Person",
                                            textColor: '#FFFFFF'
                                        },
                                        homepage: {
                                            isEnable: true,
                                            name: "name",
                                            fullName: "Full name",
                                            avatar: 'none',
                                            mainImage: 'none'
                                        },
                                        sidenav: {
                                            isEnable: true,
                                            title: "Sidenav",
                                            textColor: '#FFFFFF',
                                            backgroundColor: 'white'
                                        },
                                        footer: {
                                            isEnable: true
                                        },
                                        basicInfo: {
                                            isEnable: true,
                                            firstName: 'First name',
                                            lastName: 'Last name',
                                            email: null,
                                            age: 21,
                                            des: 'description'
                                        },
                                        song: {
                                            isEnable: true,
                                            items: []
                                        },
                                        photo: {
                                            isEnable: true,
                                            items: []
                                        }
                                    }
                                };

                                return entity;
                            }]
                        }
                    }).then(function () {
                        // $state.go('my-website', null, {
                        //     reload: 'my-website'
                        // });
                    }, function () {
                        $state.go('my-website');
                    });
                }]
            }).state('my-website.customize', {
                parent: 'my-website',
                url: '/{id}/customize',
                data: {
                    authorities: ['ROLE_USER']
                },
                views: {
                    'content@': {
                        templateUrl: function ($stateParams) {
                            return 'app/customer/my-website/my-website-custom.html';
                        },
                        controller: 'MyWebsiteCustomController',
                        controllerAs: 'vm'
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('my-website');
                        return $translate.refresh();
                    }],
                    entity: ['$stateParams', 'Website', function ($stateParams, Website) {
                        return Website.get({
                            id: $stateParams.id
                        }).$promise;
                    }],
                    previousState: ["$state", function ($state) {
                        var currentStateData = {
                            name: $state.current.name || 'my-website',
                            params: $state.params,
                            url: $state.href($state.current.name, $state.params)
                        };
                        return currentStateData;
                    }]
                }
            }).state('my-website.share', {
                parent: 'my-website',
                url: '/share/{id}',
                data: {
                    authorities: ['ROLE_USER']
                },
                params: {
                    id: null
                },
                onEnter: ['$stateParams', '$state', '$mdBottomSheet', function ($stateParams, $state, $mdBottomSheet) {
                    $mdBottomSheet.show({
                        templateUrl: 'app/customer/my-website/my-website-share.html',
                        controller: 'MyWebsiteShareController',
                        controllerAs: 'vm',
                        clickOutsideToClose: true,
                        resolve: {
                            entity: ['$stateParams', 'Website', function ($stateParams, Website) {
                                return Website.get({
                                    id: $stateParams.id
                                }).$promise;
                            }],
                            translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                                $translatePartialLoader.addPart('my-website');
                                return $translate.refresh();
                            }]

                        }
                    }).then(function (clickedItem) {
                        //console.log(clickedItem);
                    }, function () {
                         $state.go('my-website');
                    });
                }]
            }).state('my-website.mail', {
                parent: 'my-website',
                url: '/mail/{id}',
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
                    entity: ['$stateParams', 'Website', function ($stateParams, Website) {
                        return Website.get({
                            id: $stateParams.id
                        });
                    }]
                }
            }).state('my-website.delete', {
                parent: 'my-website',
                url: '/{id}/delete',
                data: {
                    authorities: ['ROLE_USER']
                },
                onEnter: ['$stateParams', '$state', '$mdDialog', 'MyWebsiteOffline', function ($stateParams, $state, $mdDialog, MyWebsiteOffline) {
                    var confirm = $mdDialog.confirm()
                        .title('You delete this website?')
                        .textContent('This website and its template will be lost forever!')
                        .ariaLabel('Lucky day')
                        .targetEvent(null)
                        .ok('Yes')
                        .cancel('Cancel');

                    $mdDialog.show(confirm).then(function () {
                        MyWebsiteOffline.deleteWeb($stateParams.id);
                    }, function () {
                        $state.go('^');
                    });
                }]
            });

        $stateProvider.state('my-website-view', {
            url: '/my-website/view',
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
                'm-toolbar@my-website-view': {
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
                'm-sidenav@my-website-view': {
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
                'm-footer@my-website-view': {
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
                'm-audio-player@my-website-view': {
                    templateUrl: 'app/web-modules/m-audio-player/m-audio-player.html',
                    controller: 'MAudioPlayerController',
                    controllerAs: 'vm'
                }
            },resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('template');
                    return $translate.refresh();
                }]
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
                            return $stateParams.website.custom.basicInfo;
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

                    }
                }
            }
        });
    }
})();
