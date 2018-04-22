(function () {
    'use strict';

    angular
        .module('gsiteApp')
        .factory('subdomainHandler', subdomainHandler);

    subdomainHandler.$inject = ['$location', '$state', 'Website'];

    function subdomainHandler($location, $state, Website) {
        var subdomain = null;
        var host = null;

        var instance = {
            initialize: initialize,
            getSubdomain: getSubdomain,
            getHost: getHost
        };


        function initialize() {
            loadSubdomain();
        }

        function getHost(sub) {
            if (sub != null)
                sub = sub + ".";

            var fullHost = $location.protocol() + '://' + sub + host + ":" + $location.port()
            return fullHost;
        }



        function loadSubdomain() {
            host = $location.host();
            if (host.indexOf('.') <= 0)
                return;
            var array = host.split('.');
            if (array.length > 2 || array[1] == 'localhost') {
                subdomain = array[0];
                if (subdomain != 'www')
                    handleSubdomain(subdomain);
            }
        }

        function handleSubdomain(subdomain) {
            if (subdomain != null) {
                Website.domain({
                    domain: subdomain
                }, success, error);
                return;
            }

            function success(result) {
                $state.go("view-website", {
                    website: result
                });
            }

            function error() {
                $state.go("pagenotfound");
            }
        }

        function getSubdomain() {
            return subdomain;
        }


        return instance;
    }
})
();
