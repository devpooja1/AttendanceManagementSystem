const express = require("express");
const route = express.Router();
const stuController = require("../Controller/studentController");


route.post('/addstudent', stuController.addStudent);
route.get('/display', stuController.displayData);
route.put('/attendance/:id', stuController.markAttendance); 
route.get('/attendance', stuController.attendanceByDate);
route.get('/search', stuController.searchStudents); // New route for searching students

module.exports = route;
