

import React, { useState } from 'react';
import axios from 'axios';
import "../css/addstudent.css";


const AddStudent = () => {
  const [rollNo, setRollNo] = useState('');
  const [name, setName] = useState('');
  const [course, setCourse] = useState('');
  const [email, setEmail] = useState('');
  const [fees, setFees] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // const token = localStorage.getItem('token');
      const { data } = await axios.post(
        'http://localhost:8070/student/addstudent',
        { rollNo, name, course, email, fees }
        // { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('Student added successfully');
      setRollNo('');
      setName('');
      setCourse('');
      setEmail('');
      setFees('');
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || 'Failed to add student');
    }
  };

  return (
    <div className="student-container">
      <h2>Add Student</h2>
      <form onSubmit={handleSubmit} className="student-form">
        <input
          type="text"
          placeholder="Roll No"
          value={rollNo}
          onChange={(e) => setRollNo(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Course"
          value={course}
          onChange={(e) => setCourse(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
         <input
          type="number"
          placeholder="Fees"
          value={fees}
          onChange={(e) => setFees(e.target.value)}
          required
        />
        <button type="submit">Add Student</button>
      </form>
    </div>
  );
};

export default AddStudent;
