let db = require('../configDb');

module.exports.listVips = function(callback) {
    db.getConnection(function (err, connexion) {
        if (!err) {
            let sql = "SELECT v.VIP_NUMERO, v.VIP_NOM, v.VIP_PRENOM FROM vip v ORDER BY v.VIP_NOM";

            //console.log(sql);
            connexion.query(sql, callback);
            connexion.release();
        }
    });
}
