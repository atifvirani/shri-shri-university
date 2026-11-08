// Safe notification mock for local development and offline demo
if (typeof firebase !== 'undefined' && firebase.initializeApp) {
    try {
        var config = {
            apiKey: "AIzaSyDXtKXoU_N4jaSSVhw4eemNrUlFAJU_k9c",
            authDomain: "online-student.firebaseapp.com",
            databaseURL: "https://online-student.firebaseio.com",
            projectId: "online-student",
            storageBucket: "",
            messagingSenderId: "729725896168"
        };
        firebase.initializeApp(config);

        const messaging = firebase.messaging();
        messaging
            .requestPermission()
            .then(function () {
                console.log("Notification permission granted.");
                return messaging.getToken();
            })
            .then(function (token) {
                if (typeof subscribeTokenToTopic === 'function') {
                    subscribeTokenToTopic(token, "");
                }
            })
            .catch(function (err) {
                console.log("Unable to get permission to notify.", err);
            });

        messaging.onMessage(function (payload) {
            try {
                var obj = JSON.parse(JSON.stringify(payload));
                var msg = JSON.parse(obj.data.message);
                var notificationTitle = msg.Title;
                var notificationOptions = {
                    body: msg.Message,
                    icon: msg.image,
                    data: { url: msg.url }
                };
                var notification = new Notification(notificationTitle, notificationOptions);
                notification.onclick = function (event) {
                    event.preventDefault();
                    window.open(msg.url, '_blank');
                    notification.close();
                };
            } catch (e) {}
        });
    } catch (e) {
        console.warn('Firebase notification offline mock:', e.message);
    }
}

function subscribeTokenToTopic(token, topic) {
    var data = new FormData();
    var request = new XMLHttpRequest();
    request.open('get', '/handler/Notification.ashx?token='+token);
    request.send(data);
}