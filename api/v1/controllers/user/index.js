var ResHelper = require(_pathconst.FilesPath.ResHelper);
var UserService = require(_pathconst.ServicesPath.UserService);
var Config = require(_pathconst.FilesPath.ConfigUrl);

exports.get = async (req, res, next) => {
    try {
        const { user_id, user_type, roles, status, } = req.loggedInUser;

        const users = await UserService.get({ user_id: knexSqlDb.raw(`uuid_to_bin('${user_id}')`) })

        if (users.length) {

            ResHelper.apiResponse(res, true, "Success", 200, users, "");
        } else {
            ResHelper.apiResponse(res, true, "No record found for this user.", 204, {}, "");
        }
    }
    catch (e) {
        //we can handel errors using const file
        ResHelper.apiResponse(res, false, "Error occured during execution", 500, {}, "");
    }
}


