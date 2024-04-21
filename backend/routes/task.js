const express = require('express')
const router = express.Router();

const {
    getTasks,
    getOneTask,
    createTasks,
    editTasks,
    deleteTasks
}  = require('../controllers/tasks' )


router.route('/').get(getTasks).post(createTasks);
router.route('/:id').get(getOneTask).patch(editTasks).delete(deleteTasks);

module.exports = router;