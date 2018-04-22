(function () {
    'use strict';

    angular
        .module('gsiteApp')
        .controller('MSongController', MSongController);

    MSongController.$inject = ['$scope', 'entity', 'MSongService'];

    function MSongController($scope, entity, MSongService) {
        var vm = this;

        vm.song = entity;
        if (vm.song == null)
            loadDefault();

        vm.playAt = playAt;

        function loadDefault() {
            vm.song = {
                isEnable: true,
                items: [{
                        title: 'Happy',
                        artist: 'Pharrell Williams',
                        url: 'content/media/songs/Happy.mp3',
                        length: '3:00',
                        date: '2017-01-12'
                    },
                    {
                        title: 'Paris',
                        artist: 'The Chainsmokers',
                        url: 'content/media/songs/Paris.mp3',
                        length: '3:15',
                        date: '2017-01-15'
                    },
                    {
                        title: 'Shape of You',
                        artist: 'Ed Sheeran',
                        url: 'content/media/songs/Shape-of-You.mp3',
                        length: '2:45',
                        date: '2016-09-01'
                    }
                ]
            };
            MSongService.loadSongList(vm.song.items);
        }

        function playAt(index) {
            MSongService.loadSongAt(index);
            MSongService.play();
        }
    }
})();