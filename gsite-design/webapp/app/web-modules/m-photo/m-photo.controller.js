(function () {
    'use strict';

    angular
        .module('gsiteApp')
        .controller('MPhotoController', MPhotoController);

    MPhotoController.$inject = ['$state', 'entity', 'MPhotoService'];

    function MPhotoController($state, entity, MPhotoService) {
        var vm = this;

        vm.photo = entity;
        if (vm.photo == null)
            loadDefault();

        vm.view = view;


        function loadDefault() {
            vm.selectedItem = {
                title: 'new day',
                url: 'content/images/photos/kaka-photo.jpg'
            };
            vm.photo = {
                isEnable: true,
                items: [
                    {
                        name: 'kaka-photo',
                        des: 'Real win in champion league. This is the most viewed photo of Ricardo Kaka.',
                        url: 'content/images/photos/kaka-photo.jpg'
                    },
                    {
                        name: 'chelsea-arse',
                        des: 'Best match, we should not miss in sunday',
                        url: 'content/images/photos/chelsea-arse.jpg'
                    },
                    {
                        name: 'chelsea-liv',
                        des: 'Super match with chelsea and liverpool',
                        url: 'content/images/photos/chelsea-liv.jpg'
                    }
                ]
            };
        }

        function view(photo) {
            MPhotoService.view(photo);
        }
    }
})();