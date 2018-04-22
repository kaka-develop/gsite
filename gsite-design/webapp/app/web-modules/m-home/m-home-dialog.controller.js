(function () {
    'use strict';

    angular
        .module('gsiteApp')
        .controller('MHomeDialogController', MHomeDialogController);

    MHomeDialogController.$inject = ['$state', '$scope', 'entity', 'Upload'];

    function MHomeDialogController($state, $scope, entity, Upload) {
        var vm = this;

        vm.homepage = entity;

        vm.upload = upload;
        // for view
        // vm.upload(vm.mainImage)

        // upload on file select or drop
        function upload(file) {
            Upload.upload({
                url: 'content/images/photos',
                data: { file: file}
            }).then(function (resp) {
                vm.homepage.mainImage = file.name;
                console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
            }, function (resp) {
                console.log('Error status: ' + resp.status);
            }, function (evt) {
                var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
            });
        };
    }
})();