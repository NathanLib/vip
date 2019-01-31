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
    response.title = 'Menu article';

    model.getArticle(function(err, result){
        if (err) {
            console.log(err);
            return;
        }

        response.article = result;
        response.render('afficherArticle', response);
    } );
}
