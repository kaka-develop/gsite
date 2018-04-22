(function() {
    'use strict';

    angular
        .module('gsiteApp')
        .controller('MyWebsiteCustomController', MyWebsiteCustomController);

    MyWebsiteCustomController.$inject = ['$timeout','$mdDialog', 'entity', 'MyWebsiteOffline','Principal', 'previousState','subdomainHandler'];

    function MyWebsiteCustomController ($timeout,$mdDialog, entity, MyWebsiteOffline,Principal, previousState,subdomainHandler) {
        var vm = this;

        vm.templates = [];

        vm.myWebsite = entity;
        vm.save = save;

        vm.getHost = subdomainHandler.getHost;
        vm.previousState = previousState.name;

        vm.customizeToolbar = customizeToolbar;
        vm.customizeSidenav = customizeSidenav;
        vm.customizeHomepage = customizeHomepage;
        vm.customizeBasicInfo = customizeBasicInfo;
        vm.customizeSong = customizeSong;
        vm.customizePhoto = customizePhoto;



        Principal.identity().then(function(account) {
            vm.myWebsite.user_id = account.id;
        });

        $timeout(function (){
            angular.element('md-input-container:eq(1)>input').focus();
        });

        function save () {
            vm.isSaving = true;
            MyWebsiteOffline.updateWebViewAll(vm.myWebsite);
        }


        function customizeToolbar() {
            if (vm.myWebsite.custom.toolbar.isEnable) {
                var templateUrl = 'app/web-modules/m-toolbar/m-toolbar-dialog.html';
                var controller = 'MToolbarDialogController';
                var entity = vm.myWebsite.custom.toolbar;
                customDialog(templateUrl, controller, entity);
            }
        }
        function customizeSidenav() {
            if (vm.myWebsite.custom.sidenav.isEnable) {
                var templateUrl = 'app/web-modules/m-sidenav/m-sidenav-dialog.html';
                var controller = 'MSidenavDialogController';
                var entity = vm.myWebsite.custom.sidenav;
                customDialog(templateUrl, controller, entity);
            }
        }



        function customizeHomepage() {
            if (vm.myWebsite.custom.homepage.isEnable) {
                var templateUrl = 'app/web-modules/m-home/m-home-dialog.html';
                var controller = 'MHomeDialogController';
                var entity = vm.myWebsite.custom.homepage;
                customDialog(templateUrl, controller, entity);
            }
        }



        function customizeBasicInfo() {
            if(vm.myWebsite.custom.basicInfo.isEnable){
                var templateUrl = 'app/web-modules/m-basic-info/m-basic-info-dialog.html';
                var controller = 'MBasicInfoDialogController';
                var entity = vm.myWebsite.custom.basicInfo;
                customDialog(templateUrl, controller, entity);
            }
        }
        function customizeSong() {
            if(vm.myWebsite.custom.song.isEnable){
                var templateUrl = 'app/web-modules/m-song/m-song-dialog.html';
                var controller = 'MSongDialogController';
                var entity = vm.myWebsite.custom.song;
                customDialog(templateUrl, controller, entity);
            }
        }

        function customizePhoto() {
            if(vm.myWebsite.custom.photo.isEnable){
                var templateUrl = 'app/web-modules/m-photo/m-photo-dialog.html';
                var controller = 'MPhotoDialogController';
                var entity = vm.myWebsite.custom.photo;
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
                    },
                    webId: function () {
                        return vm.myWebsite.id;
                    }
                }
            });
        }
    }
})();
