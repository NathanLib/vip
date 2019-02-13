let db = require('../configDb');

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
            let sql = "SELECT l.VIP_NUMERO, l.DATE_EVENEMENT, l.LIAISON_MOTIFFIN, v1.VIP_NOM, v1.VIP_PRENOM, substring(v2.VIP_TEXTE,1,500) as VIP_TEXTE, p.PHOTO_NUMERO, p.PHOTO_ADRESSE FROM liaison l";
            sql = sql + " JOIN VIP v1 ON v1.VIP_NUMERO=l.VIP_NUMERO JOIN vip v2 ON l.VIP_NUMERO=v2.VIP_NUMERO JOIN photo p ON p.VIP_NUMERO=l.VIP_NUMERO WHERE l.VIP_VIP_NUMERO="+number+" AND p.PHOTO_NUMERO=1";
            sql = sql + " UNION SELECT l.VIP_VIP_NUMERO, l.DATE_EVENEMENT, l.LIAISON_MOTIFFIN,  v1.VIP_NOM, v1.VIP_PRENOM, substring(v2.VIP_TEXTE,1,500) as VIP_TEXTE,  p.PHOTO_NUMERO, p.PHOTO_ADRESSE FROM liaison l";
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
            let sql = "SELECT m.VIP_NUMERO, m.DATE_EVENEMENT, m.MARIAGE_LIEU, m.MARIAGE_FIN, v1.VIP_NOM, v1.VIP_PRENOM, substring(v2.VIP_TEXTE,1,500) as VIP_TEXTE, p.PHOTO_NUMERO, p.PHOTO_ADRESSE FROM mariage m";
            sql = sql + " JOIN VIP v1 ON v1.VIP_NUMERO=m.VIP_NUMERO JOIN vip v2 ON m.VIP_NUMERO=v2.VIP_NUMERO JOIN photo p ON p.VIP_NUMERO=m.VIP_NUMERO";
            sql = sql + " WHERE m.VIP_VIP_NUMERO="+number+" AND p.PHOTO_NUMERO=1";
            sql = sql + " UNION SELECT m.VIP_VIP_NUMERO, m.DATE_EVENEMENT, m.MARIAGE_LIEU, m.MARIAGE_FIN,  v1.VIP_NOM, v1.VIP_PRENOM, substring(v2.VIP_TEXTE,1,500) as VIP_TEXTE,  p.PHOTO_NUMERO, p.PHOTO_ADRESSE FROM mariage m";
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

module.exports.getInfos_realisateur = function(number,callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {
            let sql = "SELECT r.VIP_NUMERO, f.FILM_NUMERO, f.FILM_TITRE, f.FILM_DATEREALISATION FROM realisateur r";
            sql = sql + " LEFT JOIN film f ON (f.VIP_NUMERO = r.VIP_NUMERO)";
            sql = sql + " WHERE r.VIP_NUMERO = " + number;

            //console.log(sql);
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};

module.exports.getInfos_mannequin = function(number,callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {
            let sql = "SELECT m.VIP_NUMERO, d.DEFILE_LIEU, d.DEFILE_DATE, v.VIP_NUMERO, v.VIP_NOM, v.VIP_PRENOM, substring(v.VIP_TEXTE, 1, 500) as VIP_TEXTE, p.PHOTO_ADRESSE FROM mannequin m";
            sql = sql + " LEFT JOIN defiledans dd ON m.VIP_NUMERO=dd.VIP_NUMERO LEFT JOIN defile d ON dd.DEFILE_NUMERO=d.DEFILE_NUMERO";
            sql = sql + " LEFT JOIN couturier c ON c.VIP_NUMERO=d.VIP_NUMERO LEFT JOIN vip v ON v.VIP_NUMERO=c.VIP_NUMERO";
            sql = sql + " LEFT JOIN photo p ON p.VIP_NUMERO=v.VIP_NUMERO WHERE m.VIP_NUMERO="+number+" AND p.PHOTO_NUMERO=1";

            //console.log(sql);
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};

module.exports.getInfos_chanteur = function(number,callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {
            let sql = "SELECT ch.VIP_NUMERO, ch.CHANTEUR_SPECIALITE, al.ALBUM_TITRE, al.ALBUM_DATE, md.MAISONDISQUE_NOM FROM chanteur ch";
            sql = sql + " JOIN composer co ON co.VIP_NUMERO=ch.VIP_NUMERO LEFT JOIN album al ON al.ALBUM_NUMERO=co.ALBUM_NUMERO";
            sql = sql + " LEFT JOIN maisondisque md ON md.MAISONDISQUE_NUMERO=al.MAISONDISQUE_NUMERO WHERE ch.VIP_NUMERO="+number ;

            //console.log(sql);
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};

module.exports.getInfos_couturier = function(number,callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {
            let sql = "SELECT c.VIP_NUMERO, d.DEFILE_LIEU, d.DEFILE_DATE, v.VIP_NUMERO, v.VIP_NOM, v.VIP_PRENOM, substring(v.VIP_TEXTE,1, 500) as VIP_TEXTE, p.PHOTO_ADRESSE FROM couturier c";
            sql = sql + " LEFT JOIN defile d ON c.VIP_NUMERO=d.VIP_NUMERO";
            sql = sql + " LEFT JOIN defiledans dd ON dd.DEFILE_NUMERO=d.DEFILE_NUMERO";
            sql = sql + " LEFT JOIN mannequin m ON m.VIP_NUMERO=dd.VIP_NUMERO";
            sql = sql + " LEFT JOIN vip v ON v.VIP_NUMERO=m.VIP_NUMERO";
            sql = sql + " LEFT JOIN photo p ON p.VIP_NUMERO=v.VIP_NUMERO";
            sql = sql + " WHERE p.PHOTO_NUMERO=1 AND c.VIP_NUMERO="+number ;

            //console.log(sql);
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};

module.exports.getInfos_acteur = function(number,callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {
            let sql = "SELECT a.VIP_NUMERO, j.FILM_NUMERO, f.FILM_TITRE, f.FILM_DATEREALISATION, r.VIP_NUMERO, v.VIP_NOM, v.VIP_PRENOM, substring(v.VIP_TEXTE, 1, 500) AS VIP_TEXTE, (SELECT p.PHOTO_ADRESSE FROM photo p WHERE p.VIP_NUMERO=v.VIP_NUMERO AND p.PHOTO_NUMERO=1) AS PHOTO_ADRESSE FROM acteur a";
            sql = sql + " LEFT JOIN joue j ON j.VIP_NUMERO=a.VIP_NUMERO";
            sql = sql + " LEFT JOIN film f ON f.film_NUMERO=j.FILM_NUMERO";
            sql = sql + " LEFT JOIN realisateur r ON r.VIP_NUMERO=f.VIP_NUMERO";
            sql = sql + " LEFT JOIN vip v ON v.VIP_NUMERO=r.VIP_NUMERO";
            sql = sql + " WHERE a.VIP_NUMERO="+number ;

            //console.log(sql);
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};
