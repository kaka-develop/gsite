(function () {
    'use strict';

    angular
        .module('gsiteApp')
        .controller('SettingsController', SettingsController);

    SettingsController.$inject = ['$state'];

    function SettingsController($state) {
        var vm = this;
    }
})();