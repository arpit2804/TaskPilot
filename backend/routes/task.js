const express = require('express')

const router = express.Router();

const {
    getTasks,
    createTasks,
    editTasks,
    deleteTasks
}  = require('../controllers/tasks' )


router.route('/').get(getTasks).post(createTasks).patch(editTasks).delete(deleteTasks);

module.exports = router;