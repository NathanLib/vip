
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
