(function () {
    'use strict';

    angular
        .module('gsiteApp')
        .controller('MSongController', MSongController);

    MSongController.$inject = ['MSongService','$window'];

    function MSongController(MSongService,$window) {
        var vm = this;

        vm.songs = MSongService.getList();

        vm.playAt = playAt;
        vm.downloadSongAt = downloadSongAt;

        function playAt(index) {
            MSongService.loadSongAt(index);
            MSongService.play();
        }

        function downloadSongAt(index) {
            var song = vm.songs[index];
            var songUrl = song.tempLink;
            $window.open(songUrl, '_blank');
        }
    }
})();
