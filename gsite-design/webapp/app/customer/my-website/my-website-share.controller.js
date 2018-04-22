(function() {
    'use strict';

    angular
        .module('gsiteApp')
        .controller('MyWebsiteShareController', MyWebsiteShareController);

    MyWebsiteShareController.$inject = ['$scope','$mdBottomSheet','entity'];

    function MyWebsiteShareController ($scope,$mdBottomSheet,entity) {
        var vm = this;
        vm.website = entity;
        vm.closeShare = closeShare;

        function closeShare() {
            $mdBottomSheet.hide();
        }
    }
})();
