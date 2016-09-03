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

router.get('/ingredients', renderIngredients);
router.post('/ingredient', addIngredient);
router.get('/console', renderConsole);
router.post('/user', setUser);


function renderConsole(req, res) {
    if (user !== null) {
        res.render('console');
    } else {
        res.render('login');
    }
}
function setUser(req, res) {
    var idToken = req.body.token;
    firebase.auth().verifyIdToken(idToken)
        .then(function (decodedToken) {
            user = decodedToken.uid;
            // ...
            // res.render('./views/console.pug')
        }).catch(function (error) {
            user = null;
            console.log(error);
        // Handle error
    });

}


module.exports = router;

//////////////
function renderIngredients(req, res) {
    if (firebase.User) {
        var data, ref = db.ref('ingredients');
        ref.on("value", function (snapshot) {
            //console.log(snapshot.val());
            data = snapshot.val();
        });
        res.status(200).send(data);
        // res.render('reader');
    }
    else {
        res.render('login');
    }
}

function addIngredient(req, res) {
    var ref = db.ref('ingredients');
    var categ = req.query.categ,
        name = req.query.name;


}
