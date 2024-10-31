const express = require('express');
const { addStudent, getAllStudents, getStudentById, updateStudent, deleteStudent } = require('../controllers/studentController');

const router = express.Router();

router.post('/v1/students', addStudent);
router.get('/v1/students', getAllStudents);
router.get('/v1/students/:id', getStudentById);
router.put('/v1/students/:id', updateStudent);
router.delete('/v1/students/:id', deleteStudent);

module.exports = router;
