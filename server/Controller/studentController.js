// import Student from '../models/Student.js';

// export const addStudent = async (req, res) => {
//     try {
//         const newStudent = new Student(req.body);
//         await newStudent.save();
//         res.status(201).json({ message: 'Student added successfully!' });
//     } catch (error) {
//         res.status(500).json({ error: 'Failed to add student' });
//     }
// };
const StudentModel = require('../Models/studentModel');

// Add Student
const addStudent = async (req, res) => {
  const { rollNo, name, course, email, fees } = req.body;

  if (!rollNo || !name || !course || !email || !fees) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const studentExists = await StudentModel.findOne({ rollNo });

    if (studentExists) {
      return res.status(400).json({ message: 'Student with this roll number already exists' });
    }

    const student = await StudentModel.create({ rollNo, name, course, email,fees ,attendance: [] });

    if (student) {
      res.status(201).json(student);
    } else {
      res.status(400).json({ message: 'Failed to create student' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
}

const displayData = async (req, res) => {
    try {
      const students = await StudentModel.find({});
      if (students.length > 0) {
        res.status(200).json(students);
      } else {
        res.status(404).json({ message: 'No students found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch students', error: error.message });
    }
  }

  // Mark Attendance
const markAttendance = async (req, res) => {
    const { id } = req.params;
    const { status, date } = req.body;
  
    if (!status || !date) {
      return res.status(400).json({ message: 'Status and date are required' });
    }
  
    try {
      const student = await StudentModel.findById(id);
      if (!student) {
        return res.status(404).json({ message: 'Student not found' });
      }
  
      // Ensure attendance array is initialized
      if (!student.attendance) {
        student.attendance = [];
      }
  
      const formattedDate = new Date(date).toISOString().split('T')[0];
  
      // Check if attendance for the same date already exists
      const existingAttendance = student.attendance.find(
        (att) => att.date.toISOString().split('T')[0] === formattedDate
      );
  
      if (existingAttendance) {
        existingAttendance.status = status;
      } else {
        student.attendance.push({ date: formattedDate, status });
      }
  
      await student.save();
  
      res.status(200).json({ message: 'Attendance marked successfully', student });
    } catch (error) {
      res.status(500).json({ message: 'Failed to update attendance', error: error.message });
    }
  };
  
  // Get Attendance by Date
  const attendanceByDate = async (req, res) => {
    const { date } = req.query;
  
    if (!date) {
      return res.status(400).json({ message: 'Date is required' });
    }
  
    try {
      const formattedDate = new Date(date).toISOString().split('T')[0];
  
      const students = await StudentModel.find({});
      
      const records = students.map((student) => {
        let status = 'Not Marked';
        
        if (student.attendance && Array.isArray(student.attendance)) {
          const attendanceRecord = student.attendance.find(att => {
            if (att.date instanceof Date) {
              return att.date.toISOString().split('T')[0] === formattedDate;
            } else {
              const attDate = new Date(att.date).toISOString().split('T')[0];
              return attDate === formattedDate;
            }
          });
          
          if (attendanceRecord) {
            status = attendanceRecord.status;
          }
        }
        
        return {
          rollNo: student.rollNo,
          name: student.name,
          course: student.course,
          email: student.email,
          status: status,
          date: formattedDate // Include the date in the response
        };
      });
  
      res.status(200).json(records);
    } catch (error) {
      console.log('Attendance fetch error:');
      res.status(500).json({ message: 'Failed to fetch attendance', error: error.message });
    }
  }

  // Search Students
const searchStudents = async (req, res) => {
    const { name, date } = req.query;
  
    if (!name) {
      return res.status(400).json({ message: 'Search name is required' });
    }
  
    try {
      // Case-insensitive search
      const students = await StudentModel.find({
        name: { $regex: name, $options: 'i' }
      });
  
      if (students.length === 0) {
        return res.status(404).json({ message: 'No students found with this name' });
      }
  
      // Format response with attendance status if date is provided
      const formattedStudents = students.map(student => {
        let status = 'Not Marked';
        let attendanceDate = null;
        
        if (date) {
          // If a specific date is provided, check attendance for that date
          const formattedDate = new Date(date).toISOString().split('T')[0];
          const attendanceRecord = student.attendance?.find(
            att => att.date && att.date.toISOString().split('T')[0] === formattedDate
          );
          if (attendanceRecord) {
            status = attendanceRecord.status;
            attendanceDate = formattedDate;
          }
        } else if (student.attendance?.length > 0) {
          // If no date is provided, use the latest attendance status
          const latestAttendance = student.attendance[student.attendance.length - 1];
          status = latestAttendance.status;
          attendanceDate = latestAttendance.date instanceof Date 
            ? latestAttendance.date.toISOString().split('T')[0]
            : new Date(latestAttendance.date).toISOString().split('T')[0];
        }
      
        return {
          _id: student._id,
          rollNo: student.rollNo,
          name: student.name,
          course: student.course,
          email: student.email,
          status: status,
          date: attendanceDate // Include the date in the response
        };
      });
      
      res.status(200).json(formattedStudents);
    } catch (error) {
      res.status(500).json({ message: 'Failed to search students', error: error.message });
    }
  };
  


module.exports = {
    
    addStudent,
    displayData,
    markAttendance,
    attendanceByDate,
    searchStudents
    
}