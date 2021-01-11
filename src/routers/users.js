const express = require('express');
const User = require('../models/user');
const auth = require('../middleware/auth');

const router = new express.Router();

router.post('/users', async (req, res) => {
    const user = new User(req.body);
    try {
        await user.save();
        const token = await user.generateAuthToken();
        res.send({
            user,
            token});
        res.status(201).send(user);
    } catch (e) {
        res.status(400).send(e);
    };
});

router.post('/users/login', async(req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password);
        const token = await user.generateAuthToken();
        res.send({
            user,
            token});
    } catch (e) {
        res.status(400).send('Unable to Login');
    }
});

router.post('/users/logout', auth, async(req,res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token != req.token
        })
        await req.user.save();
        res.send(200);
    } catch(e) {
        res.send(500);
    }
});

router.post('/users/logout/all', auth, async(req, res) => {
    try {
        req.user.tokens = [];
        await req.user.save();
        res.send(200);
    } catch(e) {
        res.send(500);
    }
})

router.get('/users/me', auth, async (req, res) => {
    try {
        res.send(req.user);
    } catch (e) {
        res.status(500).send(e);
    };
});

router.patch('/users/me', auth, async(req, res) => {
    const allowedUpdates = ['name', 'email', 'password', 'age'];
    const updates = Object.keys(req.body);
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));
    if (!isValidOperation) {
        res.status(400).send({ 'error': 'Invalid Update!' });
    };
    try {
        updates.forEach((update) => req.user[update] = req.body[update]);
        await req.user.save();
        res.send(req.user);
    } catch (err) {
        res.status(400).send(e);
    };
});

router.delete('/users/me', auth, async(req, res) => {
    try {
        await req.user.remove();
        res.send(req.user);
    } catch (e) {
        res.status(500).send(e);
    };
});



module.exports = router;