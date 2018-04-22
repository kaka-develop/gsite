(function () {
    'use strict';

    angular
        .module('gsiteApp')
        .controller('MFooterController', MFooterController);

    MFooterController.$inject = ['$state', 'entity','LanguageService'];

    function MFooterController($state, entity,LanguageService) {
        var vm = this;

        vm.website = entity;

        if(vm.website == null)
            loadDefault()
        // else
        //     vm.footer = vm.website.custom.footer;



        vm.changeEnglish = changeEnglish;
        vm.changeVietnam = changeVietnam;
        vm.homeState = $state.current.name;

        // prevent reload page => make change root state
        if (vm.homeState.indexOf('.') > 0) {
            vm.homeState = vm.homeState.split('.')[0];
        }

        function changeEnglish() {
            LanguageService.changeLanguage('en');
        }

        function changeVietnam() {
            LanguageService.changeLanguage('vi');
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
        }

    }
})();
