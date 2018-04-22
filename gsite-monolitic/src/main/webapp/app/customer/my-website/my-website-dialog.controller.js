(function () {
    'use strict';

    angular
        .module('gsiteApp')
        .controller('MyWebsiteDialogController', MyWebsiteDialogController);

    MyWebsiteDialogController.$inject = [ '$scope', '$state', '$mdDialog', 'entity', 'MyWebsite', 'WebTemplate', 'Principal','MyWebsiteOffline'];

    function MyWebsiteDialogController($scope, $state, $mdDialog, entity, MyWebsite, WebTemplate, Principal,MyWebsiteOffline) {
        var vm = this;

        vm.templates = [];

        vm.myWebsite = entity;

        vm.isDomainError = false;
        vm.closeDialog = closeDialog;
        vm.save = save;

        Principal.identity().then(function (account) {
            vm.myWebsite.user_id = account.login;
            clearUnPaidWebsites(account.login);
        });


        function closeDialog() {
            $mdDialog.cancel('cancel');
        }

        function save() {
            vm.isSaving = true;
            if (vm.myWebsite.id !== null) {
                MyWebsite.update(vm.myWebsite, onSaveSuccess, onSaveError);
            } else {
                MyWebsite.create(vm.myWebsite, onSaveSuccess, onSaveError);
            }
            $state.go('my-website', null, {
                reload: 'my-website'
            });
        }

        function onSaveSuccess(result) {
            MyWebsiteOffline.loadAll();
            $scope.$emit('gsiteApp:myWebsiteUpdate', result);
            $mdDialog.hide();
            vm.isSaving = false;
        }

        function onSaveError(result) {
            vm.isSaving = false;
            if (result.data != null) {
                $mdDialog.hide();
                $state.go("website-payment", {id: result.data.id});
            } else {
                vm.isDomainError = true;
            }
        }

        function clearUnPaidWebsites(userId) {
            MyWebsite.getUnpaid({user_id: userId}, onSuccess);

            function onSuccess(data) {
                for (var i = 0; i < data.length; i++) {
                    MyWebsite.delete({webId: data[i].id});
                }
            }
        }


        findAllTemplates();

        function findAllTemplates() {
            WebTemplate.query({}, onSuccess);

            function onSuccess(data) {
                for (var i = 0; i < data.length; i++) {
                    vm.templates.push(data[i]);
                }
            }
        }
    }
})();

