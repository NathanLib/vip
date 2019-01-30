let model = require("../models/vip.js");

// ///////////////////////// R E P E R T O I R E    D E S     S T A R S

module.exports.Repertoire = 	function(request, response){
   response.title = 'Répertoire des stars';

    model.Repertoire(function(err, result){
        if (err) {
            console.log(err);
            return;
        }

        response.firstLetter = result;
        response.render('repertoireVips', response);
    } );
}

module.exports.DetailsLetter = 	function(request, response){
    response.title = 'Détail des stars';
    let data = request.params.letter;
    model.Repertoire(function(err, result){
        if (err) {
            console.log(err);
            return;
        }

        response.vips = result;
        response.render('repertoireVips', response);
    } );
}
