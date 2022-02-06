const express = require("express");
let router = express.Router();
//we require router because this package allows for adding subpaths to the original path that is used in app.js
let userController = require("./controllers/userController");
//reauire usercontroller to access its functions on the routes
let postController = require("./controllers/postController");
let followController = require("./controllers/followController");

router.get("/", userController.home);
//instead of long function res req , we put all functions in usercontroller and export them , and we call them here with .function
router.post("/login", userController.login);

router.post("/register", userController.register);

router.post("/signout", userController.signout);
router.get(
  "/createPost",
  userController.mustBeLoggedIn,
  postController.viewPostScreen
);
router.post(
  "/createPost",
  userController.mustBeLoggedIn,
  postController.create
);
router.get("/post/:id", postController.viewSingle);

router.get(
  "/profile/:username",
  userController.isUser,
  userController.isFollowing,
  userController.userPosts
);
//we put middle ware in the middle to carry data between functions in the req
router.get(
  "/profile/:username/followers",
  userController.isUser,
  userController.isFollowing,
  userController.userFollowers
);
router.get(
  "/profile/:username/following",
  userController.isUser,
  userController.isFollowing,
  userController.userFollowing
);
router.get("/post/:id/edit", postController.viewEditScreen);
router.post("/post/:id/edit", postController.update);
router.post("/post/:id/delete", postController.delete);
router.post("/search", postController.postSearch);
router.post(
  "/addFollow/:username",
  userController.mustBeLoggedIn,
  followController.addFollow
);
router.post(
  "/removeFollow/:username",
  userController.mustBeLoggedIn,
  followController.removeFollow
);
module.exports = router;
//export this object to app.js
