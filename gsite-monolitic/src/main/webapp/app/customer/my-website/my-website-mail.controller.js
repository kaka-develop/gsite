(function () {
    'use strict';

    angular
        .module('gsiteApp')
        .controller('MyWebsiteMailController', MyWebsiteMailController);

    MyWebsiteMailController.$inject = ['AlertService', 'entity', 'Principal', 'Mail','MyWebsiteOffline'];

    function MyWebsiteMailController( AlertService, entity, Principal, Mail,MyWebsiteOffline) {
        var vm = this;

        vm.website = entity;
        vm.website.sharedUsers = [];
        vm.sendEmail = sendEmail;
        vm.deleteEmail = deleteEmail;

        vm.currentAccount = null;


        Principal.identity().then(function (account) {
            vm.currentAccount = account;
        });


        function sendEmail(email) {
            if (getIndex(email) < 0) {
                vm.website.sharedUsers.push(email);
                shareWithEmail(email);
            } else
                AlertService.error("Email is already sent!")
        }

        function getIndex(email) {
            return vm.website.sharedUsers.indexOf(email);
        }

        function deleteEmail(index) {
            return vm.website.sharedUsers.splice(index, 1);
        }

        function share() {
            shareWithEmail(vm.email);
        }

        function shareWithEmail(email) {
            if (vm.currentAccount.email == email)
                AlertService.error("This is your email");
            else {
                sendMail(vm.currentAccount,email);
            }
        }



        function sendMail(user, toEmail) {
            var fromName = vm.currentAccount.firstName + " " + vm.currentAccount.lastName;
            var toName = toEmail;
            var lang = vm.currentAccount.langKey;
            var webId = vm.website.id;
            if (user != null) {
                toName = user.firstName + " " + user.lastName;
                lang = user.langKey;
            }
            Mail.share({
                from_name: fromName,
                to_name: toName,
                lang: lang,
                to_email: toEmail,
                web_id: webId
            }, function (response) {
                save();
                AlertService.success("Sent mail to " + toEmail);
            });
        }

        function save() {
            MyWebsiteOffline.update(vm.website);
        }

    }
})();
