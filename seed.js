var Type = require('./model/type/type-facade');
var User = require('./model/user/user-schema');
var async = require('async');

module.exports = {
    populateAdmin: () => {
        User.find({ role: 'admin' })
            .then(users => {
                if (!users.length) {
                    User.create({
                        name: 'Super Admin',
                        email: 'superAdmin@user.com',
                        role: 'admin',
                        password: 'superAdmin',
                        provider: 'local',
                    })
                    .catch(err => console.log('error on create admin user', err));
                }
            });
    },
    populateTypes: () => {
        Type.find({})
            .then(types => {
                if (!types.length) {
                    let defaultTypes = [
                        {
                            label: 'String',
                            value: 'text'
                        },
                        {
                            label: 'Long text',
                            value: 'longText'
                        },
                        {
                            label: 'Number',
                            value: 'number'
                        },
                        {
                            label: 'Select',
                            value: 'select'
                        },
                        {
                            label: 'File',
                            value: 'file'
                        },
                        {
                            label: 'Image',
                            value: 'img'
                        },
                        {
                            label: 'Date',
                            value: 'date'
                        },
                        {
                            label: 'Link',
                            value: 'link'
                        }
                    ];
                    async.eachSeries(defaultTypes, (type, asyncdone) => {
                        Type.create(type)
                            .then(doc => asyncdone())
                            .catch(err => asyncdone(null, err));
                    }, err => {
                        if(err) {
                            console.log('error on create types', err);
                        }
                    })
                }
            });
    }
};