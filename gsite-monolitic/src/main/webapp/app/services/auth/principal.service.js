(function () {
    'use strict';

    angular
        .module('gsiteApp')
        .factory('Principal', Principal);

    Principal.$inject = ['$q', 'Account', '$rootScope'];

    function Principal($q, Account, $rootScope) {
        var _identity,
            _authenticated = false,
            _isSocial = true;

        var service = {
            authenticate: authenticate,
            hasAnyAuthority: hasAnyAuthority,
            hasAuthority: hasAuthority,
            identity: identity,
            subscribe: subscribe,
            isAuthenticated: isAuthenticated,
            isIdentityResolved: isIdentityResolved
        };

        return service;

        function authenticate(identity) {
            _identity = identity;
            _authenticated = identity !== null;

            if (_isSocial) {
                Account.social().$promise
                    .then(getSocialAccountThen);
            }
        }


        function getSocialAccountThen(account) {
            if(account.data != ""){
                _identity["displayName"] = account.data.displayName;
                _identity["imageURL"] = account.data.imageURL;
                notify();
            }else
                _isSocial = false;
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
                deferred.resolve(_identity);
                notify();
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

        function subscribe(scope, callback) {
            var handler = $rootScope.$on('notifying-service-event', callback);
            scope.$on('$destroy', handler);
        }

        function notify() {
            $rootScope.$emit('notifying-service-event');
        }
    }
})();
