(function () {
    'use strict';

    angular
        .module('gsiteApp')
        .controller('MHomeController', MHomeController);

    MHomeController.$inject = ['$state', '$window', 'entity', 'MHomeService', 'MPhotoService', 'MSongService', 'MyWebsiteStorage','AlertService'];

    function MHomeController($state, $window, entity, MHomeService, MPhotoService, MSongService, MyWebsiteStorage,AlertService) {
        var vm = this;

        var website = entity;

        vm.songs = [];
        vm.photos = [];

        vm.viewPhoto = viewPhoto;
        vm.playSongAt = playSongAt;
        vm.downloadSongAt = downloadSongAt;


        if (website == null)
            loadDefault();
        else {
            loadFromService();
            loadCustom();
        }

        function loadFromService() {
            vm.mainImageLink = MHomeService.getImageLink();
            vm.photos = MPhotoService.getList();
            vm.songs = MSongService.getList();
        }


        function loadCustom() {
            vm.song = website.custom.song;
            vm.photo = website.custom.photo;
            var userId = website.user_id;
            var webId = website.id;

            vm.homepage = website.custom.homepage;
            vm.homeState = $state.current.name;


            loadMainImage(userId, webId);

            if (vm.song.isEnable) {
                vm.songs = vm.song.items;
                loadSong(userId, vm.songs, webId);
            }
            if (vm.photo.isEnable) {
                vm.photos = vm.photo.items;
                loadPhoto(userId, vm.photos, webId);
            }

        }


        function loadDefault() {
            vm.photo = {
                isEnable: true
            };
            vm.song = {
                isEnable: true
            };
            vm.photos = [
                {
                    name: 'Ricardo Kaka',
                    des: 'Real win in champion league. This is the most viewed photo of Ricardo Kaka.',
                    tempLink: 'content/images/photos/kaka-photo.jpg'
                },
                {
                    name: 'Chelsea vs Arsenal',
                    des: 'Best match, we should not miss in sunday',
                    tempLink: 'content/images/photos/chelsea-arse.jpg'
                },
                {
                    name: 'Chelsea vs Liverpool',
                    des: 'Super match with chelsea and liverpool',
                    tempLink: 'content/images/photos/chelsea-liv.jpg'
                }
            ];

            vm.songs = [
                {
                    title: 'Happy',
                    artist: 'Pharrell Williams',
                    tempLink: 'content/media/songs/Happy.mp3',
                    length: '3:00',
                    date: '2017-01-12'
                },
                {
                    title: 'Paris',
                    artist: 'The Chainsmokers',
                    tempLink: 'content/media/songs/Paris.mp3',
                    length: '3:15',
                    date: '2017-01-15'
                },
                {
                    title: 'Shape of You',
                    artist: 'Ed Sheeran',
                    tempLink: 'content/media/songs/Shape-of-You.mp3',
                    length: '2:45',
                    date: '2016-09-01'
                }
            ];

            MSongService.loadSongList(vm.songs);


            MPhotoService.loadPhotoList(vm.photos);
        }

        function loadMainImage(userId, webId) {

            if (vm.homepage.mainImage == null)
                return;

            MyWebsiteStorage.getUserWebImage(userId, webId, "mainImage.jpg").then(onSuccess, onError);
            function onSuccess(response) {
                vm.mainImageLink = response.data.link;
                MHomeService.loadImageLink(vm.mainImageLink);
            }

            function onError(response) {
                AlertService.error(response);
            }
        }

        function loadPhoto(userId, photos, webId) {
            for (var i = 0; i < photos.length; i++) {
                var photo = photos[i];
                MyWebsiteStorage.loadImageForWebItem(userId, webId, photo, photo.url);

            }
            MPhotoService.loadPhotoList(vm.photos);
        }

        function loadSong(userId, songs, webId) {
            for (var i = 0; i < songs.length; i++) {
                var song = songs[i];
                MyWebsiteStorage.loadSongForWebItem(userId, webId, song, song.url);
            }
            MSongService.loadSongList(vm.songs);
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
            var songUrl = song.tempLink;
            $window.open(songUrl, '_blank');
        }
    }
})();
