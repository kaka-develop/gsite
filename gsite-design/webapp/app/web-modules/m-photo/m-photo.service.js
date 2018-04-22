(function () {
    'use strict';
    angular
        .module('gsiteApp')
        .factory('MPhotoService', MPhotoService);

    MPhotoService.$inject = ['$mdDialog'];

    function MPhotoService($mdDialog) {
        var instance = {
            view: view
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

        return instance;
    }

})();