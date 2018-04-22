(function () {
    'use strict';

    angular
        .module('gsiteApp', [
            'ngStorage',
            'tmh.dynamicLocale',
            'pascalprecht.translate',
            'ngResource',
            'ngCookies',
            'ngAria',
            'ngCacheBuster',
            'ngFileUpload',
            'ui.bootstrap',
            'ui.router',
            'infinite-scroll',
            // jhipster-needle-angularjs-add-module JHipster will add new module here
            'angular-loading-bar',
            'ngMaterial',
            'mdColorPicker',
            'ngFileUpload',
            'ngAudio',
            'ngMessages',
            'ngPassword'
        ])
        .run(run);

    run.$inject = ['stateHandler','subdomainHandler', 'translationHandler'];

    function run(stateHandler, subdomainHandler,translationHandler) {
        stateHandler.initialize();
        subdomainHandler.initialize();
        translationHandler.initialize();
    }
})();
