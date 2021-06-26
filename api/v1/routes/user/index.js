var UserControllerV1 = require(_pathconst.ControllersPath.UserControllerV1);
const aclPermissions = require('../../../helpers/acl-middleware/acl-helper');
var UserModelV1 = require(_pathconst.ReqModelsPath.UserModelV1);

const express = require("express");

const router = express.Router();
var AuthHelper = require(_pathconst.FilesPath.AuthHelper);


// router.get("/get",  validate.body(UserModelV1.Get),AuthHelper.authorize, aclPermissions.getPermissions, userCntrl.get);//if you want to validate the body
router.get("/get", AuthHelper.authorize, aclPermissions.getPermissions, UserControllerV1.get);


module.exports = router;