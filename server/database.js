var express = require("express"),
    router = express.Router(),
    firebase = require('firebase'),
    admin = require('firebase-admin');

var serviceAccount = require('./drinkme-key.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://drinkme-6efd3.firebaseio.com"
});
var db = admin.database();
var auth = admin.auth();
var user = null;

router.post('/user/:idToken', setUser);


module.exports = router;

//////////////

function setUser(req, res) {
    user = null;
    var idToken = req.params.idToken;
    admin.auth().verifyIdToken(idToken)
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


