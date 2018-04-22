(function () {
    'use strict';

    angular
        .module('gsiteApp')
        .controller('MyWebsiteDialogController', MyWebsiteDialogController);

    MyWebsiteDialogController.$inject = ['$scope', '$state', '$mdDialog', 'MyWebsiteService','TemplateService'];

    function MyWebsiteDialogController($scope, $state, $mdDialog, MyWebsiteService,TemplateService) {
        var vm = this;

        vm.website = {
            name: null,
            des: null,
            domain: null,
            image: 'temp-default',
            created: new Date(),
            template: null,
            custom: {
                toolbar: {
                    isEnable: true,
                    title: 'Person',
                    textColor: '#FFFFFF',
                    backgroundColor: 'blue'
                },
                homepage: {
                    isEnable: true
                },
                footer: {
                    isEnable: true
                },
                sidenav: {
                    isEnable: true,
                    title: 'Person',
                    textColor: '#FFFFFF',
                    barColor: 'blue',
                    backgroundColor: 'white',
                    list: {
                        isEnable: true,
                        choices: [
                            {
                                title: 'Basic information',
                                subTitle: 'Overview of what you should know',
                                icon: 'person'
                            },
                            {
                                title: 'Photo Album',
                                subTitle: 'Album contain all photo of reciever',
                                icon: 'photo_library'
                            },
                            {
                                title: 'Favorite Songs',
                                subTitle: 'All favorite songs and their playlist',
                                icon: 'library_music'
                            },
                            {
                                title: 'Favorite Videos',
                                subTitle: 'All favorite and most viewed videos',
                                icon: 'video_library'
                            }
                        ]
                    }
                }
            }
        };

        vm.templates = TemplateService.all();

        vm.closeDialog = closeDialog;
        vm.submit = submit;

        function closeDialog() {
            $mdDialog.cancel();
        }

        function submit() {
            MyWebsiteService.add(vm.website);
            $mdDialog.hide();
            $state.go('website-payment');
        }
    }
})();
