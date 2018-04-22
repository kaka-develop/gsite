(function () {
    'use strict';

    angular
        .module('gsiteApp')
        .controller('MHomeController', MHomeController);

    MHomeController.$inject = ['$state','$window','entity', 'song', 'photo', 'MPhotoService', 'MSongService'];

    function MHomeController($state, $window , entity, song, photo, MPhotoService, MSongService) {
        var vm = this;
        vm.homeState = $state.current.name;

        vm.homepage = entity;
        if (vm.homepage == null)
            loadDefault();
        else
            loadCustom();

        vm.viewPhoto = viewPhoto;
        vm.playSongAt = playSongAt;
        vm.downloadSongAt = downloadSongAt;

        function loadCustom() {
            vm.songs = song.items;
            vm.photos = photo.items;
            MSongService.loadSongList(vm.songs);
        }

        function loadDefault() {
            vm.photos = [
                {
                    name: 'kaka-photo',
                    des: 'Real win in champion league. This is the most viewed photo of Ricardo Kaka.',
                    url: 'content/images/photos/kaka-photo.jpg'
                },
                {
                    name: 'chelsea-arse',
                    des: 'Best match, we should not miss in sunday',
                    url: 'content/images/photos/chelsea-arse.jpg'
                },
                {
                    name: 'chelsea-liv',
                    des: 'Super match with chelsea and liverpool',
                    url: 'content/images/photos/chelsea-liv.jpg'
                }
            ];

            vm.songs = [
                {
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
            ];

            MSongService.loadSongList(vm.songs);

           

            vm.homepage = {
                name: 'Kaká',
                fullName: 'Ricardo Izecson dos Santos Leite',
                avatar: 'kaka'
            };
        }


        function viewPhoto(photo) {
            MPhotoService.view(photo);
        }

        function playSongAt(index) {
            MSongService.loadSongAt(index);
            MSongService.play();
        }

        function downloadSongAt(index) {
            var song = vm.songs[index];
            var songUrl = 'http://' + $window.location.host + '/' + song.url;
            $window.open(songUrl, '_blank');
        }
    }
})();