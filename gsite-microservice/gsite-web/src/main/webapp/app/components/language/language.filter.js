(function() {
    'use strict';

    angular
        .module('gsiteApp')
        .filter('findLanguageFromKey', findLanguageFromKey);

    function findLanguageFromKey() {
        return findLanguageFromKeyFilter;

        function findLanguageFromKeyFilter(lang) {
            return {
                'en': 'English',
                'vi': 'Tiếng Việt'
            }[lang];
        }
    }
})();
