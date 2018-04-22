(function() {
    'use strict';

    angular
        .module('gsiteApp')
        .factory('SocialService', SocialService);

    SocialService.$inject = ['$http', '$cookies'];

    function SocialService ($http, $cookies) {
        var socialService = {
            getProviderSetting: getProviderSetting,
            getProviderURL: getProviderURL,
            getCSRF: getCSRF
        };

        return socialService;

        function getProviderSetting (provider) {
            switch(provider) {
            case 'google': return 'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email';
            case 'facebook': return 'public_profile,email';
            case 'twitter': return '';
            default: return 'Provider setting not defined';
            }
        }

        function getProviderURL (provider) {
            return 'signin/' + provider;
        }

        function getCSRF () {
            return $cookies.get($http.defaults.xsrfCookieName);
        }
    }
})();
