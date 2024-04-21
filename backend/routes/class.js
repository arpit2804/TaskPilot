const express = require('express');
const router = express.Router();

const{
  getClass,
  createClass,
  editClass,
  deleteClass
} = require('../controllers/classes');

router.route('/').get(getClass).post(createClass);
router.route('/:id').patch(editClass).delete(deleteClass);

module.exports = router;