let model = require("../models/album.js");
//let photo = require("../models/photo");
let async = require("async");

// ////////////////////// L I S T E R     A L B U M S

module.exports.ListerAlbum = function(request, response){
    response.title = 'Album des stars';

    model.getAlbum(function(err, result){
        if (err) {
            console.log(err);
            return;
        }

        response.album = result;
        response.render('listerAlbum', response);
    } );

} ;

module.exports.AfficherAlbumDetail = function(request, response){
    response.title = 'Mes articles';
    let nombre = request.params.number;
    let numeroPhoto = request.params.photo;

    async.parallel([
        function(callback) {
            model.getAlbum(function(err, result) {callback(null, result)});
        },

        function(callback) {
            model.getAlbumDetail(nombre,numeroPhoto, function(err, result) {callback(null, result)});
        },
    ],

    function(err, result){
        if (err) {
            console.log(err);
            return;
        }

        response.album = result[0];
        response.details = result[1];

        console.log(response.details);
        response.render('afficherAlbumVip', response);
    } );
}
