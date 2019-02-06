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

module.exports.listLetter = function(callback) {
    db.getConnection(function (err, connexion) {
        if (!err) {
            let sql = "SELECT DISTINCT LEFT(VIP_NOM,1) AS letterSql FROM vip ORDER BY letterSql;";

            //console.log(sql);
            connexion.query(sql, callback);
            connexion.release();
        }
    });
}

module.exports.resultLetter = function(letter, callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {
            let sql = "SELECT v.VIP_NUMERO as numero ,PHOTO_NUMERO,VIP_NOM as nom, VIP_PRENOM as prenom, PHOTO_ADRESSE as photo FROM vip v join photo p ON v.VIP_NUMERO=p.VIP_NUMERO WHERE VIP_NOM like '"+letter+"%' AND PHOTO_NUMERO=1;";
            //console.log(sql);
            connexion.query(sql, callback);
            connexion.release();
        }
    });
}

module.exports.getPhoto = function(number,callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {
            let sql = "SELECT PHOTO_ADRESSE FROM photo p JOIN vip v ON v.VIP_NUMERO=p.VIP_NUMERO WHERE p.VIP_NUMERO="+number+";"
            //console.log(sql);
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};

module.exports.getIdentityDetailsVip = function(number,callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {
            let sql = "SELECT VIP_NOM, VIP_PRENOM, VIP_SEXE, VIP_NAISSANCE, VIP_TEXTE FROM vip WHERE VIP_NUMERO="+number+";"
            //console.log(sql);
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};

module.exports.getNationaliteVip = function(number,callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {
            let sql = "SELECT v.NATIONALITE_NUMERO, n.NATIONALITE_NOM FROM vip v join nationalite n on v.NATIONALITE_NUMERO=n.NATIONALITE_NUMERO WHERE VIP_NUMERO="+number+";"
            //console.log(sql);
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};

module.exports.getLiaisonVip = function(number,callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {
            let sql = "SELECT l.VIP_NUMERO, l.DATE_EVENEMENT, l.LIAISON_MOTIFFIN, v1.VIP_NOM, v1.VIP_PRENOM, v2.VIP_TEXTE, p.PHOTO_NUMERO, p.PHOTO_ADRESSE FROM liaison l";
            sql = sql + " JOIN VIP v1 ON v1.VIP_NUMERO=l.VIP_NUMERO JOIN vip v2 ON l.VIP_NUMERO=v2.VIP_NUMERO JOIN photo p ON p.VIP_NUMERO=l.VIP_NUMERO WHERE l.VIP_VIP_NUMERO="+number+" AND p.PHOTO_NUMERO=1";
            sql = sql + " UNION SELECT l.VIP_VIP_NUMERO, l.DATE_EVENEMENT, l.LIAISON_MOTIFFIN,  v1.VIP_NOM, v1.VIP_PRENOM, v2.VIP_TEXTE,  p.PHOTO_NUMERO, p.PHOTO_ADRESSE FROM liaison l";
            sql = sql + " JOIN VIP v1 ON v1.VIP_NUMERO=l.VIP_VIP_NUMERO JOIN vip v2 ON l.VIP_VIP_NUMERO=v2.VIP_NUMERO JOIN photo p ON p.VIP_NUMERO=l.VIP_VIP_NUMERO WHERE l.VIP_NUMERO="+number+" AND p.PHOTO_NUMERO=1"
            //console.log(sql);
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};

module.exports.getMariageVip = function(number,callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {
            let sql = "SELECT m.VIP_NUMERO, m.DATE_EVENEMENT, m.MARIAGE_LIEU, m.MARIAGE_FIN, v1.VIP_NOM, v1.VIP_PRENOM, v2.VIP_TEXTE, p.PHOTO_NUMERO, p.PHOTO_ADRESSE FROM mariage m";
            sql = sql + " JOIN VIP v1 ON v1.VIP_NUMERO=m.VIP_NUMERO JOIN vip v2 ON m.VIP_NUMERO=v2.VIP_NUMERO JOIN photo p ON p.VIP_NUMERO=m.VIP_NUMERO";
            sql = sql + " WHERE m.VIP_VIP_NUMERO="+number+" AND p.PHOTO_NUMERO=1";
            sql = sql + " UNION SELECT m.VIP_VIP_NUMERO, m.DATE_EVENEMENT, m.MARIAGE_LIEU, m.MARIAGE_FIN,  v1.VIP_NOM, v1.VIP_PRENOM, v2.VIP_TEXTE,  p.PHOTO_NUMERO, p.PHOTO_ADRESSE FROM mariage m";
            sql = sql + " JOIN VIP v1 ON v1.VIP_NUMERO=m.VIP_VIP_NUMERO JOIN vip v2 ON m.VIP_VIP_NUMERO=v2.VIP_NUMERO JOIN photo p";
            sql = sql + " ON p.VIP_NUMERO=m.VIP_VIP_NUMERO WHERE m.VIP_NUMERO="+number+" AND p.PHOTO_NUMERO=1";
            //console.log(sql);
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};

module.exports.getAllPhotosVip = function(number,callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {
            let sql = "SELECT PHOTO_NUMERO, PHOTO_SUJET, PHOTO_COMMENTAIRE, PHOTO_ADRESSE FROM photo";
            sql = sql + " WHERE VIP_NUMERO="+number+";"
            //console.log(sql);
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};
