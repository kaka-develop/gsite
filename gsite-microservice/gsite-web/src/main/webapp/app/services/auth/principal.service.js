(function () {
    'use strict';

    angular
        .module('gsiteApp')
        .factory('Principal', Principal);

    Principal.$inject = ['$q', 'Account','$rootScope','MyWebsiteOffline'];

    function Principal($q, Account,$rootScope,MyWebsiteOffline) {
        var _identity,
            _authenticated = false;

        var service = {
            authenticate: authenticate,
            hasAnyAuthority: hasAnyAuthority,
            hasAuthority: hasAuthority,
            identity: identity,
            isAuthenticated: isAuthenticated,
            isIdentityResolved: isIdentityResolved,
            subscribe: subscribe
        };

        return service;

        function authenticate(identity) {
            _identity = identity;
            _authenticated = identity !== null;

        }


        function hasAnyAuthority(authorities) {
            if (!_authenticated || !_identity || !_identity.authorities) {
                return false;
            }

            for (var i = 0; i < authorities.length; i++) {
                if (_identity.authorities.indexOf(authorities[i]) !== -1) {
                    return true;
                }
            }

            return false;
        }

        function hasAuthority(authority) {
            if (!_authenticated) {
                return $q.when(false);
            }

            return this.identity().then(function (_id) {
                return _id.authorities && _id.authorities.indexOf(authority) !== -1;
            }, function () {
                return false;
            });
        }

        function identity(force) {
            var deferred = $q.defer();

            if (force === true) {
                _identity = undefined;
            }

            // check and see if we have retrieved the identity data from the server.
            // if we have, reuse it by immediately resolving
            if (angular.isDefined(_identity)) {
                deferred.resolve(_identity);
                return deferred.promise;
            }

            // retrieve the identity data from the server, update the identity object, and then resolve.
            Account.get().$promise
                .then(getAccountThen)
                .catch(getAccountCatch);


            return deferred.promise;

            function getAccountThen(account) {
                _identity = account.data;
                _authenticated = true;
                loadSocialAccount(_identity);
                deferred.resolve(_identity);
                notify();
                loadUserWebsites();
            }

            function getAccountCatch() {
                _identity = null;
                _authenticated = false;
                deferred.resolve(_identity);
            }

        }

        function isAuthenticated() {
            return _authenticated;
        }

        function isIdentityResolved() {
            return angular.isDefined(_identity);
        }


        function loadUserWebsites() {
            MyWebsiteOffline.checkUser(_identity.id,_identity.email);
        }


        function subscribe(scope, callback) {
            var handler = $rootScope.$on('notifying-service-event', callback);
            scope.$on('$destroy', handler);
        }

        function notify() {
            $rootScope.$emit('notifying-service-event');
        }

        function loadSocialAccount(account) {
            Account.social().$promise
                .then(getSocialAccountThen);
            function getSocialAccountThen(result) {
                if (result.data != "") {
                    account["displayName"] = result.data.displayName;
                    account["imageURL"] = result.data.imageURL;
                }
            }
        }



    }
})();
