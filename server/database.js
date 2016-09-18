var express = require("express"),
    router = express.Router(),
    firebase = require('firebase');

firebase.initializeApp({
    serviceAccount: "server/drinkme-key.json",
    databaseURL: "https://drinkme-6efd3.firebaseio.com"
});
var db = firebase.database();
var auth = firebase.auth();
var user = null;

router.post('/user/:idToken', setUser);



module.exports = router;

//////////////

function setUser(req, res) {
    user = null;
    var idToken = req.params.idToken;
    firebase.auth().verifyIdToken(idToken)
        .then(function (decodedToken) {
            user = decodedToken.uid;
            res.json({
                success: true,
                message: 'Enjoy your token!',
                token: decodedToken
            });
        }).catch(function (error) {
        res.json({
            success: false,
            message: error
        });
        // Handle error
    });

}


