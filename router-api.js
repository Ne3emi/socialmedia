const routerApi = require('express').Router()
let userController = require("./controllers/userController");
//reauire usercontroller to access its functions on the routes
let postController = require("./controllers/postController");
let followController = require("./controllers/followController");

routerApi.post('/login',userController.apiLogin)

module.exports=routerApi