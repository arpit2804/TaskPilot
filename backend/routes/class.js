const express = require('express');
const router = express.Router();

const{
  getClass,
  getOneClass,
  createClass,
  editClass,
  deleteClass
} = require('../controllers/classes');

router.route('/').get(getClass).post(createClass);
router.route('/:id').get(getOneClass).patch(editClass).delete(deleteClass);

module.exports = router;