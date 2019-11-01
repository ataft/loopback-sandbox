'use strict';
module.exports = async function (app, cb) {

    app.models.User.defineProperty('email', { required:false, type:'string' });

    await app.models.User.create({
        email: 'someone@gmail.com',
        password: 'password'
    })

    cb();

};
