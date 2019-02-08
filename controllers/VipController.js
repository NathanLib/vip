let model = require("../models/vip.js");
//let photo = require("../models/photo");
let async = require("async");
let moment = require("moment");

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
    response.title = 'Mon VIP';
    let nombre = request.params.number;

    async.parallel([
        function(callback){
            model.listLetter(function(err,result) {callback(null, result)});
        },

        function(callback) {
            model.getPhoto(nombre, function(err, result) {callback(null, result)});
        },

        function(callback) {
            model.getIdentityDetailsVip(nombre, function(err, result) {callback(null, result)});
        },

        function(callback) {
            model.getNationaliteVip(nombre, function(err, result) {callback(null, result)});
        },

        function(callback) {
            model.getLiaisonVip(nombre, function(err, result) {callback(null, result)});
        },

        function(callback) {
            model.getMariageVip(nombre, function(err, result) {callback(null, result)});
        },

        function(callback) {
            model.getAllPhotosVip(nombre, function(err, result) {callback(null, result)});
        },

        function(callback) {
            model.getInfos_realisateur(nombre, function(err, result) {callback(null, result)});
        },

        function(callback) {
            model.getInfos_mannequin(nombre, function(err, result) {callback(null, result)});
        },

        function(callback) {
            model.getInfos_chanteur(nombre, function(err, result) {callback(null, result)});
        },

        function(callback) {
            model.getInfos_couturier(nombre, function(err, result) {callback(null, result)});
        },

        function(callback) {
            model.getInfos_acteur(nombre, function(err, result) {callback(null, result)});
        }

    ],

    function(err, result){
        if (err) {
            console.log(err);
            return;
        }

        response.letter = result[0];
        response.photo = result[1][0];
        response.identityDetailsVip = result[2][0];
        response.nationaliteVip = result[3][0];
        response.liaisonVip = result[4];
        response.mariageVip = result[5];
        response.photosVip = result[6];
        response.realisateur = result[7];
        response.mannequin = result[8];
        response.chanteur = result[9];
        response.couturier = result[10];
        response.acteur = result[11];

/*
        moment.locale('fr');
        let dateForm = moment((result[2][0].VIP_NAISSANCE)).format('LLLL'); // variable à modifier
        let maDate = dateForm.substring(0, dateForm.length-5);

        response.maDate = maDate;
*/
        response.render('repertoireVipsDetails', response);
    }
);
}
