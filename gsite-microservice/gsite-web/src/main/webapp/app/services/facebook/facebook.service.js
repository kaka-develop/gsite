(function() {
    'use strict';

    angular
        .module('gsiteApp')
        .factory('Facebook', Facebook);

    Facebook.$inject = [];

    function Facebook () {
        var service ={
            share: share
        };

        function share(url) {
            FB.ui({
                method: 'share',
                display: 'popup',
                href: url,
            }, function(response){});
        }
        return service;
    }
})();
