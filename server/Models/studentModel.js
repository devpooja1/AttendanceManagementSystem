const mongoose =require("mongoose");
const StuSchema = new mongoose.Schema({
    rollNo:String,
    name:String,
    email:String,
    course:String,
    fees:Number,
    attendance: [
        {
          date: {
            type: Date,
            required: true
          },
          status: {
            type: String,
            enum: ['Present', 'Absent'],
            required: true
          }
        }
      ]
   
   
})

module.exports = mongoose.model("student", StuSchema);