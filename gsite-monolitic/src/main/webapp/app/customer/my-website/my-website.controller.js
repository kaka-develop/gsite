(function () {
    'use strict';

    angular
        .module('gsiteApp')
        .controller('MyWebsiteController', MyWebsiteController);

    MyWebsiteController.$inject = ['$scope', 'MyWebsiteOffline'];

    function MyWebsiteController($scope, MyWebsiteOffline ) {
        var vm = this;

        vm.refuse = MyWebsiteOffline.refuse;

        vm.websites = [];

        loadWebsites();

        function loadWebsites() {
            vm.websites = MyWebsiteOffline.all();
        }

        MyWebsiteOffline.subscribe($scope, function somethingChanged() {
            loadWebsites();
        });


    }
})();
