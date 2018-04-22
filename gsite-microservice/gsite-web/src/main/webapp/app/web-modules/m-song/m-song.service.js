(function () {
    'use strict';
    angular
        .module('gsiteApp')
        .factory('MSongService', MSongService);

    MSongService.$inject = ['ngAudio', '$rootScope'];

    function MSongService(ngAudio, $rootScope) {
        var songList = null;
        var currentSong = null;
        var audio = null;
        var isPlaying = false;
        var currentIndex = 0;

        var instance = {
            loadSongList: loadSongList,
            getList: getList,
            loadSongAt: loadSongAt,
            play: play,
            stop: stop,
            pause: pause,
            playNext: playNext,
            playPrevious: playPrevious,
            subscribe: subscribe,
            checkPlaying: checkPlaying,
            getCurrentSong: getCurrentSong,
            getCurrentAudio: getCurrentAudio,
            setLoop: setLoop
        };


        function loadSongList(list) {
            songList = list;
        }

        function getList() {
            return songList;
        }

        function loadSongAt(index) {
            currentIndex = index;
            currentSong = songList[index];
            if (audio)
                stop();
            audio = ngAudio.load(currentSong.tempLink);
            return audio;
        }

        function play() {
            audio.play();
            isPlaying = true;
            notify();
        }

        function stop() {
            if (audio) {
                audio.stop();
                isPlaying = false;
                notify();
            }
        }

        function pause() {
            audio.pause();
            isPlaying = false;
            notify();
        }

        function playNext() {
            if (currentIndex + 1 < songList.length)
                loadSongAt(currentIndex + 1);
            else
                loadSongAt(0);

            play();
        }

        function playPrevious() {
            if (currentIndex - 1 >= 0)
                loadSongAt(currentIndex - 1);
            else
                loadSongAt(songList.length - 1);

            play();
        }

        function setLoop(isLoop) {
            audio.loop = isLoop;
        }

        function checkPlaying() {
            return isPlaying;
        }

        function getCurrentSong() {
            return currentSong;
        }

        function getCurrentAudio() {
            return audio;
        }

        function subscribe(scope, callback) {
            var handler = $rootScope.$on('notifying-service-event', callback);
            scope.$on('$destroy', handler);
        }

        function notify() {
            $rootScope.$emit('notifying-service-event');
        }

        return instance;
    }

})();
