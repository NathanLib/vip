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

module.exports.getAlbumDetail = function(number,numeroPhoto,callback) {
    db.getConnection(function (err, connexion) {
        if (!err) {
            let sql = "SELECT T.src,T.com,T.prenom,T.nom,T.numero, COUNT(PHOTO_NUMERO) AS compteur, T.numeroPhoto FROM ";
            sql = sql + "(SELECT PHOTO_ADRESSE AS src, PHOTO_COMMENTAIRE AS com, VIP_PRENOM AS prenom, VIP_NOM AS nom,";
            sql = sql + " v.VIP_NUMERO as numero, COUNT(PHOTO_NUMERO) AS compteur ,PHOTO_NUMERO as numeroPhoto FROM photo p JOIN vip v";
            sql = sql + " ON v.vip_NUMERO=p.VIP_NUMERO WHERE v.VIP_NUMERO="+ number +" AND PHOTO_NUMERO="+ numeroPhoto;
            sql = sql + " ORDER BY VIP_NOM)T JOIN photo p WHERE p.VIP_NUMERO="+ number +";";

            //console.log(sql);
            connexion.query(sql, callback);
            connexion.release();
        }
    });
}
