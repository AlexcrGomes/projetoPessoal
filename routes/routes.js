const routes = require('express').Router();
const UserController = require('../controller/UserController');

// UserController

routes.get('/getById/:id/:method', UserController.getById);
routes.post('/signup', UserController.signup);
routes.post('/signin', UserController.signin);
routes.get('/logout', UserController.logout);
routes.get('/usuarios', UserController.getALLUsers);
routes.get('/getByIdUser/:id/:method', UserController.getByIdUser);
routes.get('/getALLUsers', UserController.getALLUsers);
routes.post('/updateOneUser/:id', UserController.updateOneUser);
routes.get('/deleteOneUser/:id', UserController.deleteOneUser);




module.exports = routes