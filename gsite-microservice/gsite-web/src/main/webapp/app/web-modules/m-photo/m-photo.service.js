(function () {
    'use strict';
    angular
        .module('gsiteApp')
        .factory('MPhotoService', MPhotoService);

    MPhotoService.$inject = ['$mdDialog'];

    function MPhotoService($mdDialog) {

        var photoList = null;

        var instance = {
            loadPhotoList: loadPhotoList,
            view: view,
            viewAt: viewAt,
            getList: getList
        };

        function view(photo) {
            $mdDialog.show({
                templateUrl: 'app/web-modules/m-photo/m-photo-view-dialog.html',
                controller: 'MPhotoViewDialogController',
                controllerAs: 'vm',
                targetEvent: null,
                clickOutsideToClose: true,
                fullscreen: false,
                resolve: {
                    entity: function () {
                        return photo;
                    }
                }
            });
        }

        function viewAt(index) {
            var photo = photoList[index];
            view(photo);
        }

        function loadPhotoList(list) {
            photoList = list;
        }

        function getList() {
            return photoList;
        }

        return instance;
    }

})();
