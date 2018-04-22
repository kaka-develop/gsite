(function () {
    'use strict';

    angular
        .module('gsiteApp')
        .factory('LanguageService', LanguageService);

    LanguageService.$inject = ['$q', '$http', '$translate', 'LANGUAGES','tmhDynamicLocale'];

    function LanguageService ($q, $http, $translate, LANGUAGES,tmhDynamicLocale) {
        var service = {
            getAll: getAll,
            getCurrent: getCurrent,
            changeLanguage: changeLanguage
        };

        return service;

        function getAll () {
            var deferred = $q.defer();
            deferred.resolve(LANGUAGES);
            return deferred.promise;
        }

        function getCurrent () {
            var deferred = $q.defer();
            var language = $translate.storage().get('NG_TRANSLATE_LANG_KEY');

            deferred.resolve(language);

            return deferred.promise;
        }

        function changeLanguage(langKey) {
            $translate.use(langKey);
            tmhDynamicLocale.set(langKey);
        }
    }
})();
