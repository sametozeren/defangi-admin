const Mongoose = require('mongoose');
const SettingScheme = new Mongoose.Schema({
    webSiteName: {
        type: String,
    },
    webSiteSlogan: {
        type: String,
    },
    siteAdress: {
        type: String,
    },
    adminEmail: {
        type: String,
        validate: {
            validator: function (data) {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(data);
            },

            message: props => `'${props.value}' not a valid email address.`,
        },
    },
    keywords:{
        type:String,
    }
});

const SettingModel = Mongoose.model('settings', SettingScheme);

module.exports = SettingModel;