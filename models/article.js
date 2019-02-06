let db = require('../configDb');

module.exports.listVips = function(callback) {
    db.getConnection(function (err, connexion) {
        if (!err) {
            let sql = "SELECT DISTINCT v.VIP_NUMERO, v.VIP_NOM, v.VIP_PRENOM FROM vip v JOIN apoursujet aps ON aps.VIP_NUMERO=v.VIP_NUMERO ORDER BY v.VIP_NOM";

            //console.log(sql);
            connexion.query(sql, callback);
            connexion.release();
        }
    });
}

module.exports.getArticle = function(number,callback) {
    db.getConnection(function (err, connexion) {
        if (!err) {
            let sql = "SELECT v.VIP_NUMERO, v.VIP_NOM, v.VIP_PRENOM, a.ARTICLE_NUMERO, a.ARTICLE_TITRE, a.ARTICLE_RESUME, a.ARTICLE_DATE_INSERT FROM article a JOIN apoursujet aps ON aps.ARTICLE_NUMERO=a.ARTICLE_NUMERO JOIN vip v ON v.VIP_NUMERO=aps.VIP_NUMERO WHERE v.VIP_NUMERO="+number+";";

            //console.log(sql);
            connexion.query(sql, callback);
            connexion.release();
        }
    });
}
