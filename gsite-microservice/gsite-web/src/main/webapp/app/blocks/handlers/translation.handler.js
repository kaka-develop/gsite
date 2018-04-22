(function() {
    'use strict';

    angular
        .module('gsiteApp')
        .factory('translationHandler', translationHandler);

    translationHandler.$inject = ['$rootScope', '$window', '$state', '$translate'];

    function translationHandler($rootScope, $window, $state, $translate) {
        return {
            initialize: initialize,
            updateTitle: updateTitle
        };

        function initialize() {
            // if the current translation changes, update the window title
            var translateChangeSuccess = $rootScope.$on('$translateChangeSuccess', function() {
                updateTitle();
            });

            $rootScope.$on('$destroy', function () {
                if(angular.isDefined(translateChangeSuccess) && translateChangeSuccess !== null){
                    translateChangeSuccess();
                }
            });
        }

        function updateTitle(titleKey) {
            if (!titleKey && $state.$current.data && $state.$current.data.pageTitle) {
                titleKey = $state.$current.data.pageTitle;
            }
            $translate(titleKey || 'global.title').then(function (title) {
                $window.document.title = title;
            });
        }
    }
})();
