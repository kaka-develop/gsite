(function () {
    'use strict';

    angular
        .module('gsiteApp')
        .controller('MFooterController', MFooterController);

    MFooterController.$inject = ['$state', 'entity'];

    function MFooterController($state, entity) {
        var vm = this;

        vm.footer = entity;
        if (vm.footer == null)
            loadDefault();


        function loadDefault() {
            vm.footer = {
                isEnable: true,
                items: [
                    {
                        title: 'About',
                        url: '/#/basic-template/info'
                    },
                    {
                        title: 'Photos',
                        url: '/#/basic-template/photos'
                    },
                    {
                        title: 'Songs',
                        url: '/#/basic-template/songs'
                    }
                ]
            };
        }
    }
})();