const express = require('express');
const router = express.Router();
const SettingService = require('../services/SettingService');
const UserService = require('../services/UserService');


router.get('/get', async (req, res) => {
    res.send(await SettingService.getAll());
});

router.put('/update', async (req, res) => {
    res.send(await SettingService.update(req.body));
});

module.exports = router;