import JWT from "jsonwebtoken";
import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import userModel from "../models/userModel.js";

export const registerController = async(req,res)=>{
    try {
        const {name,email,password,phone,address} = req.body;
        if(!name){
            return res.send({message:"name is required"})
        }
        if(!email){
            return res.send({message:"email is required"})
        }
        if(!password){
            return res.send({message:"password is required"})
        }
       
        if(!phone){
            return res.send({message:"phone is required"})
        }
        if(!address){
            return res.send({message:"address is required"})
        };

    const existingUser = await userModel.findOne({email});
    if(existingUser){
        return res.status(200).send({
            success:false,
            message:"Already registered, please login"
        })
    }

    const hashedPassword = await hashPassword(password);

    const user =await new userModel({name,email,phone,address,password:hashedPassword}).save()
    res.status(201).send({
        success:true,
        message:"User registered successfully",
        user
    });
    
    } catch (error) {
       console.log(error)
       res.status(500).send({
        success: false,
        message:'Error in Registration',
        error
       })
    }
};


export const loginController = async (req,res)=> {
    try {
        const {email,password} = req.body;

        if(!email || !password){
          return  res.status(404).send({
                success: false,
                message:'Invalid email or password',
                
               })
        }

        const user = await userModel.findOne({email});
        if(!user){
            return res.status(404).send({
                success: false,
                message:'Email is not registered',
                
               })
        }

        const match = await comparePassword(password,user.password);
        if(!match){
           return res.status(200).send({
                success: false,
                message:'Invalid password'
               })
        }

        const token = JWT.sign({_id:user._id}, process.env.JWT_SECRET,{expiresIn:"7d"})
        res.status(200).send({
            success: true,
            message:'logged in successfully',
            user:{
                name: user.name,
                email:user.email,
                phone:user.phone,
                address:user.address,
                },
            token,
           })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message:'Error in Login',
            error
           })
        
    }

};

export const testController =async (req,res)=>{
    res.send('protected route')
}
