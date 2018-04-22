(function () {
    'use strict';

    angular
        .module('gsiteApp')
        .controller('MyWebsiteCustomController', MyWebsiteCustomController);

    MyWebsiteCustomController.$inject = ['$state', '$mdDialog', 'AlertService', 'entity'];

    function MyWebsiteCustomController($state, $mdDialog, AlertService, entity) {
        var vm = this;
        vm.website = null;

        vm.submit = submit;
        vm.customizeToolbar = customizeToolbar;
        vm.customizeSidenav = customizeSidenav;
        vm.customizeSidenavList = customizeSidenavList;
        vm.customizeHomepage = customizeHomepage;
        vm.customizeFooter = customizeFooter;
        vm.customizeBasicInfo = customizeBasicInfo;
        vm.customizeSong = customizeSong;
        vm.customizePhoto = customizePhoto;
        
        vm.website = entity;

        function submit() {
            AlertService.success('Save successfully!');
            $state.go('my-website', null, { reload: true });
        }

        function customizeToolbar() {
            if (vm.website.custom.toolbar.isEnable) {
                var templateUrl = 'app/web-modules/m-toolbar/m-toolbar-dialog.html';
                var controller = 'MToolbarDialogController';
                var entity = vm.website.custom.toolbar;
                customDialog(templateUrl, controller, entity);
            }
        }
        function customizeSidenav() {
            if (vm.website.custom.sidenav.isEnable) {
                var templateUrl = 'app/web-modules/m-sidenav/m-sidenav-dialog.html';
                var controller = 'MSidenavDialogController';
                var entity = vm.website.custom.sidenav;
                customDialog(templateUrl, controller, entity);
            }
        }

        function customizeSidenavList() {
            if (vm.website.custom.sidenav.isEnable && vm.website.custom.sidenav.list.isEnable) {
                var templateUrl = 'app/web-modules/m-sidenav-list/m-sidenav-list-dialog.html';
                var controller = 'MSidenavListDialogController';
                var entity = vm.website.custom.sidenav.list;
                customDialog(templateUrl, controller, entity);
            }
        }

        function customizeHomepage() {
            if (vm.website.custom.homepage.isEnable) {
                var templateUrl = 'app/web-modules/m-home/m-home-dialog.html';
                var controller = 'MHomeDialogController';
                var entity = vm.website.custom.homepage;
                customDialog(templateUrl, controller, entity);
            }
        }

        function customizeFooter() {
            if (vm.website.custom.footer.isEnable) {
                var templateUrl = 'app/web-modules/m-footer/m-footer-dialog.html';
                var controller = 'MFooterDialogController';
                var entity = vm.website.custom.footer;
                customDialog(templateUrl, controller, entity);
            }
        }

        function customizeBasicInfo() {
            if(vm.website.custom.basicinfo.isEnable){
                var templateUrl = 'app/web-modules/m-basic-info/m-basic-info-dialog.html';
                var controller = 'MBasicInfoDialogController';
                var entity = vm.website.custom.basicinfo;
                customDialog(templateUrl, controller, entity);
            }
        }
        function customizeSong() {
            if(vm.website.custom.song.isEnable){
                var templateUrl = 'app/web-modules/m-song/m-song-dialog.html';
                var controller = 'MSongDialogController';
                var entity = vm.website.custom.song;
                customDialog(templateUrl, controller, entity);
            }
        }

        function customizePhoto() {
            if(vm.website.custom.photo.isEnable){
                var templateUrl = 'app/web-modules/m-photo/m-photo-dialog.html';
                var controller = 'MPhotoDialogController';
                var entity = vm.website.custom.photo;
                customDialog(templateUrl, controller, entity);
            }
        }


        function customDialog(templateUrl, controller, entity) {
            $mdDialog.show({
                templateUrl: templateUrl,
                controller: controller,
                controllerAs: 'vm',
                parent: 'my-website.custom',
                targetEvent: null,
                clickOutsideToClose: true,
                fullscreen: false,
                resolve: {
                    entity: function () {
                        return entity;
                    }
                }
            });
        }

    }
})();