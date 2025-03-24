const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const adminRoute = require("./Routes/adminRoute");
const stuRoute = require("./Routes/studentRoute");
const bodyparser = require("body-parser");

require("dotenv").config();
const port = process.env.PORT || 8090;
const dbcon = process.env.DBCON;
mongoose.connect(dbcon).then(()=>{
    console.log("DB Connnected !!!");
})

app.use(cors());
app.use(bodyparser.urlencoded({extended:true}));
app.use(bodyparser.json());


app.use("/admin", adminRoute);
app.use("/student" , stuRoute);


app.listen(port,()=>{
    console.log(`Server run on ${port}`);
})