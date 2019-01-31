let model = require("../models/vip.js");
//let photo = require("../models/photo");
let async = require("async");

// ///////////////////////// R E P E R T O I R E    D E S     S T A R S

module.exports.Repertoire = function(request, response){
    response.title = 'Répertoire des stars';

    model.listLetter(function(err, result){
        if (err) {
            console.log(err);
            return;
        }

        response.letter = result;
        response.render('repertoireVips', response);
    } );
}

module.exports.DetailsLetter = 	function(request, response){
    response.title = 'Liste des vip commençant pas la même lettre';
    let letter = request.params.letter;

    async.parallel([
        function(callback){
            model.listLetter(function(err,result) {callback(null, result)});
        },

        function(callback){
            model.resultLetter(letter, function(err,result) {callback(null, result)});
        }
    ],

    function(err, result){
        if (err) {
            console.log(err);
            return;
        }

        response.letter = result[0];
        response.vips = result[1];
        response.render('repertoireVipsLetter', response);
    }
);
}

module.exports.DetailsVip = function(request, response){
    response.title = 'Liste des vip commençant pas la même lettre';
    let letter = request.params.letter;

    async.parallel([
        function(callback){
            model.listLetter(function(err,result) {callback(null, result)});
        },

        function(callback){
            model.resultLetter(letter, function(err,result) {callback(null, result)});
        }
    ],

    function(err, result){
        if (err) {
            console.log(err);
            return;
        }

        response.letter = result[0];
        response.vips = result[1];
        response.render('repertoireVipsLetter', response);
    }
);
}
