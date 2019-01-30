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
    db.getConnection(function(err, connexion) {
        if (!err) {
            let sql = "SELECT DISTINCT LEFT(VIP_NOM,1) AS letter FROM vip ORDER BY letter;";

            console.log(sql);
            connexion.query(sql, callback);
            connexion.release();
        }
    });
}
