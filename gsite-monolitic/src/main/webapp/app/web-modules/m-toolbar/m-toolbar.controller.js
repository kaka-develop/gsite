(function () {
    'use strict';

    angular
        .module('gsiteApp')
        .controller('MToolBarController', MToolBarController);

    MToolBarController.$inject = ['$scope','$state', '$mdSidenav', 'entity'];

    function MToolBarController($scope,$state, $mdSidenav, entity) {
        var vm = this;

        vm.homeState = $state.current.name;

        // prevent reload page => make change root state
        if (vm.homeState.indexOf('.') > 0) {
            vm.homeState = vm.homeState.split('.')[0];
        }
        vm.website = entity;
        if (vm.website == null)
            loadDefault();
        else
            vm.toolbar = vm.website.custom.toolbar;

        // sidenav
        vm.toggleLeft = buildToggler('m-sidenav');

        function buildToggler(componentId) {
            return function () {
                $mdSidenav(componentId).toggle();
            };
        }

        function loadDefault() {
            vm.website = {
              custom: {
                  basicInfo: {
                      isEnable: true
                  },
                  song: {
                      isEnable: true
                  },
                  photo: {
                      isEnable: true
                  }
              }
            };
            vm.toolbar = {
                isEnable: true,
                title: 'Person',
                textColor: '#FFFFFF'
            };

            vm.list = {
                isEnable: true,
                choices: [{
                        title: 'Information',
                        subTitle: 'Overview of what you should know',
                        icon: 'person',
                        state: vm.homeState + '.info'
                    },
                    {
                        title: 'Photos',
                        subTitle: 'Album contain all photo of reciever',
                        icon: 'photo_library',
                        state: vm.homeState + '.photo'
                    },
                    {
                        title: 'Songs',
                        subTitle: 'All favorite songs and their playlist',
                        icon: 'library_music',
                        state: vm.homeState + '.song'
                    }
                ]
            };
        }
    }
})();
