const express = require('express')
const router = express.Router();

const {
    getTasks,
    createTasks,
    editTasks,
    deleteTasks
}  = require('../controllers/tasks' )


router.route('/').get(getTasks).post(createTasks);
router.route('/:id').patch(editTasks).delete(deleteTasks);

module.exports = router;