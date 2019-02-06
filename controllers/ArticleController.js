let model = require("../models/article.js");
//let photo = require("../models/photo");
let async = require("async");

// ///////////////////////// A R T I C L E S

module.exports.Menu = function(request, response){
    response.title = 'Menu article';

    model.listVips(function(err, result){
        if (err) {
            console.log(err);
            return;
        }

        response.liste = result;
        response.render('menuArticle', response);
    } );
}

module.exports.AfficherArticle = function(request, response){
    response.title = 'Mes articles';
    let nombre = request.params.number;

    async.parallel([
        function(callback) {
            model.listVips(function(err, result) {callback(null, result)});
        },

        function(callback) {
            model.getArticle(nombre, function(err, result) {callback(null, result)});
        },
    ],

    function(err, result){
        if (err) {
            console.log(err);
            return;
        }

        response.liste = result[0];
        response.article = result[1];
        response.render('afficherArticles', response);
    } );
}
