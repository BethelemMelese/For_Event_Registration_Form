const User =require("../models/user.model.js");

const GetAllUser= async (req,res)=>{
    try {
        const user=await User.find();
        const response = user.map((values) => {
            return {
              id: values._id,
              projectNumber: values.projectNumber,
              projectTitle: values.projectTitle,
              projectDescription: values.projectDescription,
              projectImage: values.projectImage,
              sourceCodeLink: values.sourceCodeLink,
              youtubeLink: values.youtubeLink,
            };
          });
      
          res.status(200).json(response);
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}

const RegisterUser= async (req,res)=>{
    try {
        
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}

module.exports={
    GetAllUser,
    RegisterUser
}