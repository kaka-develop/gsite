(function() {
    'use strict';

    angular
        .module('gsiteApp')
        .config(cacheBusterConfig);

    cacheBusterConfig.$inject = ['httpRequestInterceptorCacheBusterProvider'];

    function cacheBusterConfig(httpRequestInterceptorCacheBusterProvider) {

        httpRequestInterceptorCacheBusterProvider.setMatchlist([/.*.html/,/.*.svg/, /.*views.*/,'https://content.dropboxapi.com'/*.*/, 'https://api.dropboxapi.com'/*.*/]);
    }
})();
