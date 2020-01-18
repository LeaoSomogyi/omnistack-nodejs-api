const { Router } = require('express');

const DevController = require('./controllers/DevController');
const SearchController = require('./controllers/SearchController');

const routes = Router();

routes.post('/devs', DevController.store);
routes.get('/devs', DevController.index);
routes.get('/search', SearchController.index);
routes.get('/devs/:devId', DevController.show);
routes.put('/devs/:devId', DevController.update);
routes.delete('/devs/:devId', DevController.destroy);

module.exports = routes;