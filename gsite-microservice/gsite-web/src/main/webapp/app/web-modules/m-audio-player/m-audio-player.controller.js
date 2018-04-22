(function () {
    'use strict';

    angular
        .module('gsiteApp')
        .controller('MAudioPlayerController', MAudioPlayerController);

    MAudioPlayerController.$inject = ['$scope', 'MSongService'];

    function MAudioPlayerController($scope, MSongService) {
        var vm = this;

        vm.isShow = false;
        vm.hide = hide;
        vm.song = MSongService.getCurrentSong();

        vm.isPlaying = false;
        vm.isRepeatOne = false;
        vm.play = play;
        vm.back = back;
        vm.next = next;
        vm.repeatOne = repeatOne;
        vm.audio = null;

        MSongService.subscribe($scope, function somethingChanged() {
            vm.isPlaying = MSongService.checkPlaying();
            vm.song = MSongService.getCurrentSong();
            vm.audio = MSongService.getCurrentAudio();
            vm.isShow = true;
        });

        function hide() {
            MSongService.stop();
            vm.isShow = false;
        }

        function play() {
            if (vm.isPlaying) {
                MSongService.pause();
            } else {
                MSongService.play();
            }
        }

        function next() {
            MSongService.playNext();
        }

        function back() {
            MSongService.playPrevious();
        }

        function repeatOne() {
            vm.isRepeatOne = !vm.isRepeatOne;
            MSongService.setLoop(vm.isRepeatOne);
        }
    }
})();
