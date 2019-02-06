let db = require('../configDb');

module.exports.getAlbum = function(callback) {
    db.getConnection(function (err, connexion) {
        if (!err) {
            let sql = "SELECT p.PHOTO_NUMERO, p.PHOTO_ADRESSE, v.VIP_NUMERO, v.VIP_NOM FROM photo p JOIN vip v ON v.VIP_NUMERO=p.VIP_NUMERO";
            sql = sql + " WHERE PHOTO_NUMERO=1 ORDER BY v.VIP_NOM";

            //console.log(sql);
            connexion.query(sql, callback);
            connexion.release();
        }
    });
}

module.exports.getAlbumDetail = function(number,callback) {
    db.getConnection(function (err, connexion) {
        if (!err) {
            let sql = "SELECT p.PHOTO_NUMERO, p.PHOTO_COMMENTAIRE, p.PHOTO_ADRESSE, v.VIP_NOM, v.VIP_PRENOM, v.VIP_NUMERO FROM photo p JOIN vip v ON v.VIP_NUMERO=p.VIP_NUMERO WHERE v.VIP_NUMERO="+number+" ORDER BY p.PHOTO_NUMERO";

            //console.log(sql);
            connexion.query(sql, callback);
            connexion.release();
        }
    });
}
