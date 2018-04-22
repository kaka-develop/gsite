(function () {
    'use strict';
    angular
        .module('gsiteApp')
        .factory('Website', Website);

    Website.$inject = [];

    function Website() {
        var instance = {
            all: all,
            get: get,
            del: del,
            update: update,
            save: save
        };

        var list = [
            {
                id: 'sas42sa',
                name: 'Kaká site',
                des: 'If you guys want to know more about the football player Kaka. Just one click',
                domain: 'kaka.com',
                image: 'temp-default',
                template: 'basic-template',
                user_id: 'u-01',
                created: '2017-03-02',
                sharedUsers: ['linda@gmail.com', 'kaka@gmail.com'],
                custom: {
                    toolbar: {
                        isEnable: true,
                        title: 'Ricardo Kaká',
                        textColor: '#FFFFFF'
                    },
                    homepage: {
                        isEnable: true,
                        name: 'Kaká',
                        fullName: 'Ricardo Izecson dos Santos Leite',
                        avatar: 'kaka',
                        mainImage: 'content/images/avatars/kaka.jpg'
                    },
                    sidenav: {
                        isEnable: true,
                        title: 'About Kaká',
                        textColor: '#FFFFFF',
                        backgroundColor: 'white',
                        list: {
                            isEnable: true,
                            choices: [{
                                    title: 'Basic information',
                                    subTitle: 'Overview of what you should know',
                                    icon: 'person',
                                    state: 'my-website-view.info'
                                },
                                {
                                    title: 'Photo Album',
                                    subTitle: 'Album contain all photo of reciever',
                                    icon: 'photo_library',
                                    state: 'my-website-view.photo'
                                },
                                {
                                    title: 'Favorite Songs',
                                    subTitle: 'All favorite songs and their playlist',
                                    icon: 'library_music',
                                    state: 'my-website-view.song'
                                }
                            ]
                        }
                    },
                    footer: {
                        isEnable: true,
                        items: [{
                                title: 'About',
                                url: '/#/my-website/info'
                            },
                            {
                                title: 'Photos',
                                url: '/#/my-website/photos'
                            },
                            {
                                title: 'Songs',
                                url: '/#/my-website/songs'
                            }
                        ]
                    },
                    basicinfo: {
                        isEnable: true,
                        firstName: 'Ricardo',
                        lastName: 'Kaka',
                        email: 'kaka@gmail.com',
                        age: 32,
                        des: 'Kaka is one of best football players in the world.'
                    },
                    song: {
                        isEnable: true,
                        items: [{
                                title: 'Happy',
                                artist: 'Pharrell Williams',
                                url: 'content/media/songs/Happy.mp3'
                            },
                            {
                                title: 'Paris',
                                artist: 'The Chainsmokers',
                                url: 'content/media/songs/Paris.mp3'
                            },
                            {
                                title: 'Shape of You',
                                artist: 'Ed Sheeran',
                                url: 'content/media/songs/Shape-of-You.mp3'
                            }
                        ]
                    },
                    photo: {
                        isEnable: true,
                        items: [{
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
                        ]
                    }
                }
            },
            {
                id: 'sas232sa',
                name: 'Ronaldo site',
                des: 'If you guys want to know more about the best football player Ronaldo. Just one click',
                domain: 'ronaldo.com',
                image: 'temp-default',
                template: 'latest-template',
                user_id: 'u-02',
                created: '2017-03-02',
                sharedUsers: ['linda@gmail.com', 'kaka@gmail.com'],
                custom: {
                    toolbar: {
                        isEnable: true,
                        title: 'Cristiano Ronaldo',
                        textColor: '#FFFFFF'
                    },
                    homepage: {
                        isEnable: true,
                        name: 'Ronaldo',
                        fullName: 'Cristiano Ronaldo',
                        avatar: 'ronaldo',
                        mainImage: 'content/images/avatars/ronaldo.jpg'
                    },
                    sidenav: {
                        isEnable: true,
                        title: 'About Ronaldo',
                        textColor: '#FFFFFF',
                        backgroundColor: 'white',
                        list: {
                            isEnable: true,
                            choices: [{
                                    title: 'Basic information',
                                    subTitle: 'Overview of what you should know',
                                    icon: 'person',
                                    state: 'my-website-view.info'
                                },
                                {
                                    title: 'Photo Album',
                                    subTitle: 'Album contain all photo of reciever',
                                    icon: 'photo_library',
                                    state: 'my-website-view.photo'
                                },
                                {
                                    title: 'Favorite Songs',
                                    subTitle: 'All favorite songs and their playlist',
                                    icon: 'library_music',
                                    state: 'my-website-view.song'
                                }
                            ]
                        }
                    },
                    footer: {
                        isEnable: true,
                        items: [{
                                title: 'About',
                                url: '/#/my-website/info'
                            },
                            {
                                title: 'Photos',
                                url: '/#/my-website/photos'
                            },
                            {
                                title: 'Songs',
                                url: '/#/my-website/songs'
                            }
                        ]
                    },
                    basicinfo: {
                        isEnable: true,
                        firstName: 'Cristiano',
                        lastName: 'Ronaldo',
                        email: 'ronaldo@gmail.com',
                        age: 32,
                        des: 'Ronaldo is one of best football players in the world.'
                    },
                    song: {
                        isEnable: true,
                        items: [{
                                title: 'Happy',
                                artist: 'Pharrell Williams',
                                url: 'content/media/songs/Happy.mp3'
                            },
                            {
                                title: 'Paris',
                                artist: 'The Chainsmokers',
                                url: 'content/media/songs/Paris.mp3'
                            },
                            {
                                title: 'Shape of You',
                                artist: 'Ed Sheeran',
                                url: 'content/media/songs/Shape-of-You.mp3'
                            }
                        ]
                    },
                    photo: {
                        isEnable: true,
                        items: [{
                                name: 'ronaldo-photo',
                                des: 'Real win in champion league. This is the most viewed photo of Ronaldo.',
                                url: 'content/images/photos/ronaldo-photo.jpg'
                            },
                            {
                                name: 'ronaldo-real-photo',
                                des: 'Best match, ronaldo will stay in real for next five years',
                                url: 'content/images/photos/ronaldo-real-photo.jpg'
                            },
                            {
                                name: 'ronaldo-mu-photo',
                                des: 'Super match with chelsea and liverpool',
                                url: 'content/images/photos/ronaldo-mu-photo.jpg'
                            }
                        ]
                    }
                }
            },
            {
                id: 'sas42s2a',
                name: 'Book Store',
                des: 'The titles of Washed Out breakthrough song and the first',
                image: 'temp-default',
                template: 'beatiful-template'
            }
        ];
        var hashMap = {};
        hashMap[list[0].id] = list[0];
        hashMap[list[1].id] = list[1];

        function all() {
            var items = [];
            for (var key in hashMap) {
                items.push(hashMap[key]);
            }
            return items;
        }

        function get(id) {
            return hashMap[id];
        }

        function del(id) {
            delete hashMap[id];
        }

        function add(item) {
            var size = Object.keys(hashMap).length;
            item.id = 'user-' + size;
            hashMap[item.id] = item;
        }

        function save(item) {
            add(item);
        }

        function update(item) {
            hashMap[item.id] = item;
        }

        return instance;
    }
})();