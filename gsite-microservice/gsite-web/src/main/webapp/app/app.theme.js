(function () {
    'use strict';

    angular
        .module('gsiteApp')
        .config(themeConfig);

    themeConfig.$inject = ['$mdThemingProvider'];

    function themeConfig($mdThemingProvider) {
        $mdThemingProvider.theme('input')
            .primaryPalette('pink')
            .dark();
    }

})();
