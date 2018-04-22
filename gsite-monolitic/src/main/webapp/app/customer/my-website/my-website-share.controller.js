(function () {
    'use strict';

    angular
        .module('gsiteApp')
        .controller('MyWebsiteShareController', MyWebsiteShareController);

    MyWebsiteShareController.$inject = ['entity', '$mdBottomSheet','Facebook','$window','subdomainHandler'];

    function MyWebsiteShareController(entity, $mdBottomSheet,Facebook,$window,subdomainHandler) {
        var vm = this;

        vm.myWebsite = entity;

        vm.shareFacebook = shareFacebook;
        vm.shareTwitter = shareTwitter;

        vm.closeShare = closeShare;

        function closeShare() {
            $mdBottomSheet.hide();
        }


        function shareFacebook() {
            var domain = subdomainHandler.getHost(vm.myWebsite.domain);
            Facebook.share(domain);
        }


        function shareTwitter() {
            var domain = subdomainHandler.getHost(vm.myWebsite.domain);
            var text = vm.myWebsite.name;
            var href = "https://twitter.com/share?"
                + "url=" + domain
                + "&text=" + text;
            $window.open(href);
        }

    }
})();
