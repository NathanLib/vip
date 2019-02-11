let HomeController = require('./../controllers/HomeController');
let VipController = require('./../controllers/VipController');
let AlbumController = require('./../controllers/AlbumController');
let ArticleController = require('./../controllers/ArticleController');
let TestController = require('./../controllers/TestController');



// Routes
module.exports = function(app){

    // tests à supprimer
    app.get('/test', TestController.Test);

    // Main Routes
    app.get('/', HomeController.Index);
    app.get('/accueil', HomeController.Index);

    // VIP
    app.get('/repertoire', VipController.Repertoire);
    app.get('/repertoire/:letter', VipController.DetailsLetter);
    app.get('/repertoire/vip/:number', VipController.DetailsVip);

    // albums
    app.get('/album', AlbumController.ListerAlbum);
    app.get('/album/:number/:photo', AlbumController.AfficherAlbumDetail);

    // Articles
    app.get('/articles', ArticleController.Menu);
    app.get('/articles/:number', ArticleController.AfficherArticle);


    // tout le reste
    app.get('*', HomeController.NotFound);
    app.post('*', HomeController.NotFound);

};
