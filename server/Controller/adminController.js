const AdminModel = require("../Models/adminModel");




const adminLogin = async(req,res)=>{
    const {userid, password} = req.body;
    // console.log(userid,password);
    try{
        const Admin = await AdminModel.findOne({userid:userid});

        if(!Admin){
            res.status(400).json({msg:"Inavlid user Id"});

        }
        if(Admin.password!=password)
        {
            res.status(400).json({msg:"Invalid Password"});
        }
        res.status(200).json(Admin)
    }catch(error){
        console.log(error);

    }
}

// const addStudent=async(req,res)=>{
//     // console.log(req.body);
   

//     const {stuname,course,email,fees}=req.body;
    
//     try {
        
//         const StuData = await StuModel.create({
//             stuname:stuname,
//             course:course,
//             email:email,
//             fees:fees
            
//         })
//         res.status(200).json({ success: true, message: 'Email sent', info });
//     } catch (error) {
//         res.status(500).json({ success: false, error: error.message });
//     }
// }



module.exports = {
    adminLogin
    // addStudent
    
}