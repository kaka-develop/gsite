(function() {
    'use strict';

    angular
        .module('gsiteApp')
        .controller('AlertController', AlertController);

    AlertController.$inject = ['$scope','params'];

    function AlertController ($scope,params) {
        var vm = this;
        vm.msg = params.msg;
    }
})();
