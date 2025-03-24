import React from "react";
import { useState } from "react";
import axios from "axios";
import {message} from "antd";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

import { useNavigate } from "react-router-dom";
import BASE_URL from "../config";
import "../css/Login.css"


const Login=()=>{
  
  const [userid, setUserID] = useState("");
  const [password, setPassword] = useState("");
  const [usertype , setUsertype] = useState("");
  const navigate=useNavigate();
  // console.log(userid,password, usertype);

  const handleSubmit=async()=>{
    if (usertype=="admin")
    {
      try {
        let api = "http://localhost:8070/admin/adminlogin";
        const response = await axios.post(api, {userid:userid , password:password});
        console.log(response.data);
        if(response.status==200)
        {
          console.log(response.data);
          localStorage.setItem("adminname",response.data.username);
          localStorage.setItem("adminid",response.data.userid)
          message.success("Login Successfully!");
          navigate("/dashboard");
        }
      } catch (error) {
        message.error(error.response.data.msg);
        
      }
    }
    else {
        alert("Wrong ID Password !!!")
    }
 
  }
    return(
        <>
        
        <Container className="d-flex justify-content-center align-items-center vh-100">
      <Row className="w-100">
        <Col xs={12} md={6} lg={4} className="mx-auto text-center p-4 shadow rounded bg-white">
          <img src="src/images/img1.jpeg" alt="logo" className="mb-3" style={{ width: "150px", borderRadius:"50%" }} />
          <h4 style={{color:"blue", fontSize:"20px"}}>Student Management System</h4>
          <p style={{color:"blue",fontSize:"10px"}}>Please login to your account</p>

          <Form>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="Enter your ID"
                value={userid}
                onChange={(e) => setUserID(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Control
                type="password"
                placeholder="Enter your Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Select value={usertype} onChange={(e) => setUsertype(e.target.value)}>
                <option value="">Login as a ......</option>
                <option value="admin">Admin</option>
               
              </Form.Select>
            </Form.Group>

            <Button style={{backgroundColor:"blue"}} className="w-100" onClick={handleSubmit}>
              Login
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>


        </>
    )
}
export default Login;