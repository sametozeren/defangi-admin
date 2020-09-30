const BaseService = require('./BaseService');
const SettingModel = require('../models/SettingModel');

class SettingService extends BaseService{
    model = SettingModel;
}

module.exports = new SettingService();