let db = require('../configDb');


module.exports.test = function(callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {
            let sql = "SELECT COUNT(*) AS NB FROM vip ;";
              // console.log(sql);
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};

module.exports.Repertoire = function(callback) {
    db.getConnection(function (err, connexion) {
        if (!err) {
            let sql = "SELECT DISTINCT LEFT(VIP_NOM,1) AS letter FROM vip ORDER BY letter;";

            console.log(sql);
            connexion.query(sql, callback);
            connexion.release();
        }
    });
}

module.exports.DetailsLetter = function(letter, callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {
            let sql = "SELECT VIP_NOM, VIP_PRENOM, PHOTO_ADRESSE AS PHOTO FROM vip v  ";
            sql = sql + "JOIN photo p ON v.VIP_NUMERO=p.VIP_NUMERO";
            sql = sql + " WHERE LEFT(VIP_NOM,1)='"+letter+"' AND PHOTO_NUMERO=1 ORDER BY VIP_NOM;";
            console.log(sql);
            connexion.query(sql, callback);
            connexion.release();
        }
    });
}
