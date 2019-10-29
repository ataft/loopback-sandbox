'use strict';
module.exports = function (app) {

    app.models.User.defineProperty('email', { required:false });

};
