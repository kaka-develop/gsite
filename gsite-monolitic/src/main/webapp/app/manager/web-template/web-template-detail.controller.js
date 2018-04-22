(function() {
    'use strict';

    angular
        .module('gsiteApp')
        .controller('WebTemplateDetailController', WebTemplateDetailController);

    WebTemplateDetailController.$inject = ['$scope', '$rootScope', 'previousState', 'entity', 'WebTemplate','TemplateStorage','AlertService'];

    function WebTemplateDetailController($scope, $rootScope, previousState, entity, WebTemplate,TemplateStorage,AlertService) {
        var vm = this;

        vm.webTemplate = entity;
        vm.previousState = previousState.name;

        var fileName = 'mainImage.jpg';
        vm.loading = false;
        vm.upload = upload;

        getMainImage();

        function upload(file) {
            if (file != null) {
                vm.loading = true;
                TemplateStorage.uploadTemplateImage(vm.webTemplate.id, file, fileName).then(onSuccess, onError);
            }

            function onSuccess(response) {
                vm.loading = false;
                vm.webTemplate.image = fileName;
                WebTemplate.update(vm.webTemplate);
                AlertService.success("OK !")
            }

            function onError(response) {
                vm.loading = false;
                console.log(response);
            }
        }

        function getMainImage() {
            if (vm.webTemplate.image == null)
                return;
            TemplateStorage.getTemplateImage(vm.webTemplate.id, fileName).then(onSuccess, onError);
            function onSuccess(response) {
                vm.tempImageLink = response.data.link;
            }

            function onError(response) {
                console.log(response);
            }
        }

        var unsubscribe = $rootScope.$on('gsiteApp:webTemplateUpdate', function(event, result) {
            vm.webTemplate = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
