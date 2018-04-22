(function () {
    'use strict';

    angular
        .module('gsiteApp')
        .controller('MyWebsiteController', MyWebsiteController);

    MyWebsiteController.$inject = ['$scope', 'MyWebsiteOffline', '$mdDialog'];

    function MyWebsiteController($scope, MyWebsiteOffline, $mdDialog) {
        var vm = this;

        vm.refuse = refuseSharedWebsite;
        ;

        vm.websites = [];

        vm.sharedWebsites = [];

        loadWebsites();

        function loadWebsites() {
            vm.websites = MyWebsiteOffline.all();
            vm.sharedWebsites = MyWebsiteOffline.allSharedWebsites();
        }

        MyWebsiteOffline.subscribe($scope, function somethingChanged() {
            loadWebsites();
        });


        function refuseSharedWebsite(id) {
            var confirm = $mdDialog.confirm()
                .title('You refuse this website?')
                .textContent('This shared website and its template will be lost forever!')
                .ariaLabel('Lucky day')
                .targetEvent(null)
                .ok('Yes')
                .cancel('Cancel');

            $mdDialog.show(confirm).then(function () {
                MyWebsiteOffline.refuse(id);
            });
        }

    }
})();
