const express = require('express');
const Task = require('../models/task');
const auth = require('../middleware/auth');

const router = new express.Router();

router.post('/tasks', auth, async (req, res) => {
    const task = new Task ({
        ...req.body,
        owner: req.user._id
    });

    try {
        const savedTask = await task.save();
        res.status(201).send(task);
    } catch (e) {
        res.status(500).send(e);
    };
});

// GET /task?completed=true
// GET /task?limit=10&skip=10
// GET /task?sortBy=createdAt_desc
router.get('/tasks', auth,  async (req, res) => {
    const match = {};
    const sort = {}

    if (req.query.completed){
        match.completed = req.query.completed === 'true'
    };

    if (req.query.sortBy){
        const sortParts = req.query.sortBy.split('_');
        sort[sortParts[0]] = sortParts[1] === 'desc' ? -1 : 1;
    }
    try {
        await req.user.populate({
            path: 'tasks',
            match,
            options: {
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                sort
            }
        }).execPopulate();
        // const tasks = await Task.find({owner: req.user._id});
        res.send(req.user.tasks);
    } catch (e) {
        res.status(500).send(e);
    }

});

router.get('/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id;

    try {
        const task = await Task.findOne({_id, owner: req.user._id});
        if (!task) {
            return res.status(404).send();
        }
        res.send(task);
    } catch (e) {
        res.status(500).send();
    }
})

router.patch('/tasks/:id', auth, async (req, res) => {
    const allowedUpdates = ['description', 'completed']
    const updates = Object.keys(req.body);
    const isAllowed = updates.every((update) => allowedUpdates.includes(update));
    if (!isAllowed) {
        return res.status(400).send({ 'error': 'Invalid Update' });
    }
    try {
        const task = await Task.findOne({_id: req.params.id, owner: req.user._id});
        if (!task) {
            res.status(404).send();
        };
        updates.forEach((update) => task[update] = req.body[update]);
        const updatedTask = await task.save();
        res.send(updatedTask);
    } catch (e) {
        res.status(400).send(e);
    };
});

router.delete ('/tasks/:id', auth, async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({_id: req.params.id, owner: req.user._id});
        if (!task) {
            return res.status(404).send()
        }
        res.send(task);
    } catch (e) {
        res.status(500).send(e);
    };
});

module.exports = router;