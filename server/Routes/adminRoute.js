const express = require("express");
const route = express.Router();

const AdminController = require("../Controller/adminController");
//admin route
route.post("/adminlogin", AdminController.adminLogin);

module.exports= route;